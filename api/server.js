var express         =   require("express");
var app             =   express();
var bodyParser      =   require("body-parser");
var session         =   require('express-session');
var UserProfile     =   require("./models/userprofile");
var router          =   express.Router();
var multer          =   require('multer');
var nodemailer      =   require('nodemailer');
var mongoose        =   require('mongoose'); 
var cors	    =       require('cors');
var jwt = require('jsonwebtoken');
var atob = require('atob');

//var HOST = '192.168.0.5';

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
      console.log("inside passport");
    UserProfile.findOne({userEmail:username}, function (err, user) {
        //console.log("passport use" + user);

      if (err) { 
          console.log("error mila:" + err);
          return done(err); }
      if (!user) {
          console.log("user nahin");
        return done(null, false, { message: 'Incorrect username.' });
      }
      
     /* if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }*/
      console.log("great!" + user.userFullName);
      return done(null, user);
    });
  }
));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(session({secret:"garbage",resave:false,saveUninitialized:true}));
app.use(cors());
app.options('*',cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(passport.initialize());
  //app.use(passport.session());


passport.serializeUser(function(user, done) {
  console.log("serializeUser" + user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log("deserializeUser:" + id);
  UserProfile.findById({_id:id}, function(err, user) {
      console.log("inside" +user) ;
    done(err, user);
  });
});

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

router.route("/signup")
    .get(function(req,res){
	console.log("GET:got a server req");
        //todo
    })
    .post(function(req,res){
	console.log("Sign Up req");
        var newUser = new UserProfile();
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        if(req.body.email !== undefined)
            {newUser.userEmail = req.body.email;} 
        // Hash the password using SHA1 algorithm.
        if(req.body.password !== undefined)
            {newUser.userPassword = require('crypto').createHash('sha1').update(req.body.password).digest('base64');}
        if(req.body.fullname !== undefined)
            {newUser.userFullName = req.body.fullname;} 
        if(req.body.desired_city !== undefined)
            {newUser.userDesiredCity = req.body.desired_city;}     
        if(req.body.desired_area !== undefined)
            {newUser.userDesiredArea = req.body.desired_area;}        
        if(req.body.type_of_tenant !== undefined)
            {newUser.userTypeOfTenant = req.body.type_of_tenant;}        
           
        newUser.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
	console.log("Error saving user in DB:" + err);
                response = {"error" : true,"message" : "Error adding data-->"+err.message};
            } else {
                response = {"error" : false,"message" : "Data added"};
                //response = ['1','2','3'];
            }
            res.json(response)
        });
    });

  /*
  app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log("here:" + JSON.stringify(req.session.passport) );
    //res.redirect('/getUserProfile');
    //req.session.user = req.session.passport.user;
  }); */ 

router.route("/login") 
   .post(
       function(req, res) {
           console.log("inside login");
  passport.authenticate('local',{ session: false }, function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
        console.log("passport error");
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
    console.log("user is found" + user);
      token = user.generateJwt();
	//req.session.token = token;
    //console.log("tok:" + req.session.token);
    
      res.status(200);
      res.json({
        "token" : token
      }
      
      )
      ;
    } else {
      // If user is not found
      console.log("user not found");
      res.status(401).json(info);
    }
  })(req, res);

});

/* router.route("/login") 
   .post(
       /*passport.authenticate('local'),
        function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        console.log(req.user.userName);
        }*/
  /*     
       function(req,res){
		console.log("Login req");
	    var response = {};
        var email = req.body.email;
        var password = require('crypto').createHash('sha1').update(req.body.password).digest('base64');
        UserProfile.findOne({userEmail:email,userPassword:password},function(err,user){
            if(err) {
               return res.status(500).send("Error reading database. Please try again later.");
		

            } if(!user) {
		console.log("invalid username and password");
              // return res.status(404).send("error": "invalid");

		response = {"error" : "invalid"};
		return res.json(response);
            }
           
           req.session.user = user; 
	   			
	   console.log("loggin in:" + req.session.user);
	   response = {"error" : false, "loggedIn" : "yes"}
	  return res.json(req.session.user);
           //return res.status(200).send("Login successful. Welcome "+user.userFullName);

	//for testing purpose
	response = {"error" : false,"message" : "Data added"};
	res.json(response);
        });
    });
*/

router.route("/getUserProfile") 
   .get(function(req,res){  
       if (req.query.token) {
           console.log("getting token" + req.query.token);

            let token = req.query.token;
            var decoded = jwt.verify(token, 'MY_SECRET');
            
            //var id = getUserIdFromToken(token);
            var id = decoded._id;
            console.log("id:" + decoded._id) // bar
            console.log("email:" + decoded.userEmail) // bar
            console.log("city:" + decoded.userDesiredCity) // bar
            
            //console.log("in getUserProfile, gotid:" + id);
            
            var response = {};
            UserProfile.findOne({'_id': id}, function (err,reqdUser){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            }
            else{
                //console.log("reqdUser:" + reqdUser);
                response = reqdUser;
            }  

            return res.json(response);
        });

            return;
       }
       if(!req.session.token){
           console.log("get user p NO:" + JSON.stringify(req.session.user));
           return res.status(401).send("You are not authorized to access this api"); 
       }
       else{
           console.log("get user YES:" + req.session.token);
           var response = {};
         /*  UserProfile.findOne({'userEmail': req.session.user.userEmail}, function (err,reqdUser){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            }
            else{
                res.json(reqdUser);
            }  
       });*/
       }
       
    });

router.route("/updateUserProfile/")
.put(function(req,res){
    if(!req.session.user){
        return res.status(401).send();
    }
    else
    {
        var response = {};
         UserProfile.findOne({'userEmail': req.session.user.userEmail}, function (err,updatingUser){
              if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } 
            else
            {
                // we got data from Mongo.
                // change it accordingly.
                if(req.body.desired_city !== undefined)
                    {updatingUser.userDesiredCity = req.body.desired_city;}     
                if(req.body.desired_area !== undefined)
                    {updatingUser.userDesiredArea = req.body.desired_area;}
                if(req.body.current_city !== undefined)
                    {updatingUser.userCurrentCity = req.body.current_city;}     
                if(req.body.current_area !== undefined)
                    {updatingUser.userCurrentArea = req.body.current_area;}            
                if(req.body.type_of_tenant !== undefined)
                    {updatingUser.userTypeOfTenant = req.body.type_of_tenant;}  
                if(req.body.phone_no !== undefined)
                    {updatingUser.userPhoneNo = req.body.phone_no;}    
                if(req.body.requirement_description !== undefined)
                    {updatingUser.userRequirementDescription = req.body.requirement_description;}    
                
                updatingUser.save(function(err){
                        if(err) {
                            response = {"error" : true,"message" : "Error updating data"};
                        } else {
                            response = {"error" : false,"message" : "Data is updated for --> "+req.session.user.userEmail};
                        }
                        res.json(response);
                    });
             }
         });
    }
})

router.route("/changePassword/")
      .put(function(req,res){
         if(!req.session.user){
             return res.status(401).send("You are not authorized to access this api.");
         }
         else
         {
             var response = {};
            UserProfile.findOne({'userEmail': req.session.user.userEmail}, function (err,updatingUser){
              if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } 
            else
            {
                // we got data from Mongo.
                // change it accordingly.
                if(req.body.password !== undefined)
                    {
                        var newpassword = require('crypto').createHash('sha1').update(req.body.password).digest('base64');
                        updatingUser.userPassword = newpassword;
                    }     
                
                updatingUser.save(function(err){
                        if(err) {
                            response = {"error" : true,"message" : "Error updating data"};
                        } else {
                            response = {"error" : false,"message" : "Password is updated for --> "+req.session.user.userEmail};
                        }
                        res.json(response);
                    });
             }
           });
         }
      });
      
  router.route("/updateUserFullName/")
        .put(function(req,res){
            if(!req.session.user){
             return res.status(401).send("You are not authorized to access this api.");
         }
         else
         {
              var response = {};
              UserProfile.findOne({'userEmail': req.session.user.userEmail}, function (err,updatingUser){
                if(err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                }
                else{
                     // we got data from Mongo.
                     // change it accordingly.
                if(req.body.fullname !== undefined)
                    {
                        updatingUser.userFullName = req.body.fullname;
                    }     
                
                updatingUser.save(function(err){
                        if(err) {
                            response = {"error" : true,"message" : "Error updating data"};
                        } else {
                            response = {"error" : false,"message" : "User full name is updated for --> "+req.session.user.userEmail};
                        }
                        res.json(response);
                    });
                } 
              })
         }
        }); 

//Photo upload
// This sends back some connect.sid cookie to postman so after restarting server postman tab for this api should be closed
// and refilled.



//var upload = multer({dest:'uploads/'}).single('photo');
router.route("/uploadPhoto")
        .post(function(req,res){
            if(!req.session.user){
             return res.status(401).send("You are not authorized to access this api.");
         }
         else
         {
             
             var response = {};
             var imgFileName =  require('crypto').createHash('sha1').update(req.session.user.userEmail).digest('base64');
             var storage =   multer.diskStorage({
                 destination: function (req, file, callback) {
                     callback(null, 'uploads/');
                    },
                    filename: function (req, file, callback) {
                        callback(null, imgFileName + '.jpg');
                    }
                });
             var upload = multer({ storage : storage}).single('photo');
             upload(req,res,function(err){
                 if (err){
                     return res.end("Error in uploading file");
                 }
                 else
                 {
                     console.log(req.file);
                     return res.end("File uploaded!");
                 }
             })
             
             UserProfile.findOne({'userEmail': req.session.user.userEmail}, function (err,updatingUser){
                if(err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                }
                else{
                     // we got data from Mongo.
                     // change it accordingly.
                if(imgFileName !== undefined)
                    {
                        updatingUser.userPhotoFileName = imgFileName;
                    }     
                
                updatingUser.save(function(err){
                        if(err) {
                            response = {"error" : true,"message" : "Error updating data"};
                        } else {
                            response = {"error" : false,"message" : "User photo file name is updated for --> "+req.session.user.userEmail};
                        }
                        res.json(response);
                    });
                } 
              })
             
         }
  }); 

router.route("/activateAccount")
      .put(function(req,res){
         if(!req.session.user){
             return res.status(401).send("You are not authorized to access this api.");
         }
         else{
              UserProfile.findOne({'userEmail': req.session.user.userEmail}, function (err,updatingUser){
                if(err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                }
                else{
                    // we got data from Mongo, change it accordingly.
                    updatingUser.userIsAccountActive = true;
                    updatingUser.save(function(err){
                        if(err) {
                            response = {"error" : true,"message" : "Error updating data"};
                        } else {
                            response = {"error" : false,"message" : "User account activated for --> "+req.session.user.userEmail};
                        }
                        res.json(response);
                    });
                }
                  
              })
         }
      });      
 
 
 router.route("/deactivateAccount")
      .put(function(req,res){
         if(!req.session.user){
             return res.status(401).send("You are not authorized to access this api.");
         }
         else{
              UserProfile.findOne({'userEmail': req.session.user.userEmail}, function (err,updatingUser){
                if(err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                }
                else{
                    // we got data from Mongo, change it accordingly.
                    updatingUser.userIsAccountActive = false;
                    updatingUser.save(function(err){
                        if(err) {
                            response = {"error" : true,"message" : "Error updating data"};
                        } else {
                            response = {"error" : false,"message" : "User account deactivated for --> "+req.session.user.userEmail};
                        }
                        res.json(response);
                    });
                }
                  
              })
         }
      });      
 
 router.route("/deleteAccount")
      .put(function(req,res){
          if (req.body.token && req.body.token != undefined)  {
           console.log("inside delete: token" + req.body.token);

            let token = req.body.token;
            var decoded = jwt.verify(token, 'MY_SECRET');
            
            var id = decoded._id;
            console.log("id:" + decoded._id) // bar
            
            var response = {};
            
            UserProfile.findOneAndRemove({'_id': id}, function (err,reqdUser){
                if(err) {
                    response = {"error" : true,"message" : "Error in deleting account"};
                    console.log(" error in deleting ");
                }
                else{
                    // we successfully deleted the document from the db
                    console.log("deleted account");
                    res.status(200);
                    //response = {};
                    res.json({"error" : false,
                             "status" : 200 });
                }
              })
          }
          else {
              return res.status(401).send("You are not authorized to access this api.");
          }
        });

        /* if(!req.session.user){
             return res.status(401).send("You are not authorized to access this api.");
         }
         else{
              
         }*/
      //}); 

router.route("/signout") 
   .post(function(req,res){
        if(!req.session.user){
             return res.status(401).send("You are not authorized to access this api.");
         }
        else{
            req.session.user = null; 
            return res.status(200).send("Successfully logged out. Goodbye.");
        }
    });

router.route("/inviteTenant/") 
   .put(function(req,res){
        //send the email to the tenant
        //landlordFullName, landlordEmail, landlordPhoneNo, landlordMessage, tenantEmail 
        var transporter = nodemailer.createTransport({
            service:'Gmail',
            auth:{
                user:'otenant1@gmail.com',
                pass:'Deadsea#123'
            }
        });
        var text = req.body.landlordMessage +'\n\nMy contact details are as follows.' + 
        '\nName - '+req.body.landlordFullName + '\nEmail - '+req.body.landlordEmail 
        +'\nPhone No - '+req.body.landlordPhoneNo
        +'\n\n\n\n\nThis email has been sent via otenant automatically, please contact the landlord directly.';
        var mailOptions = {
            from:'mahesh@gmail.com', //sender address
            to:req.body.tenantEmail, //list of receivers
            subject:'OTenant - '+ req.body.landlordFullName +' (landlord) expressed interest!', //subject line
            text:text //plain text body
            //html:'<b> Hello World </b>' // You can choose to send an html body instead.
             
        }
        var response = {};
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
                response = {"error":true,"message":error};
            }
            else{
                console.log("Message sent: "+info.response);
                //messageRegEmail = info.response; ?How to send this to outside and send using a response in the below code
            }
        });
        
        //make an entry in notifications field in db
        UserProfile.findOne({'userEmail': req.body.tenantEmail}, function (err,updatingUser){
                if(err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                    res.json(response);
                }
                if(updatingUser == null){
                    response = {"error" : true,"message" : "No user found with the mentioned email id."};
                    res.json(response);
                }
                else{
                    // we got data from Mongo, change it accordingly.
                    var notification = {};
                    notification = {
                        "landlordFullName":req.body.landlordFullName,
                        "landlordEmail":req.body.landlordEmail,
                        "landlordPhoneNo":req.body.landlordPhoneNo,
                        "landlordMessage":req.body.landlordMessage,
                        "unread":true,
                        "approved":false
                    }
                    if(updatingUser.userNotifications == undefined)
                        {updatingUser.userNotifications = new Array();}
                    updatingUser.userNotifications.push(notification);
                    updatingUser.save(function(err){
                        if(err) {
                             response = {"error" : true,"message" : "Error updating data"};
                        } else {
                             response = {"error" : false,"message" : "New notification added for --> "+req.body.tenantEmail};
                        }
                        res.json(response);
                    });
                }
              })
    });    

function getUserIdFromToken(token) {
	var payload = token.split('.')[1];
//            console.log("plpp:" + payload);
            
            payload = atob(payload);
            payload = JSON.parse(payload);

            //let id =  JSON.stringify(payload._id);
            var id = payload._id;
            console.log("in getUserIdFromToken gotid:" + id);
            console.log("got email:" + payload.userEmail);
	    return id;

}

router.route("/getNotifications/")
      .get(function(req,res){

	if (req.query.token) {
        console.log("getting token" + req.query.token);
        let token = req.query.token;
         
        var decoded = jwt.verify(token,'MY_SECRET');
        //var id = getUserIdFromToken(token);
        var id = decoded._id;
        console.log("in getNotifications, gotid:" + id);

        var response = {};
        UserProfile.findOne({'_id': id}, function (err,reqdUser){
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        }
        else{
            //console.log("notifff:" + reqdUser.userNotifications);
            if (reqdUser != null) {
                response = reqdUser.userNotifications;
            }    
        }  

		return res.json(response);
       });

            return;
       }
	
        /* if(!req.session.user){
             return res.status(401).send("You are not authorized to access this api.");
         }
         else{
             var response = {};
             UserProfile.findOne({'userEmail': req.session.user.userEmail}, function (err,reqdUser){
             if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
             }
             else{
                res.json(reqdUser.userNotifications);
             }  
            });
         }*/
      }); 

router.route("/updateNotifications/")
      .put(function(req,res){
         if(!req.session.user){
             return res.status(401).send("You are not authorized to access this api.");
         }
         else{
             var response = {};
             UserProfile.findOne({'userEmail': req.session.user.userEmail}, function (err,updatingUser){
             if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
             }
             else{
                // we got data from Mongo, change it accordingly.
                if(req.body.notifications !== undefined)
                {
                    updatingUser.userNotifications = req.body.notifications;
                }
                updatingUser.save(function(err){
                        if(err) {
                             response = {"error" : true,"message" : "Error updating data"};
                        } else {
                             response = {"error" : false,"message" : "Notifications updated for --> "+req.body.tenantEmail};
                        }
                        res.json(response);
                    });
             }  
            });
         }
      });
 
 router.route("/approveNotification/")
      .put(function(req,res){
         if (req.body.token && req.body.notification)  {
            console.log("approv token" + req.query.token);
            let token = req.body.token;
         
	        var user_id = getUserIdFromToken(token);
            //var notif_id = req.body.notification;
            

            var response = {};
            var notification = req.body.notification;//JSON.stringify(req.body.notification);
            console.log("in put, gotid:" + user_id + " notif:" + notification);

            notification.approved = true; //approve the notification

            UserProfile.findOneAndUpdate({'_id': user_id,
                         'userNotifications._id':notification._id},{$set:{'userNotifications.$':notification}},
                         function (err,doc){
                             if(err){
                                 console.log("error true")
                                 response = {"error":true,"message":"error updating data"}
                                 res.json(response);
                             }
                             else{
                                 console.log("error false")
                                  response = {"error":false,"message":"notification approved"}
                                  res.json(response);
                             }
                         });
         }
         else{
            console.log(" in else")
            response = {"error":true ,"message":"error updating data"}
            res.json(response);
            return;
         }
/*	if(!req.session.user){
             return res.status(401).send("You are not authorized to access this api.");
         }
         else{
             var response = {};
             var notification = {};
             //Note that we expect the whole notification object from the client to mark it approved
             // just for the sake of convenience of api. it helps in updating db quicker.
             //Mark notification approved in the database.
             if(req.body.notification !== undefined)
             {
                notification = req.body.notification;
                notification.approved = true; //approve the notification
                UserProfile.findOneAndUpdate({'userEmail': req.session.user.userEmail,
                         'userNotifications._id':notification._id},{$set:{'userNotifications.$':notification}},
                         function (err,doc){
                             if(err){
                                 response = {"error":true,"message":"error updating data"}
                                 res.json(response);
                             }
                             else{
                                  response = {"error":false,"message":"notification approved for -->"+req.session.user.userEmail}
                                  res.json(response);
                             }
                         });
                        
             }
             else
             {
                 response = {"error":true,"message":"undefined object notification sent by client."}
                 res.json(response);
             }
             
             //send the email to the tenant
             var transporter = nodemailer.createTransport({
                 service:'Gmail',
                 auth:{
                     user:'otenant1@gmail.com',
                     pass:'Deadsea#123'
                    }
                });
                var text = notification.tenantMessage +'\n\nMy contact details are as follows.' + 
                '\nName - '+req.session.user.userFullName + '\nEmail - '+req.session.user.userEmail 
                +'\nPhone No - '+ req.session.user.userPhoneNo
                +'\n\n\n\n\nThis email has been sent via otenant automatically, please contact the tenant directly.';
                var mailOptions = {
                    from:'otenant1@gmail.com', //sender address
                    to:notification.landlordEmail, //list of receivers
                    subject:'OTenant - '+ req.session.user.userFullName +' (tenant) accpeted your interest!', //subject line
                    text:text //plain text body
                    //html:'<b> Hello World </b>' // You can choose to send an html body instead.
                    
                }
                transporter.sendMail(mailOptions,function(error,info){
                    if(error){
                        console.log(error);
                        response = {"error":true,"message":error};
                    }
                    else{
                        console.log("Message sent: "+info.response);
                    }
                });*/
             
        // }
      });

router.route('/searchTenants/')
      .get(function(req,res){
	console.log("searching now tenants..." + req.query.desired_city + " ," +  req.query.desired_areas + " ," + req.query.types_of_tenant);
          //collect the search parameters
          var desiredCity = "";
          var desiredAreas = [];
          var typesOfTenant = [];
          if(req.query.desired_city !== undefined)
          {
              desiredCity = req.query.desired_city;
		console.log("desiredCity:" + desiredCity);
          }
          if(req.query.desired_areas !== undefined)
          {
              desiredAreas = req.query.desired_areas; //has to be an array of desired areas
          }
          if(req.query.types_of_tenant !== undefined)
          {
              typesOfTenant = req.query.types_of_tenant;
          }
          //make a search in the db
          UserProfile.find({'userDesiredCity':desiredCity
//				'userTypeOfTenant':{$in:typesOfTenant},
//				'userDesiredArea':{$in:desiredAreas}
				},function(err,reqdUsers){
              if(err) {
				console.log (" NO tenants found:!");
                response = {"error" : true,"message" : "Error fetching data"};
		//comment this line later 
		return res.json(response);
             }
             else{
              //return res.json(reqdUsers);
		console.log ("found tenants!");
		return res.send(reqdUsers);
             }  
                            
          });
      });
                   
app.use('/',router);

app.listen(3005);
//app.listen(3005, HOST);
console.log("Listening to PORT 3005");


//conn = new Mongo();
//db = conn.getDB("otenantDb"); 
//var randomNumberBetween0and7 = 

db = connect("localhost:27017/otenantDb");
var index = 0;
var i;
var city = ["noida","surat","delhi","gurgaon","jalesar","patna","lucknow"];
var areas = ["sec51","sec52","sec53","sec54","sec55","sec56","sec57"];
var types = ["BB","BG","GOG","GOB","UC","FAM","OTH"];
var names = ["Anand Shankar","Mohit Mittal", "Ashwani Kumar","Nilesh Rathi", "Pawan Singh", "Srajan Agrawal","Sakshya Agrawal","Sanjay Kumar"];
var cityStub, areaStub,typeStub,username;

cityStub = city[Math.floor(Math.random() * 8)];
areaStub = areas[Math.floor(Math.random() * 8)];
typeStub = types[Math.floor(Math.random() * 8)];
username = names[Math.floor(Math.random() * 8)];

//********CAUTION BELOW LINE WILL REMOVE ALL USERS*******
db.users.remove({});
db.users.insert({
	"_id" : ObjectId("588c1f807d6893d132bee730"),
	"userTypeOfTenant" : typeStub,
	"userDesiredCity" : ""+cityStub+"",
	//"userFullName" : typeStub+"_"+cityStub+"_"+areaStub+"Mohit",
    "userFullName" : username,
	"userPassword" : "deadsea123",
	"userEmail" : "0mittal@gmail.com",
	"userNotifications" : [],
	"userDesiredArea" : [
		"'"+areaStub+"'"
	],
    "__v" : 0
   });
//CHANGE NUMBER HERE FOR A CERTAIN NUMBER OF RECORDS
for (i = 1; i <= 10; i++) {

   cityStub = city[Math.floor(Math.random() * 7)];
   areaStub = areas[Math.floor(Math.random() * 7)];
   typeStub = types[Math.floor(Math.random() * 7)];
   username = names[Math.floor(Math.random() * 7)]; 

   x = db.users.findOne();
   x._id = new ObjectId()
   x.userEmail = i+"mittal"+"@gmail.com";
   x.userDesiredCity = cityStub;
   x.userDesiredArea = areaStub;
   x.userTypeOfTenant= typeStub;
   //x.userFullName = typeStub+"_"+cityStub+"_"+areaStub+"Mohit";
   x.userFullName = username;
   db.users.insert(x);
   
}

count = db.users.count();
print("Inserted "+ count +" records. Example records follow.")

// index = i;

//CHANGE NUMBER HERE FOR A CERTAIN NUMBER OF RECORDS
// for (i = index; i <= index+5; i++) {
//    x = db.users.findOne();
//    x._id = new ObjectId()
//    x.userEmail = i+"mittal"+"@gmail.com"; 
//    x.userDesiredCity = "noida";
//    x.userDesiredArea = "sec53"; 
//    db.users.insert(x);
// }
// index = i;

//CHANGE NUMBER HERE FOR A CERTAIN NUMBER OF RECORDS
// for (var i = index; i <= index+5; i++) {
//    x = db.users.findOne();
//    x._id = new ObjectId()
//    x.userEmail = i+"mittal"+"@gmail.com"; 
//    x.userDesiredCity = "noida";
//     x.userDesiredArea = "sec54"; 
//    db.users.insert(x);
// }



//  cursor = db.users.find();
//  while ( cursor.hasNext() ) {
//     printjson( cursor.next() );
//  }

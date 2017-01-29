//conn = new Mongo();
//db = conn.getDB("otenantDb"); 

db = connect("localhost:27017/otenantDb");
//********CAUTION BELOW LINE WILL REMOVE ALL USERS*******
//db.users.remove();
db.users.insert({
	"_id" : ObjectId("588c1f807d6893d132bee730"),
	"userTypeOfTenant" : "Single",
	"userDesiredCity" : "surat",
	"userFullName" : "Mohit",
	"userPassword" : "deadsea123",
	"userEmail" : "0mittal@gmail.com",
	"userNotifications" : [ ],
	"userDesiredArea" : [
		"sec52", "sec53", "sec54"
	],
	"__v" : 0
   });
for (var i = 1; i <= 54; i++) {
   x = db.users.findOne();
   x._id = new ObjectId()
   x.userEmail = i+"mittal"+"@gmail.com"; 
   db.users.insert(x);
}

count = db.users.count();
print("Inserted "+ count +"records. Example records follow.")

//  cursor = db.users.find();
//  while ( cursor.hasNext() ) {
//     printjson( cursor.next() );
//  }
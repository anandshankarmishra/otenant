var mongoose    =   require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/otenantDb');
// create instance of Schema
 var mongoSchema =   mongoose.Schema;
// create schema
var userProfleSchema  = new mongoSchema ({
    "userFullName":String,
    "userEmail" : { type: String, required: true, index: { unique: true } },
    "userPassword" : String,
    "userDesiredCity":String,
    "userDesiredArea":[String],
    "userTypeOfTenant":String,
    "userCurrentCity":String,
    "userCurrentArea":String,
    "userPhoneNo":String,
    "userRequirementDescription":String,
    "userPhotoFileName":String,
    "userIsAccountActive":Boolean,
    "userNotifications":[{
        "landlordFullName":String,
        "landlordEmail":String,
        "landlordPhoneNo":String,
        "landlordMessage":String,
        "unread":Boolean,
        "approved":Boolean,
        "tenantMessage":String
    }]
});
//create index on email
//userProfleSchema.createIndex({userEmail: 1}, {unique: true});
// create model if not exists.
var UserProfile = mongoose.model('userprofile',userProfleSchema,'users'); //Third arg is name of collection in db otenantDb
module.exports = UserProfile;

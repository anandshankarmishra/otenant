var mongoose    =   require("mongoose");
var jwt = require('jsonwebtoken');
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

userProfleSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    userEmail: this.userEmail,
    userFullName: this.userFullName,
    userDesiredCity: this.userDesiredCity,
    userCurrentCity: this.userCurrentCity,
    userCurrentArea: this.userCurrentArea,
    userPhoneNo: this.userPhoneNo,

    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};
//create index on email
//userProfleSchema.createIndex({userEmail: 1}, {unique: true});
// create model if not exists.
var UserProfile = mongoose.model('userprofile',userProfleSchema,'users'); //Third arg is name of collection in db otenantDb
module.exports = UserProfile;

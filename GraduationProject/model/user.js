var mongoose = require('../MongoDBconfig/db.js'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
	userid:{type:Number},
	username:{type:String},
	password:{type:String},
	phonenumber:{type:Number},
	email:{type:String},
	registertime:{type:Date}
},{collection:'userinfo'});

module.exports = mongoose.model('User',UserSchema);
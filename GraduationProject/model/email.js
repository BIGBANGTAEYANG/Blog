var mongoose = require('../MongoDBconfig/db.js'),
Schema = mongoose.Schema;

var EmailSchema = new Schema({
	emailuser:{type:String},
	emailAddress:{type:String},
	emailmessage:{type:String},
	emailstatus:{type:String},
	sendTime:{type:String},
	senduser:{type:String}
},{collection:'emailinfo'});

module.exports = mongoose.model('Email',EmailSchema);
var mongoose = require('../MongoDBconfig/db.js'),
Schema = mongoose.Schema;

var BlogSchema = new Schema({
	title:{type:String},
	content:{type:String},
	description:{type:String},
	username:{type:String},
	tag:{type:String},
	creatTime:{type:String}
},{collection:'bloginfo'});

module.exports = mongoose.model('Blog',BlogSchema);
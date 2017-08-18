var mongoose = require('mongoose'),
db_url = 'mongodb://127.0.0.1/iblog';
//连接
mongoose.connect(db_url);
//连接成功
mongoose.connection.on('open',function(){
	console.log('Mongoose connection open to'+db_url);
});
//连接异常
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
}); 
//断开连接
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});

module.exports = mongoose;
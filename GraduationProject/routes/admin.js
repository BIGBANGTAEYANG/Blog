var express = require('express');
var router = express.Router();
var Blog = require('../model/blog.js');
var Email = require('../model/email.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});

router.get('/admineditor',function(req,res,next){
	res.render('admin-editor', { title: 'Express' });
});

router.get('/showblog',function (req,res,next) {
	res.render('admin-showblog',{ title: 'Express' });
});

router.get('/showemail',function (req,res,next) {
	res.render('admin-showemail',{ title: 'Express' });
});

router.get('/sendemail',function (req,res,next) {
	res.render('send-email',{ title: 'Express' });
});


router.get('/userinfo',function (req,res,next) {
	if(req.session.user!=null){
		var user = req.session.user;
		var username = user.username;
		console.log(username);
		var phoneNumber = 0;
		phonenumber = user.phonenumber;
		var email = user.email;
		var registertime = user.registertime;
		return res.render('userinfo',{title:"Express",username:username,phonenumber:phonenumber,email:email,registertime:registertime});
	}else{
		return res.render('admin', { title: 'Express' });
	}
	
});

//日期转换
Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
};

//登录检测
router.post('/checklogin',function (req,res,next) {
	var user = req.session.user;
	if(user!=null&&user!=""){
		return res.render('admin', { title: 'Express' });
	}else{
		console.log(req.session.user);
		return res.json({"code":"0","msg":"用户未登录，请先登录!"});
	}
}); 





//编辑博客提交处理
router.post('/editorsubmit',function (req,res,next) {

	var content  = req.body.editor1;
	var description  = req.body.description;
	var title = req.body.title;
	var creatTime = new Date().format("yyyy-MM-dd hh:mm:ss");
	var tag = req.body.tag;

	var username  = req.session.user.username;

	var blog = new Blog({
		title:title,
		description:description,
		content:content,
		username:username,
		creatTime:creatTime,
		tag:tag
	});



	//查询条件
    var wherestr = {'username':username ,'title' : title};

	//查询
	Blog.find(wherestr,function(err,data){
		if (err) {
            console.log("Error:" + err);
            return res.render('/error');
        }
        else{
        	if(data!=null&&data!=""){
        		return  res.json({"code":"0","msg":"文章已经存在"});
        	}else{
        		blog.save(function(err,data){
					if(err){
						console.log("Error:" + err);
						return res.render('/error');
					}else{
						return res.json({"code":"1","msg":"发表文章成功!"});
					}	
				});
        	}
        }
	});
});


//查询博客请求处理
router.post('/findblog',function(req,res,next){
	var username = req.session.user.username;

	var wherestr = {'username' : username};

	Blog.find(wherestr,function(err,data){
		if (err) {
            console.log("Error:" + err);
            return res.render('/error');
        }
        else{
        	var recordsTotal = data.length;
        	return res.json({
        		"draw": 1,
				"recordsTotal": recordsTotal,
				"data": data
		});
       }
	});
});


//删除博客操作
router.get('/deleteBlog',function(req,res,next){
	var id = req.query.id;
	console.log(id);
	var wherestr = {'_id':id};
	Blog.remove(wherestr,function(err,data){
		if(err){
			console.log("Error:"+err);
		}else{
			console.log("Res:"+data);
			return res.render('admin-showblog',{ title: 'Express' });
		}
	});
});

//查询邮件
router.post('/findemail',function(req,res,next){
	var senduser = req.session.user.username;

	var wherestr = {'senduser' : senduser};

	Email.find(wherestr,function(err,data){
		if (err) {
            console.log("Error:" + err);
            return res.render('/error');
        }
        else{
        	var recordsTotal = data.length;
        	return res.json({
        		"draw": 1,
				"recordsTotal": recordsTotal,
				"data": data
		});
       }
	});
});

//删除邮件
router.get('/deleteEmail',function(req,res,next){
	var id = req.query.id;
	var wherestr = {'_id':id};
	Email.remove(wherestr,function(err,data){
		if(err){
			console.log("Error:"+err);
		}else{
			console.log("Res:"+data);
			return res.render('admin-showemail',{ title: 'Express' });
		}
	});
});


//读邮件
router.get('/reademail',function (req,res,next) {
	var id  = req.query.id;
	var emailuser = "";
	var emailAddress = "";
	var emailmessage = "";
	var emailstatus = "已阅读";
	var sendTime = "";

	var wherestr = {'_id':id};
	//更新条件
	var updatestr = {'emailstatus':emailstatus};

	Email.find(wherestr,function(err,data){
		if(err){
			console.log("Error:"+err);
		}else{
			console.log("Res:"+data);
			for (var i = 0; i < data.length; i++) {
				emailuser = data[i].emailuser;
				emailAddress = data[i].emailAddress;
				emailmessage = data[i].emailmessage;
				sendTime =  data[i].sendTime;
			}
			//更新邮件状态
			Email.update(wherestr,updatestr,function(){
				if (err) {
		            console.log("Error:" + err);
		        }
		        else {
		            console.log("Res:" + res);
		        }
			});
			
			return res.render('read-email',{ title: 'Express',emailuser:emailuser,emailAddress:emailAddress,emailmessage:emailmessage,sendTime:sendTime});
		}
	});
});




module.exports = router;

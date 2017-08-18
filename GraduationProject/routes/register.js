var express = require('express');
var router = express.Router();
var User  = require("../model/user.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Express'});
});

router.post('/reg',function (req,res,next) {

	if(req.body.username==""||req.body.username==null){
		return res.json({"code":"0","msg":"用户名不能为空！"});
	}

	//检测用户输入密码与确认密码是否一致
	if(req.body.password!=req.body.passwordTwo){
		return res.json({"code":"0","msg":"输入密码与确认密码不一致！"});	
	}

	//联系方式正则
    var re = /^1\d{10}$/;
    if (!re.test(req.body.phonenumber)) {
       return res.json({"code":"0","msg":"联系方式不符合规范，请输入正确手机号码！"});
    }

    var str = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (!str.test(req.body.email)) {
       return res.json({"code":"0","msg":"邮箱格式不符合规范，请输入正确邮箱地址！"});
    }

    var username = req.body.username;
	var password = req.body.password;
	var phonenumber = req.body.phonenumber;
	var email = req.body.email;
	var registertime = new Date();

	
	

	//检测用户名是否已经存在
	//new 对象
	var user  = new User({
		username:username,
		password:password,
		phonenumber:phonenumber,
		email:email,
		registertime:registertime
	});


	var wherestr = {'username':username};

	//查询
	User.find(wherestr,function(err,data){		
		if(err){
				console.log("Error:" + err);
				return res.render('/error');
		}else{
			if(data!=null&&data!=""){
				console.log(data);
				return res.json({"code":"0","msg":"该用户名已经存在"});
			}else{
					//用户不存在再创建用户
					user.save(function(err,data){
					if(err){
						console.log("Error:" + err);
						return res.render('/error');
					}else{
						//将注册用户储存在session中
						req.session.user = user;
						console.log(req.session.user);
						return res.json({"code":"1","msg":"用户注册成功!"});
					}					
				});
			}
		}		
	});
});


module.exports = router;

var express = require('express');
var router = express.Router();
var User  = require("../model/user.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

//用户登录请求处理
router.post('/userlogin',function (req,res,next) {
	var username = req.body.username;
	var password = req.body.password;
	
    //new 对象
    var user  = new User({
        username:username,
        password:password
    });
    
    //查询条件
    var wherestr = {'username' : username};

	User.find(wherestr).exec(function(err,data){
        if (err) {
            console.log("Error:" + err);
            return res.render('/error');
        }
        else{
                if(data!=null&&data!=""){
                    for(var i=0;i<data.length;i++){
                        user = data[i];
                        if(password==user.password){
                        console.log(user);
                        req.session.user = user;
                        return res.json({"code":"1","msg":"用户登录成功"});
                    }else{
                      
                        return res.json({"code":"0","msg":"用户登录失败，密码错误"});
                         }
                    }
                }else{
                
                     return  res.json({"code":"0","msg":"用户不存在，请先注册"});
                }            
            }
    });
 
})

module.exports = router;

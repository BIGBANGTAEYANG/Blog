var express = require('express');
var router = express.Router();
var Blog = require('../model/blog.js');
var Email = require('../model/email.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.user!=null&&req.session.user!=""){
        return res.render('index',{ "title":'Express',"username":req.session.user.username});
    }else{
       return res.render('index',{ "title":'Express',"username":"TAEYANG"});
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
}  


router.post('/getindexinfo',function(req,res,next){
    if(req.session.user!=null&&req.session.user!=""){
        var username  = req.session.user.username;
        var wherestr = {'username' : username};
        Blog.find(wherestr,function(err,data){
            if (err) {
                console.log("Error:" + err);
                return res.render('/error');
            }
            else{

                return res.json({"code":1,"obj":data,"msg":"当前用户为:"+username+"  显示其博客列表"});
           }
        });
    }else{
        var wherestr = {'username' : "王琪"};
        Blog.find(wherestr,function(err,data){
            if (err) {
                console.log("Error:" + err);
                return res.render('/error');
            }
            else{

                return res.json({"code":1,"obj":data,"msg":"用户没有登录,显示默认用户博客"});
           }
        });    
    }	
});


//查看详细blog
router.get('/allbloginfo',function(req,res,next){
	var id = req.query.id;
	var wherestr = {"_id":id};
    var username ="";
    if(req.session.user!=null&&req.session.user!=""){
         username= req.session.user.username;
    }else{
        username="王琪";
    }
    

	//定义与主页相同的样式
	var str = '<!DOCTYPE HTML><html><head><title>Express</title><meta http-equiv="content-type" content="text/html; charset=utf-8" /><noscript><link rel="stylesheet" href="/stylesheets/css/skel.css" /><link rel="stylesheet" href="/stylesheets/css/style.css" /><link rel="stylesheet" href="/stylesheets/css/style-xlarge.css" /></noscript></head><body id="top"><header id="header"><a href="#" class="image avatar"><img src="/images/avatar.jpg" alt="" /></a><h1><strong>I am '+username+', this is a super free<br />responsive site template <br />crafted by me.</strong></h1></header><div id="main">';
	var str2 ='</div><footer id="footer"><ul class="icons"><li><a href="#" class="icon fa-twitter"><span class="label">Twitter</span></a></li><li><a href="#" class="icon fa-github"><span class="label">Github</span></a></li><li><a href="#" class="icon fa-dribbble"><span class="label">Dribbble</span></a></li><li><a href="#" class="icon fa-envelope-o"><span class="label">Email</span></a></li></ul><ul class="copyright"><li>&copy; Untitled</li><li>More Learn <a href="https://github.com/BIGBANGTAEYANG" target="_blank" title="More">GitHub</a> - Collect from <a href="#" title="templates" target="_blank">Tamplates</a></li></ul></footer><script src="/javascripts/js/jquery.min.js"></script><script src="/javascripts/js/jquery.poptrox.min.js"></script><script src="/javascripts/js/skel.min.js"></script><script src="/javascripts/js/init.js"></script>';

	Blog.find(wherestr,function(err,data){
		if (err) {
            console.log("Error:" + err);
            return res.render('/error');
        }
        else{

     		var content = "";
     		for (var i = 0; i < data.length; i++) {
     			content = data[i].content;
     			str+=content;
     			str+=str2;
     			res.status(200).send(str);
     		}
       }
	});
});

//接受邮件请求处理
router.post('/saveEmail',function(req,res,next){
    var emailuser = req.body.emailuser;
    var emailAddress = req.body.emailAddress;
    var emailmessage = req.body.emailmessage;
    var sendTime = new Date().format("yyyy-MM-dd hh:mm:ss");
    var emailstatus  =  "未处理";
    var senduser = "";
    if(req.session.user!=null&&req.session.user!=""){
        senduser = req.session.user.username;
    }else{
        senduser = "王琪";
    }


    var email = new Email({
        emailuser:emailuser,
        emailAddress:emailAddress,
        emailmessage:emailmessage,
        emailstatus:emailstatus,
        sendTime:sendTime,
        senduser:senduser
    });

    email.save(function(err,data){
        if(err){
            console.log("Error:" + err);
            return res.render('/error');
        }else{
            return res.render('index',{ title:'Express',username:"TAEYANG"});
        }                       
    });
});



module.exports = router;

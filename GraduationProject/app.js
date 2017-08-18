// 加载依赖库，原来这个类库都封装在connect中，现在需地注单独加载
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');


// 加载路由控制
var index = require('./routes/index');
var admin = require('./routes/admin');
var login = require('./routes/login');
var register = require('./routes/register');


var app = express();

// view engine setup
// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
//这里原来是用的ejs模板，将其改为.html文件，修改此处
app.engine('.html',ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public


// 定义icon图标
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 定义日志和输出级别
app.use(logger('dev'));
// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//设置session存入cookie,存入的是sessionid
app.use(cookieParser('iblogsession'));
//设置Session
app.use(session({
	secret:'iblogsession',
	cookie:{maxAge:8640000}
}))
app.use(express.static(path.join(__dirname, 'public')));





//匹配路径和路由
app.use('/login',login);
app.use('/register',register);
app.use('/', index);
app.use('/admin', admin);





// catch 404 and forward to error handler
//404错误处理
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// 开发环境，500错误处理和错误堆栈跟踪
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 输出模型app
module.exports = app;

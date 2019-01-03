var express = require('express');
var bodyParser = require("body-parser")
var app = express();
var sqlAction = require('./route/sqlRoute'); //在应用中加载路由模块：数据库操作相关操作路由

app.use('/static', express.static('public')); //利用 Express 托管静态文件 
app.use(bodyParser.urlencoded({
   extended: false,                 //扩展模式
   limit: 2 * 1024 * 1024           //限制-2M
}));
app.use('/user', sqlAction);  	//接口访问

app.get('/', function (req, res) {
   res.sendfile('./public/testReact.html');
});

var server = app.listen(8095, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log('Listening at http://localhost:' + port + '\n');
});

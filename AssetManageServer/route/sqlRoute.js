/*
	*1、封装MySQL路由，实现接口转发功能
	
*/

var express = require('express');
var router = express.Router();
var url = require('url');
var sqlAction = require('../model/sqlAction');//引入封装的数据库操作模块

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
   console.log('Time: ', Date.now() + '\n');
   next();
});

// 定义数据库接口插入数据路由
router.get('/insert', function (req, res) {
   sqlAction.insert(req, res);
});

// 定义数据库接口删除数据路由
router.get('/deleteOne', function (req, res) {
   sqlAction.deleteOne(req, res);
});

// 定义数据库接口更新数据路由
router.get('/update', function (req, res) {
   sqlAction.update(req, res);
});

// 定义数据库接口查询数据路由
router.get('/search', function (req, res) {
   res.setHeader("Access-Control-Allow-Origin", "*");//允许其他域名访问,响应头为*的时候，允许跨域访问
   res.setHeader("Access-Control-Allow-Methods", "GET");// 响应类型 
   res.setHeader("Access-Control-Allow-Headers", "x-requested-with,content-type");// 响应头设置 
   sqlAction.search(req, res);
});

// 定义数据库接口查询数据路由
router.get('/login', function (req, res) {
   res.setHeader("Access-Control-Allow-Origin", "*");//允许其他域名访问,响应头为*的时候，允许跨域访问
   res.setHeader("Access-Control-Allow-Methods", "GET");// 响应类型 
   res.setHeader("Access-Control-Allow-Headers", "x-requested-with,content-type");// 响应头设置 
   sqlAction.login(req, res);
});

// 图片上传路径
router.post('/upload', function (req, res) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'X_FILENAME, Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
   res.header("X-Powered-By", ' 3.2.1')
   res.header("Content-Type", "application/json;charset=utf-8");
   sqlAction.upload(req, res);
});

module.exports = router;







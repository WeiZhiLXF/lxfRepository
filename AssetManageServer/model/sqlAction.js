var fs = require('fs');
var url = require('url');
var querystring = require('querystring');//在nodejs中，提供了querystring这个模块，用来做url查询参数的解析

var mysql = require('mysql');

var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   port: '3306',
   database: 'zcgl_db',
});

connection.connect();

// /**跨域加载数据，返回的jsonp格式需要拿callback包装一下 */
// function callback() { }
function insert(req, res) {

   var reqUrl = url.parse(req.url);
   console.log("url===" + JSON.stringify(reqUrl));
   var obj = querystring.parse(reqUrl.query);
   var name = obj.name || '';
   var sex = obj.sex || '';
   var age = obj.age || '';

   var sql = "INSERT INTO user(name,sex,age) values('" + name + "','" + sex + "','" + age + "')";

   console.log("sql INSERT ===" + sql);
   //查
   connection.query(sql, function (err, result) {
      if (err) {
         console.log('[SELECT ERROR] - ', err.message);
         res.send(JSON.stringify({ status: 'fail', data: err.message }));
         return;
      }
      res.send(JSON.stringify({ status: 'ok', data: result }));

      console.log('--------------------------SELECT----------------------------');
      console.log(result);
      console.log('------------------------------------------------------------\n\n');
   });
   //connection.end(); //此处不能关闭连接，可能因为异步原因，下次调用将导致 SQL连接关闭：[SELECT ERROR] -  Cannot enqueue Query after invoking quit.

}



function deleteOne(req, res) {

   var reqUrl = url.parse(req.url);
   console.log("url===" + JSON.stringify(reqUrl) + '\n');
   var obj = querystring.parse(reqUrl.query);
   var name = obj.name || '';
   var sex = obj.sex || '';

   var sql = "DELETE FROM user WHERE name='" + name + "' AND sex='" + sex + "'"

   console.log("sql INSERT ===" + sql + '\n');
   //查
   connection.query(sql, function (err, result) {
      if (err) {
         console.log('[SELECT ERROR] - ', err.message + '\n');
         res.send(JSON.stringify({ status: 'fail', data: err.message }));
         return;
      }
      res.send(JSON.stringify({ status: 'ok', data: result }));

      console.log('--------------------------SELECT----------------------------' + '\n');
      console.log(result);
      console.log('------------------------------------------------------------\n\n');
   });
   //connection.end(); //此处不能关闭连接，可能因为异步原因，下次调用将导致 SQL连接关闭：[SELECT ERROR] -  Cannot enqueue Query after invoking quit.

}



function update(req, res) {

   var reqUrl = url.parse(req.url);
   console.log("url===" + JSON.stringify(reqUrl) + '\n');
   var obj = querystring.parse(reqUrl.query);
   var name = obj.name || '';
   var sex = obj.sex || '';

   var sql = "UPDATE user SET sex='" + sex + "' WHERE name='" + name + "'";

   console.log("sql INSERT ===" + sql + '\n');
   //查
   connection.query(sql, function (err, result) {
      if (err) {
         console.log('[SELECT ERROR] - ', err.message + '\n');
         res.send(JSON.stringify({ status: 'fail', data: err.message }));
         return;
      }
      res.send(JSON.stringify({ status: 'ok', data: result }));

      console.log('--------------------------SELECT----------------------------' + '\n');
      console.log(result);
      console.log('------------------------------------------------------------\n\n');
   });
   //connection.end(); //此处不能关闭连接，可能因为异步原因，下次调用将导致 SQL连接关闭：[SELECT ERROR] -  Cannot enqueue Query after invoking quit.

}

function search(req, res) {
   var reqUrl = url.parse(req.url);
   var callback = req.query.callback;
   var obj = querystring.parse(reqUrl.query);
   var name = obj.name || '';
   var sql;
   if (name) {
      sql = "SELECT * FROM zcgl_information where name='" + name + "'";
   } else {
      sql = 'SELECT * FROM zcgl_information';
   }
   connection.query(sql, function (err, result) {
      if (err) {
         res.send(JSON.stringify({ status: 'fail', data: err.message }));
         return;
      } else {
         res.send(callback + '(' + JSON.stringify({ status: 'ok', data: result }) + ')');
         console.log(result);
      }
   });
   //connection.end(); //此处不能关闭连接，可能因为异步原因，下次调用将导致 SQL连接关闭：[SELECT ERROR] -  Cannot enqueue Query after invoking quit.

}
function upload(req, res) {
   var imageData = req.body.image_data;
   var imageName = req.body.image_name;

   if (imageData) {
      var avatar = imageData.replace(/^data:image\/\w+;base64,/, '');
      newBuff = new Buffer(avatar, 'base64');
      fs.writeFile('../../public/img/' + imageName + '.jpg', newBuff, 'binary', function (err) {
         if (err) {
            return res.status(500).send('错误');
         } else {
            res.send({ success: true, res: '哈哈哈哈' })
         }
      });
   } else {
      res.status(404).send('无数据');
   }

}

/**登录接口 */
function login(req, res) {
   var reqUrl = url.parse(req.url);
   var callback = req.query.callback;
   var obj = querystring.parse(reqUrl.query);
   var userName = obj.userName;
   var passWord = obj.passWord;

   var sql;
   sql = "SELECT * FROM zcgl_admin where ad_name='" + userName + "'and ad_password='" + passWord + "'";
   connection.query(sql, function (err, result) {
      if (err) {
         res.send(callback + '(' + JSON.stringify({ status: 'fail', data: err.message }) + ')');
         return;
      } else {
         if (result.length > 0) {
            res.send(callback + '(' + JSON.stringify({ status: 'ok', data: result }) + ')');
         } else {
            res.send(callback + '(' + JSON.stringify({ status: 'null', data: result }) + ')');
         }

      }
   });
   //connection.end(); //此处不能关闭连接，可能因为异步原因，下次调用将导致 SQL连接关闭：[SELECT ERROR] -  Cannot enqueue Query after invoking quit.

}

// 提供给其他模块使用的接口
module.exports = {
   insert: insert,
   deleteOne: deleteOne,
   update: update,
   search: search,
   upload: upload,
   login: login
};

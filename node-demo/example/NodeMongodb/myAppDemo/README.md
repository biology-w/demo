# node-mongodb-demo

demo创建
npm install express-generator -g

使用express 命令创建 -e表示ejs模板引擎，不写 -e 默认的创建jade模板引擎
express -e myAppDemo

cd myAppDemo

npm install

npm start
打开 http://localhost:3000 显示

添加nodemon
使用nodemon 可以修改文件后自动重启express服务
npm install --save-dev nodemon

在package.json scripts 中添加 "devStart": "nodemon ./bin/www"

node_modules 项目依赖包
public 公共资源目录
routes 路由文件
views 页面文件
app.js 项目入口文件
bin/www 创建node HTTP server


# mongodb 安装
网上有安装教程
https://cnodejs.org/topic/547293caa3e2aee40698df0b

mongodb的安装
window 安装
在D盘的mongodb目录下

1.在D盘中创建 mongodb 文件夹然后把下载的包解压后把其中的 bin 文件夹拷贝到创建的 mongodb 文件夹中，
2.然后在mongodb文件夹中创建一个 data 文件夹，再在 data 文件夹中创建 db 文件夹
3.打开CMD命令行

 d:
cd mongodb\bin
mongod -dbpath D:\mongodb\data\db
4.在打开一个CMD命令行：
d:
cd mongodb\bin
mongo
5.这样就可以用了。

接着就设计我们的数据库了

在刚才的打开的mongodb数据库中输入：

 use chihuo  \创建一个叫chihuo的数据库
db.createCollection(“users”) \创建一个集合
db.users.insert({“name”:“admin”,“password”:“111”}) \给users集合添加一个文档。
db.users.find() \查询你添加的文档

再接着就是在项目中连接刚才创建的数据库了

在项目根目录下创建一个的文件夹 database ，然后在创建一个
db.js

var mongoose = require('mongoose');
var db = mongoose.createConnect('mongodb://localhost/myAppDemo');//；连接数据库
var Schema = mongoose.Schema;   //  创建模型
var userScheMa = new Schema({
	name: String,
	password: String
}); //  定义了一个新的模型，但是此模式还未和users集合有关联
exports.user = db.model('users', userScheMa); //  与users集合关联


3.接着在views文件夹创建视图文件了

我们一般习惯使用html后缀名。

在app.js文件中 找到
>app.set('view engine', 'ejs');
把它替换成：
>app.set( 'view engine', 'html' );
再用app.engine()方法注册模板引擎的后缀名。代码：
>app.engine('.html',require('ejs').__express);//两个下划线

然后我们创建一个login.html(登陆页面),index.html(原来有，改一下后缀名就行)，ucenter(登陆之后的页面)；

4.最后就是路由的控制了，在routes文件中的index.js

 var express = require('express');
  var router = express.Router();
  var user = require('../database/db').user;


	/* GET home page. */
  router.get('/', function(req, res) {
	    res.render('index', { title: 'index' });
  });

  /* login */
  router.get('/login', function(req, res) {
	    res.render('login', { title: 'login' });
  });

  /* ucenter */
  router.post('/ucenter', function(req, res) {
		  var query = {name: req.body.name, password: req.body.password};
		  (function(){
				  user.count(query, function(err, doc){    //count返回集合中文档的数量，和 find 一样可以接收查询条件。query 表示查询的条件
						if(doc == 1){
							console.log(query.name + ": 登陆成功 " + new Date());
							res.render('ucenter', { title:'ucenter' });
						}else{
							console.log(query.name + ": 登陆失败 " + new Date());
							res.redirect('/');
						}
			  	});
		  })(query);
  });

  module.exports = router;
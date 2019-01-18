// 创建数据库
// 要在 MongoDB 中创建一个数据库，首先我们需要创建一个 MongoClient 对象，然后配置好指定的 URL 和 端口号。
// 如果数据库不存在，MongoDB 将创建数据库并建立连接

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/myappone';

MongoClient.connect(url, function(err, db) {
    if(err) throw err;
    console.log('数据库已创建!');
    const dbase = db.db('myappone');
    dbase.createCollection('site', function(err, res) {
        if(err) throw err;
        console.log('创建集合');
        db.close();
    });
})

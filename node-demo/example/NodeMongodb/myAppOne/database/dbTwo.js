//与 MySQL 不同的是 MongoDB 会自动创建数据库和集合，所以使用前我们不需要手动去创建。
// insertMany
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function (err, db) {
    if(err) throw err;
    const dbase = db.db('myappone');
    const obj = {name: 'demo', url: 'https://www.google.com/'};
    dbase.collection('site').c(obj, function(err, res) {
        if(err) throw err;
        console.log('文档插入成功');
        console.log('db: ' + db);
        console.log('res: ' + res);
        db.close();
    })
})

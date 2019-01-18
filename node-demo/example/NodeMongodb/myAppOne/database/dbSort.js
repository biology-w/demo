// 排序 sort()方法 参数 1生序 -1降序
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function (err, db) {
    if(err) throw err;
    const dbase = db.db('myappone');
    const whereObj = {name: 1};
    dbase.collection('site').find().sort(whereObj).toArray(function(err, result) {
        if(err) throw err;
        console.log(result);
        db.close();
    });
})

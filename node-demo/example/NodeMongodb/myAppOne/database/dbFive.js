// 更新数据
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function (err, db) {
    if(err) throw err;
    const dbase = db.db('myappone');
    const whereObj = {name: 'demo', url: 'https://www.google.com/'}
    const updateObj = {$set: {name: 'wjwdemo'}}
    // 一条数据
    // dbase.collection('site').updateOne(whereObj, updateObj, function(err, result) {
    //     if(err) throw err;
    //     console.log('update');
    //     db.close();
    // });
    // 多条数据
    dbase.collection('site').updateMany(whereObj, updateObj, function(err, res) {
        if(err) throw err;

        console.log('update count: ' + res.result.nModified);
        db.close();
    })
})

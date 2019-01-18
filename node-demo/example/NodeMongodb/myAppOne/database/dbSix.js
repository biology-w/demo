// 删除集合 drop()
// 删除数据 deleteOne deleteMany
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function (err, db) {
    if(err) throw err;
    const dbase = db.db('myappone');
    const whereObj = {name: 'demo', url: 'https://www.google.com/'};
    const updateObj = {$set: {name: 'wjwdemo'}};
    // 一条数据
    dbase.collection('site').deleteOne(whereObj, function(err, result) {
        if(err) throw err;
        console.log('update');
        db.close();
    });
    // 多条数据
    // dbase.collection('site').deleteMany(whereObj, function(err, res) {
    //     if(err) throw err;
    //     console.log('update count: ' + res.result.nModified);
    //     db.close();
    // })

    // 删除 test 集合
    // dbase.collection("test").drop(function(err, delOK) {  // 执行成功 delOK 返回 true，否则返回 false
    //     if (err) throw err;
    //     if (delOK) console.log("集合已删除");
    //     db.close();
    // });
})

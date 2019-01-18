// 查询分页 limit()设置指定返回条数；
// 查询分页 skip()指定跳过的条数；
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function (err, db) {
    if(err) throw err;
    const dbase = db.db('myappone');
    dbase.collection('site').find().limit(2).toArray(function(err, result) {
        if(err) throw err;
        console.log(result);
        db.close();
    });
    // 跳过前面2条数据 读取2条数据
    // dbase.collection('site').find().skip(2).limit(2).toArray(function(err, result) {
    //     if(err) throw err;
    //     console.log(result);
    //     db.close();
    // });
})

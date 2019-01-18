// 查询数据
// 可以使用 find() 来查找数据, find() 可以返回匹配条件的所有数据。
// 如果未指定条件，find() 返回集合中的所有数据
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function (err, db) {
    if(err) throw err;
    const dbase = db.db('myappone');
    // whersObj 为 {} 返回所有的；
    const whersObj = {name: 'demo', url: 'https://www.google.com/'}
    dbase.collection('site').find(whersObj).toArray(function(err, result) {
        if(err) throw err;
        console.log(result);
        db.close();
    })
})

// 连接操作
// mongoDB 不是一个关系型数据库，但我们可以使用 $lookup 来实现左连接。
// 例如 集合1 orders [{_id: 1, order_id: 2, name: 'order'}]
// 集合2 products [{_id:2, name: 'product'}, {_id: 3, name: 'product2'}]
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function (err, db) {
    if(err) throw err;
    const dbase = db.db('myappone');
    dbase.collection('orders').aggregate([
        {$lookup: {
            from: 'products',  // 右集合
                localField: 'order_id', // 左集合 join字段
            foreignField: '_id',  // 右集合 join字段
            as: 'orderdetails'    // 新生成字段 （类型 Array）
            }
        }
    ], function(err, res) {
        if (err) throw err;
        // console.log(JSON.stringify(res));
        console.log(res);
        db.close();
    })
})

// js 中自有的字符串操作不能满足node中文件和网络I/O，以及处理大量的二进制数据。所以产生Buffer对象
// Buffer是二进制数据，字符串与Buffer之间存在编码关系；
//Buffer是一个对象，类似Array,主要用于操作字节。全局对象；
//可从模块结构，对象结构了解。
// 模块结构 --> 性能相关部分是用C++实现（内建模块），非性能相关部分是js实现（Buffer/SlowBuffer）；
// Buffer 占用的内存属于堆外内存（是在Node的C++层面实现内存申请，在js中分配内存的策略），不是通过V8分配；

const fs = require('fs');

// fs读取默认是项目的根目录
const reader = fs.createReadStream('./note/Buffer/Buffer.js');
const writer = fs.createWriteStream('./tempTest/BufferTest.js');

reader.pipe(writer);
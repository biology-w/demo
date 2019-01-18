// Buffer 的拼接
//文件可读流每次读取的Buffer长度 highWaterMark比较小的时候 console.log(data') 有中文乱码
// 是因为 限制了读取长度后 一个中文3个字节，要是读取某个中文3个字节没有全部读取（即截断读取） 则data = data.toString() + chunk.toString() 就乱码；
// pipe() write() 等写入文件中 方法 无乱码；
// setEncoding() string_decoder()


const fs = require('fs');

// fs读取默认是项目的根目录
const reader = fs.createReadStream('./note/Buffer/Buffer.js', {
    highWaterMark: 11
});

// 使用 setEncoding 避免打印 中文乱码；但是不能根本上解决问题 而且只能处理 utf-8 Base64  UCS-2/UTF-16LE；
// reader.setEncoding('utf-8');

const writer = fs.createWriteStream('./tempTest/BufferTest.js');

var data = '';
reader.on('data', function (chunk) {
    // data +=chunk 操作了 data = data.toString() + chunk.toString()
    data += chunk;
    writer.write(chunk);
});

reader.on('end', function () {
    writer.end();
    console.log(data);
})



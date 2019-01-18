// Buffer的正确拼接
// 将接收的所有Buffer片段记录到数组中，并将片段总长度用一个变量记录下来。
//然后再将片段合并一个大Buffer对象。

const iconv = require('iconv-lite');
const fs = require('fs');

// fs读取默认是项目的根目录
const reader = fs.createReadStream('./note/Buffer/Buffer.js', {
    highWaterMark: 11
});

const writer = fs.createWriteStream('./tempTest/BufferTest.js');

const chunks = [];
var size = 0;

reader.on('data', function (chunk) {
    chunks.push(chunk);
    size += chunk.length;
    writer.write(chunk);
});

reader.on('end', function () {
    const buf = Buffer.concat(chunks, size);
    const str = iconv.decode(buf, 'utf8');

    writer.end();
    console.log(str);
});

Buffer.concat = function (data, length) {
    if(!Array.isArray(data)) {
        throw new Error('Usage: Buffer.concat(data[,length]) data is Array')
    }

    if(typeof length !== 'number') {
        length = 0;
        for (var i = 0; i < data.length; i++) {
            length += data[i].length;
        }
    }

    if (length === 0) {
        return new Buffer(0);
    } else if (length === 1) {
        return data[0]
    }

    var buffer = new Buffer(length);
    var targetStart = 0;
    for(var i = 0; i < data.length; i++) {
        var buf = data[i];
        buf.copy(buffer, targetStart);
        targetStart += buf.length;
    }
    return buffer;
}






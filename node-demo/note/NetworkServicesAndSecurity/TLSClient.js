// TLS 客户端 使用Node 来模拟客户端 tls.connect()

// 为客户端生成属于自己的私钥和签名
//创建私钥 openssl genrsa -out client.key 1024
// 生成CSR openssl req -new -key client.key -out client.csr
// 生成签名证书
// openssl x509 -req -CA ca.crt -CAkey -CAcreateserial -in client.csr -out client.crt


const tls = require('tls');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./keys/client.key'),
    cert: fs.readFileSync('./keys/client.crt'),
    ca: [fs.readFileSync('./keys/ca.crt')]
};

const stream = tls.connect(8100, options, function () {
    console.log('client connected', stream.authorized ? 'authorized' : 'unauthorized');
    process.stdin.pipe(stream);
});

stream.setEncoding('utf8');
stream.on('data', function (data) {
    console.log(data)
});
stream.on('end', function () {
    server.close();
})
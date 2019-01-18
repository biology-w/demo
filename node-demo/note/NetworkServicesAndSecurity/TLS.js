//TLS 服务
//用tls创建一个安全的TCP服务

const tls = require('tls');
const fs = require('fs');

//openssl genrsa -out ca.key 1024
//openssl req -new -key ca.key -out ca.csr
//openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt


//openssl req -new -key server.key -out server.csr
//openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out server.crt


const options = {
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
    requestCert: true,
    ca: [fs.readFileSync('./keys/ca.crt')]
};

const server = tls.createServer(options, function(stream) {
    console.log('server connected', stream.authorized ? 'authorized' : 'unauthorized');
    stream.write('welcome \n');
    stream.setEncoding('utf-8');
    stream.pipe(stream);
});

server.listen(8100, function () {
    console.log('server bound')
})
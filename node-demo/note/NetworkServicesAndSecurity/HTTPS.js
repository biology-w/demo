//HTTPS 服务需要用到私钥和签名证书


const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt')
};

https.createServer(options, function(req, res) {
    res.writeHead(200);
    res.end('Hello \n');
}).listen(8100, function () {
    console.log('server running is: https://localhost:8100')
});
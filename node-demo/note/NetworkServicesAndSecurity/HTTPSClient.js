// 与http相比增加了证书

const https = require('https');
const fs = require('fs');

const options = {
    hostname: 'localhost',
    port: 8100,
    path: '/',
    method: 'GET',
    // rejectUnauthorized: false,
    key: fs.readFileSync('./keys/client.key'),
    cert: fs.readFileSync('./keys/client.crt'),
    ca: [fs.readFileSync('./keys/ca.crt')]
};

options.agent = new https.Agent(options);

const req = https.request(options, function (res) {
    res.setEncoding('utf-8');
    res.on('data', function (data) {
        console.log(data);
    })
});
req.end();

req.on('error', function (e) {
    console.log(e)
})
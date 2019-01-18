// http.request(options, connect) 用于构造HTTP客户端


const http = require('http');

// const agent = new http.Agent({maxSocket: 10})

const options = {
    hostname: '127.0.0.1',
    port: 8100,
    path: '/',
    method: 'GET',
    // 默认是全局的代理对象 默认连接数的限制是5。若agent: false 则是脱离连接池的管理，使请求不受并发的下限制；
    // Agent 对象中的sockets 和 requests 属相分别表示当前连接池中使用的连接数和处于等待状态的请求数；
    // agent: agent
}

const req = http.request(options, function(res) {
    console.log('status: ' + res.statusCode);
    console.log('headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf-8');
    res.on('data', function(chunk) {
        console.log('client: ' + chunk);
    })
});
req.end();
// http服务：处理HTTP请求和发送HTTP响应；
// 请求报文和响应报文：均含有报文头和报文体；

// node中的 HTTP继承自TCP；

// 报文头信息API res.writeHead() 和res.setHeader()
// 可以调用setHeader() 对报文进行多次设置 但是只有调用 writeHead()后 报文才会写入连接中；
// 注：报文头是在报文体发送之前发送的，一旦开始了数据的发送，writeHead和setHeader 将不再生效；
// 务必关闭连接 end();

// 报文体API res.write() 和 res.end()
// end()会先调用write()发送数据，之后发送信号告知服务器这次响应结束；

const http = require('http');

http.createServer(function(req, res) {
  const buffers = []
  req.on('data', function (chunk) {
      // console.log('chunk')
      // console.log(chunk)
      // buffers.push(chunk);
  }).on('end', function(){
    const buf = Buffer.concat(buffers);
    // console.log('buf');
    // console.log(buf.toString());
      res.writeHead(200, {'Content-Type': 'text/plain'}); // 可分为 setHeader() 和 writeHead()两部分
      res.end('server end' + buf.toString())
  })
}).listen(8100, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8100');
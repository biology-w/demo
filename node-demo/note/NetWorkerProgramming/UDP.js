// 用户数据包协议 与TCP一样属于网络传输层 两者最大的不同是UDP不是面向连接的；

// 创建UDP套接字很简单，一旦创建既可以作为客户端发送数据，也可以作为服务器端接收数据；
// eg: const dgram = require('dgram');
//     const socket = dgram.createSocket('udp4');

// 创建UDP服务器

const dgram = require('dgram');
const server = dgram.createSocket('udp4');


server.on('message', function (mes, info) {
  console.log('server got:' + mes + " --from--" + info.address + ":" + info.port);
})

server.on('listening', function () {
  const address = server.address();
  console.log('server listening--' + address.address + ":" + address.port);
})

server.bind(8100);
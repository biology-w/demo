// 构建TCP 服务；传输控协议；
// OSI 模型 物理层(硬件)  链路层(网络特有链路接口) 网络层(IP) 
// 传输层(TCP/UDP)  会话层(通讯链接/维持链接)   表示层(加密/解密等)   应用层(HTTP，SMTP，IMAP等)

// 创建一个TCP服务器来接受网络请求

const net = require('net');
// server服务器是EventEmitter的实例；
const server = net.createServer(function (socket) {
    // 新的链接
    socket.on('data', function (data) {
        socket.write('hello,' + data);
        // socket.pipe(socket);
    })

    socket.on('error', function (error) {
        console.log(error)
    })
    
    socket.on('end', function () {
        console.log('连接断开！')
    })
    socket.write('welcome!\n')
})

server.close(function () {
    // console.log('server close!')
})

server.listen(8100, function () {
    console.log('server 8100')
})
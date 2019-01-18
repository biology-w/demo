// WebSocket 服务  主要两部分：握手和数据传输；
//可以与node很好的配合
// WebSocket 客户端是基于事件的编程模型 与node中自定义事件很相似
// WebSocket 实现了客户端与服务器端之间的长连接。node的事件驱动方式擅长与大量客户端保持高并发连接；

// WebSocket 比传统的 HTTP 有如下有点：
//1、 客户端与服务器端只建立一个TCP连接，可以使用更少的连接；
//2、WebSocket 服务器端可以推送数据到客户端，比HTTP请求响应更加灵活，高效，
//3、有更轻量级的协议头，减少数据传送量；



// WebSocket 握手
// WebSocket客户端建立连接时，通过HTTP发起请求
// 其与普通的HTTP请求协议略有区别的地方是如下协议头：
// Upgrade: websocket   表明请求服务器端升级协议
// Connection: Upgrade


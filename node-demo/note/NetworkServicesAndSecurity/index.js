// 网络安全与服务
// SSL (Secure Sockets layer) 安全套接层。是一种安全协议，在传输层提供对网络连接加密的功能；
// node在网络安全模块：crypto(主要是用于加密解密), tls , https
// tls建立在TLS/SSL 加密的TCP连接上。

// TLS/SSL 是一个公钥/私钥的结构。公钥用来加密要传输的数据，私钥用来解密接收的数据。
// node 在底层采用的是 openssl实现TLS/SSL

// 数字认证：CA
const dgram = require('dgram');

const message = new Buffer('Hello world!');
const client = dgram.createSocket('udp4');
// send(buf, offset, length. port , address. [callback])
client.send(message, 0, message.length, 8100, "localhost", function (error, bytes) {
  client.close();
})
const net = require('net');

const client = net.connect({port: 8100}, function(){
    console.log('client connect');
    client.write('world!')
});

client.on('data', function (data) {
    console.log(data.toString());
    client.end();
});

client.on('end', function () {
    console.log('client end')
});
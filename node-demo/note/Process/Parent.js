//Parent
const cp = require('child_process');
const subFork = cp.fork(__dirname, '/sub.js');

subFork.on('message', function (message) {
  console.log(message)
});

subFork.send({hello: 'world'});
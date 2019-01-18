process.on('message', function (data) {
  console.log('sub', data);
});

process.send({sub: 'sub'});
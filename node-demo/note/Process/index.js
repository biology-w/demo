// 进程
// 1,如何充分利用多核CPU服务器？
// 2，如何保证进程的健壮性和稳定性？

// Node 的 child_process 模块中 child_process_fork()方法可以实现进程的复制；
// fork复制的进程都是一个独立的进程，有着独立而全新的V8实例；但是fork()进程是昂贵的；
//

const fork = require('child_process').fork;
const cpus = require('os').cpus();

for(let i = 0; i < cpus.length; i++) {
  fork('./worker.js');
}
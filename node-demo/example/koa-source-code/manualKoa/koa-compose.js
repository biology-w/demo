

function f1(x, y) {
  return x + y
}

function f2(x) {
  return x * x
}

function compose(fn1,fn2) {
  return (...args) => fn2(fn1(...args))
}


function composeTwo (mids) {
  return (...args) => {
    const len = mids.length
    let res = mids[0](...args)
    for (let i = 1; i < len; i++) {
      res = mids[i](res)
    }
    return res
  }
}


async function fn1 (next) {
  console.log('fn1 start')
  await next()
  console.log('fn1 end')
}

async function fn2(next) {
  console.log('fn2 start')
  await next()
  console.log('fn2 end')
}


async function fn3() {
  console.log('fn3 start')
}


function composeThree(mids) {
  return (...args) => {
    const dispatch = (i) => {
      const fn = mids[i]
      if(!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(fn(function next() {
        return dispatch(i + 1)
      }))
    }
    return dispatch(0)
  }
}

console.log(compose(f1,f2)(1, 2))
console.log(composeTwo([f1,f2])(1, 2))
console.log(composeThree([fn1,fn2, fn3])(1, 2).then(val => {
  console.log('val:' + val)
}))

async function f1 () {
  console.log('1')
  setTimeout(() => {
    console.log('set----')
  }, 1000)
  await f2()
  console.log('2')
}

console.log('two')
f1()
console.log('one')

async function f2() {
  console.log('3')
  // await setTimeout(() => {
  //   console.log('set----f2')
  //   resolve('sleep')
  // }, 2000)
  await new Promise(resolve => {
    setTimeout(() => {
      console.log('set----f2')
      resolve('sleep')
    }, 2000)
  })
  console.log('4')
}

async function f3() {
  console.log('5')
}

console.log('three')

// two 1 3 5 one three 4 2
// two 1 3 one 4 2 three set---- set---f2
// two 1 3 one three set---- set---f2 4 2

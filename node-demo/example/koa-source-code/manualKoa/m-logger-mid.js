module.exports = async function(ctx, next) {
  const start = new Date().getTime()
  console.log('logger-start: '+ ctx.url)
  await next()
  const end = new Date().getTime()
  console.log('logger-end-请求'+ ctx.url + '耗时：'+ parseInt(end-start) + 'ms')
}

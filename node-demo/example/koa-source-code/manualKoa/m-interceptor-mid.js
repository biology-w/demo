module.exports = async function(ctx, next) {
  const { res, req } = ctx
  const blackList = ['127.0.0.1']
  const ip = getClientIP(req)
  console.log('ip')
  console.log(ip)
  if (blackList.includes(ip)) {
    res.body = 'not allowed'
  } else {
    await next()
  }
}

function getClientIP(req) {
  return (
    req.headers['x-forwarded-for'] || // 判断是否有反向代理
    req.connection.remoteAddress || // 判断 connection的远程 IP
    req.socket.remoteAddress || // 判断后端的socket的IP
    req.connection.socket.remoteAddress
  )
}

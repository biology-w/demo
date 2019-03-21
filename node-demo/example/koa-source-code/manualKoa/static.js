// 静态文件服务
const path = require('path')
const fs = require('fs')

module.exports = (dirPath = '../public') => async (ctx, next) => {
  if (ctx.url.indexOf('/public') !== 0) { // 若不是静态文件，直接去下一个中间件;
    return await next()
  }

  const url = path.resolve(__dirname, dirPath)
  const fileBaseName = path.basename(url)
  const filepath = url + ctx.url.replace('/public', '')
  console.log('static----------')
  console.log(url, ctx.url,fileBaseName,filepath)

  try {
    const stats = fs.statSync(filepath)
    if (stats.isDirectory()) {
      const dir = fs.readdirSync(filepath)
      const htmlArr = ['<div>']
      dir.forEach(filename => {
        const subStats = fs.statSync(filepath + '/' + filename)
        if (subStats.isDirectory()) {
          htmlArr.push(`<p><a href=${ctx.url}/${filename}>${filename}</p>`)
        } else {
          htmlArr.push(`<p style="color:black;"><a href=${ctx.url}/${filename}>${filename}</p>`)
        }
      })

      htmlArr.push('</div>');
      ctx.body = htmlArr.join('');
    } else {
      // 文件
      const content = fs.readFileSync(filepath)
      ctx.body = content
    }

  }catch (e) {
    // 文件不存在
    console.log('static: ', e)
    ctx.body = '404, not found'
  }
}

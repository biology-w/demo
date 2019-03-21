// 在此引入上下文(context): 为了简化API，将请求对象req,和响应对象res封装并挂载到context上；原理上使用：getter,setter；
// 和中间件机制(middleware)

const context = require('./context')
const request = require('./request')
const response = require('./response')

const http = require('http')

class Application {
  constructor() {
    this.middlewares = []
  }

  listen(...args) {
    const server = http.createServer(async (req, res) => {
      const ctx = this.createContext(req, res)

      // 合成中间件函数
      const fn = this.compose(this.middlewares)
      await fn(ctx)

      res.end(ctx.body)
    })
    server.listen(...args, () => {
      console.log(...args)
    })
  }

  use (middleware) {
    this.middlewares.push(middleware)
  }

  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;

    return ctx
  }

  compose(mids) {
    return (ctx) => {
      const dispatch = (i) => {
        const fn = mids[i]
        if(!fn) {
          return Promise.resolve()
        }
        return Promise.resolve(fn(ctx, function next() {
          return dispatch(i + 1)
        }))
      }
      return dispatch(0)
    }
  }
}


module.exports = Application

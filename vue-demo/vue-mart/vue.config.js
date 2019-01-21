module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: {
    devServer: {
      before(app) {
        // 中间件
        app.use(function(req, res, next) {
          if (/^\/api/.test(req.path)) { // 校验 api开头的请求;
            if(req.path === '/api/login' || req.headers.token) {

            } else {
              res.sendStatus(401);// 错误状态提示用户需要重新登陆;
            }
          }
          next()
        })

        app.get('/api/login', function(req, res) {
          const { username, password } = req.query
          if (username === 'weijunwei' && password === '123') {
            res.json({ code: 200, token: 'weijuwentoken'})
          } else {
            res.json({ code: 0, message: '用户名或者密码错误！'})
          }
        }),

        app.get('/api/logout', function(req, res) {
          res.json({code: -1})
        }),

        app.get("/api/goods", function(req, res) {
            res.json({
              code: 200,
              list: [
                { id: 1, text: "one", price: 1000000 },
                { id: 2, text: "two", price: 1000000 }
              ]
            });
          });
      },
    }
  }
}

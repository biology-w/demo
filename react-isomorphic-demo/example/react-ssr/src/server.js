const express = require('express')
const fs = require('fs')
const path = require('path')
const ReactDomServer = require('react-dom/server')
const { matchRoutes } = require('react-router-config')
// 异步组件
const { getLoadableState } = require('loadable-components/server')

const app = express()

const isProd = process.env.NODE_ENV === 'production'

// let serverEntry
let template
let readyPromise
let createApp
let createStore
let routes

if (isProd) {
  let serverEntry = require('../dist/entry-server')
  template = fs.readFileSync('./dist/index.html', 'utf-8')

  createStore = serverEntry.createStore
  createApp = serverEntry.createApp
  routes = serverEntry.routes
  app.use('/dist', express.static(path.join(__dirname, '../dist')))
} else {
  readyPromise = require('./setup-dev-server')(app, (entry, htmlTemplate) => {
    createStore = entry.createStore
    createApp = entry.createApp
    routes = entry.routes
    template = htmlTemplate
  })
}

app.use('/public', express.static(path.join(__dirname, '../public')))

const render = (req, res) => {
  console.log('----enter server-----')
  console.log('visit url: ' + req.url)

  let promises
  let context = {}
  let preloadedState = {}
  const store = createStore({})
  let component = createApp(context, req.url, store)
  getLoadableState(component).then(loadableState => {
    const matchs = matchRoutes(routes, req.path)
    promises = matchs.map(({ route, match }) => {
      // route.component获取的是loadable-components返回的异步组件
      // route.component.Component才是真正的路由组件
      const asyncData = route.component.Component.asyncData
      return asyncData ? asyncData(store, Object.assign(match.params, req.query)) : Promise.resolve(null)
    })

    // resolve所有asyncData
    Promise.all(promises).then(() => {
      // 服务端预先请求数据并存入Store中 调用getState()获取到state
      // 获取预加载的state，供客户端初始化
      preloadedState = store.getState()
      console.log('preloadedState-----')
      console.log(preloadedState)
      handleRender()
    }).catch(error => {
      console.log(error)
      res.status(500).send('Internal server error')
    })

    const handleRender = () => {
      console.log('handelrender--------')
      const html = ReactDomServer.renderToString(component)

      if (context.url) {
        res.redirect(context.url)
        return
      }

      if (!context.status) {
        // 在服务端渲染时，调用ReactDOMServer.renderToString()后需要调用Helmet.renderStatic()才能获取head相关信息
        const head = component.type.head.renderStatic()
        const htmlStr = template
          .replace(/<title>.*<\/title>/, `${head.title.toString()}`)
          .replace('<!--react-ssr-head-->', `${head.meta.toString()}\n${head.link.toString()}
          <script>window.__INITIAL_STATE__=${JSON.stringify(preloadedState)}</script>
          `)
          .replace('<!--react-ssr-body-->', `<div id='app'>${html}</div>\n${loadableState.getScriptTag()}`)
        // 将渲染后的html字符串发送给客户端
        res.send(htmlStr)
      } else {
        res.status(context.status).send('error code' + context.status)
      }
    }
  })
}

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

app.listen(4000, () => {
  console.log('app is running: localhost:4000')
})

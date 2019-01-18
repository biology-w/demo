const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const config = require('config-lite')(__dirname);
const routes = require('./routes');
const pkg = require('./package');

const winston = require('winston');
const expressWinston = require('express-winston');

const app = express();

// 模版文件的目录
app.set('views', path.join(__dirname, 'views'));
// 模版引擎 ejs
app.set('view engine', 'ejs');
// app.setMaxListeners(100);
// 设置静态文件路径
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: config.session.key,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: config.session.maxAge
  },
  store: new MongoStore({
    url: config.mongodb
  })
}));

app.use(flash());
// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'),
  keepExtensions: true
}));

// 设置模版全局变量
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
};

//添加模版必须的变量
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

// routes(app);
app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}));
// 路由
routes(app)
// 错误请求的日志
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}));

app.use((err, req, res, next) => {
  console.error(err);
  req.flash('error', err.message);
  res.redirect('/posts');
});

if (module.parent) {
  module.export = app;
} else {
  app.listen(config.port, () => {
    console.log(`${pkg.name} listening on port ${config.port}`);
  });
}

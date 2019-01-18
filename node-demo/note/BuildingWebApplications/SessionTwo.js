// Session 的数据只保留在服务器端，客户端无法修改；
// 将客户和服务器中数据一一对应起来 常见两种方式；

// 1。基于Cookie 来实现用户和数据的映射；
// 将口令放在Cookie 中；

// 如何生成口令  约定一个键值作为Session的口令；

const sessions = {};
const key = 'session_id';
const EXPIRES = 20*60*1000;

const generate = function () {
  const session = {};
  session.id = (new Date()).getTime() + Math.random();
  session.cookie = {
    expire: (new Date()).getTime() + EXPIRES
  }
  sessions.id = session;
  return session;
}




function temp(req, res) {
  const id = req.cookies[key];
  if(!id) {
    req.session = generate()
  } else {
    const session = sessions[id];
    if(session) {
      if(session.cookie.expire > (new Date()).getTime()){
        // 更新超时时间
        session.cookie.expire = (new Date()).getTime + EXPIRES;
        req.session = session;
      }
    } else {
      // 若是session过期或者口令不对，重新生成session;
      req.session = generate();
    }
  }


  const writeHead = res.writeHead
  res.writeHead = function () {

    //响应客户端并更新新值
    let cookies = res.getHeader('Set-Cookie');
    const session = serialize('Set-Cookie', req.session.id);
    cookies = Array.isArray(cookies) ? cookies.concat(sesssion) : [cookies, session];
    res.setHeader('Set-cookie', cookies);
    return writeHead.apply(this, arguments);
  }


  if(!req.session.isVisit) {
    res.session.isVisit = true;
    res.writerHead(200);
    res.end('server end 第一次欢迎你');
  } else {
    res.writeHead(200);
    res.end('server end 再一次欢迎你')
  }
}


const serialize = function(name, value, options) {
  const tempArray = [name + '=' + encode(value)];
  options = options || {};

  if(options.maxAge) tempArray.push('Max-Age=' + options.maxAge);
  if(options.domain) tempArray.push('Domain=' + options.domain);
  if(options.path) tempArray.push('Path=' + options.path);
  if(options.expires) tempArray.push('Expires=' + options.expires.toUTCString);
  if(options.httpOnly) tempArray.push('HttpOnly');
  if(options.secure) tempArray.push('Secure');
  return tempArray.join(';');
}








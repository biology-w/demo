// 拦截axios所有的http请求。将token预先放入请求头；
import axios from 'axios'
import store from './store'
import router from './router'

axios.interceptors.request.use(config => {
  if(store.state.token) {
    // 将令牌放入请求头
    console.log('config')
    console.log(config)
    config.headers.token = store.state.token
  }
  return config
})


// 提前预处理响应;
axios.interceptors.response.use(res => {
  if (res.status === 200) {
    if(res.data.code === -1) {
      clearHandler()
    }
  }
  return res;
}, error => {
  if(error.response.status === 401) { // 未授权
    console.log('401');
    console.log(error);
    clearHandler()
  }
})


function clearHandler() {
  // 清除本地数据
  localStorage.removeItem('token');
  store.commit('setToken', '')

  console.log(store.state)
  // 跳转页面
  router.push({
    path: '/login',
    query: { redirect: router.currentRoute.path }
  })
}

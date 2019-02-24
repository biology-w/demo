import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link, Route, Switch, Redirect } from "react-router-dom";
import { login } from '../../store/UserReducer'

const Home = (props) => {
  console.log("接收参数：", props.location.state);
  console.log(props.match, props.history, props.location)
  return (
    <div>
      <h6>Home</h6>
      <ul>
        <li><Link to='/detail/one'>one</Link></li>
        <li><Link to='/detail/two'>two</Link></li>
        <li><Link to='/detail/three'>three</Link></li>
      </ul>
    </div>
  )
}

const About = () => (
  <div>
    <h2>用户中心</h2>
    <div>
      <Link to='/about/me'>个人信息</Link>|
      <Link to='/about/order'>订单</Link>|
    </div>
    <Switch>
      <Route path='/about/me' component={() => <div>about-me</div>}></Route>
      <Route path='/about/order' component={() => <div>about-other</div>}></Route>
      {/*重定向*/}
      <Redirect to='/about/me'></Redirect>
    </Switch>
  </div>
)

// match - 参数获取等路由信息
// history - 导航
// location - url定位
// console.log(match, history, location);

const Detail = (props) => (
  <div>
    {props.match.params.course}
    <button onClick={props.history.goBack}>go back</button>
    <button onClick={() => props.history.push({ pathname: '/', state: props.location })}>go Home</button>
  </div>
)


const NoMatch = () => {
  return (<div>404页面</div>)
}


// 路由守卫: 定义可以验证的高阶组件
@connect(state => ({ isLogin: state.user.isLogin }))
class PrivateRoute extends Component{
  render() {
    const { component: Component, isLogin, ...other } = this.props
    return (
      <Route {...other} render={
        props => isLogin ? <Component {...props} /> :
          <Redirect to={{ pathname: '/login', state: { from: props.history.location.pathname }}} />
      } />
    )
  }
}


//login
@connect(
  state => ({ isLogin: state.user.isLogin }),
  { login }
)
class AuthLogin extends Component{
  render() {
    const { isLogin, location } = this.props
    const from = location.state ? location.state.from : '/' || '/'
    if (isLogin) {
      return <Redirect to={{ pathname: from }} />
    }
    return (
      <div>
        <p>请登陆</p>
        <button onClick={this.props.login}>登陆</button>
      </div>
    )
  }
}


class RouteSwitch extends Component {
  render() {
    return (
      <div>
        <h1>Route Switch sample</h1>
        <Link to='/'>home</Link> |
        <Link to='/about'>about</Link> |
        <Link to='/foot'>foot</Link>
        {/*路由的配置*/}
        {/*包涵式匹配 使用Switch只匹配一个*/}
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <PrivateRoute path='/about' component={About}></PrivateRoute>
          <Route path='/detail/:course' component={Detail}></Route>
          <Route path='/login' component={AuthLogin}></Route>
          <Route component={NoMatch}></Route>
        </Switch>
      </div>
    );
  }
}

export default RouteSwitch;

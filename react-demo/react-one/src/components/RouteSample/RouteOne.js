import React, {Component} from 'react';
import { Link, Route } from "react-router-dom";

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
  <div>About</div>
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


// const NoMatch = () => {
//   return (<div>404页面</div>)
// }


class RouteOne extends Component {
  render() {
    return (
      <div>
        <h1>Route sample</h1>
        <Link to='/'>home</Link> |
        <Link to='/about'>about</Link> |
        <Link to='/foot'>foot</Link>
        {/*路由的配置*/}
        {/*包涵式匹配 所有要加exact 属性*/}
        <Route exact path='/' component={Home}></Route>
        <Route path='/about' component={About}></Route>
        <Route path='/detail/:course' component={Detail}></Route>
        {/*<Route component={NoMatch}></Route>*/}
      </div>
    );
  }
}

export default RouteOne;

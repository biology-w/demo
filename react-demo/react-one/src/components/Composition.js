import React, { Component } from 'react'
// 组件复合而非组件继承 实例：
// children到底是什么？ -->> 就是任意合法的js表达式（能衍生出许多内容。即可以是：jsx,js代码, 函数等；）
// children可以修改吗？ -->> 可以修改（但是有条件的修改）

// 实例1
function Dialog (props) {
  return (
    <div>
    {
      props.children
    }
    </div>
  )
}

function WelcomDialog(props) {
  return (
    <Dialog {...props}>
      <h1>你好</h1>
      <p>welcom!</p>
    </Dialog>
  )
}

//实例2
// children扩从：简单例子
//模拟接口
const api = {
  getUser: () => ({ name: 'wjw', age: 18 })
}

// 可以发送请求的组件
// React.craeteContext().Consumer 内部使用的就是此原理；
const Fetcher = (props) => {
  const user = api[props.name]()
  // 使用cb方式拿到Fetcher内的结果；
  //利用这种方式，可以使嵌套的内容(children)能访问到父组件中的数据(user),很有价值;
  return props.children(user)
}


// 实例3
// 修改children
const FilterP = props => {
  return (
    <div>
      {/* React.children提供若干操作嵌套内容的帮助方法 */}
     {
       React.Children.map(props.children, child => {
        console.log(child) // vdom
        if (child.type !== 'p') { // 过滤掉非p标签
          return;
        }
        return child;
       })
     }
    </div>
  )
}

// 修改children 属性
const RadioGroup = props => {
  return (
    React.Children.map(props.children, child => {
      // 对children 属性进行修改等；
      return React.cloneElement(child, { name: props.name })
    })
  )
}

const Radio = ({children, ...other}) => {
  return (
    <div>
      <label>
        <input {...other} type="radio"/>{children}
      </label>
    </div>
  )
}


export default class Composition extends Component {
  render() {
    return (
      <div>
        <h1>Composition</h1>
        <WelcomDialog />
        {/* children内容可以是任意表达式 */}
        <Fetcher name='getUser'>
          {
            (user) => (<p>{user.name}-{user.age}</p>)
          }
        </Fetcher>
        {/* 操作children */}
        <pre>
          <code>
          <h3>React</h3>
          <p>react很不错</p>
          <h3>Vue</h3>
          <p>vue也不错</p>
          </code>
        </pre>
        <FilterP>
          <h3>React</h3>
          <p>react很不错</p>
          <h3>Vue</h3>
          <p>vue也不错</p>
        </FilterP>
        <RadioGroup name='mvvm'>
          <Radio value='react'>React</Radio>
          <Radio value='Vue'>Vue</Radio>
          <Radio value='Angluar'>Angluar</Radio>
        </RadioGroup>
      </div>
    )
  }
}

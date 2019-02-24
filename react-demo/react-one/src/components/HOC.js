import React, { Component } from 'react'

// 高阶组件
// 甚至可以重写组件声明周期
const withName = Com => {
    console.log('name-2')
    return class TempT extends Component {
        componentDidMount() {
            console.log('comdid-----')
        }

        render() {
            console.log('4')
            return (
                <Com {...this.props} name='高阶组件' />
            )
        }
    }
}

// 使其拥有日记的能力；
const withLog = Com => {
    console.log(Com.name + '----渲染了')
    return props => <Com {...props} />
}

@withLog
@withName 
@withLog
class TempCom extends Component {
    componentDidMount() {
        console.log('6')
    }
  render() {
    console.log(this.props)
    return (
        <div>sssss</div>
    )
  }
}

export default TempCom

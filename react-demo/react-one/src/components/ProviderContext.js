import React, { Component } from 'react'
import { Button } from 'antd'

const { Provider, Consumer } = React.createContext()

// mock 传递的数据
const store = {
    name: 'test store',
    logName(){
        console.log('btn---' + this.name)
    }
}

// 添加 provider
export const withProvider = Com => props => (
    <Provider value={store}>
        <Com {...props} />
    </Provider>   
    
)

// add Consumer
export const withConsumer = Com => props => (
    <Consumer>
        {/* 必须内嵌一个函数 */}
        {
            value => (
                <Com store={value} {...props} />
            )
        }
        </Consumer>
)

@withProvider
@withConsumer
class ProviderContext extends Component {
  render() {
      console.log(this.props)
    return (
      <div>
        <span>{this.props.store.name}</span>
        <Button onClick={() => this.props.store.logName()}>consumer</Button>
      </div>
    )
  }
}

export default ProviderContext

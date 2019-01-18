import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { setClientLoad, fetchTopList } from '../../redux/actions'

class One extends React.Component {
  static asyncData (store) {
    console.log('asyncData----------------------------')
    return store.dispatch(fetchTopList())
  }

  componentDidMount () {
    // 判断是否需要加载数据
    if (this.props.clientShouldLoad === true) {
      this.props.dispatch(fetchTopList())
    } else {
      // 客户端执行后，将客户端是否加载数据设置为true
      this.props.dispatch(setClientLoad(true))
    }
  }

  render () {
    const { topList } = this.props
    console.log('index---------this.props')
    console.log(this.props)
    return (
      <div>
        <Helmet>
          <title>one</title>
        </Helmet>
        <div>One</div>
        <ul>
          {
            topList.map(item => {
              return <li className='list-item' key={item.id}>{item.topTitle}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(One)

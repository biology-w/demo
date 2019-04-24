import React, {Component} from 'react';

class TestItemCom extends Component{
  constructor(props) {
    super(props)
    console.log('one', this.props.item)
  }

  componentWillMount() {
    console.log('will-mount', this.props.item)
  }

  componentDidMount() {
    console.log('did-mount', this.props.item)
  }

  render(){
    return <div>{this.props.item}</div>
  }
}

class TempApp extends Component{
  constructor(props) {
    super(props)
    this.name = 'tempApp'
    this.state = {
      data: ['one', 'two', 'three']
    }
  }

  componentDidMount() {
    setTimeout(() => {
      console.log('did-mount',this)
    }, 3000)
  }

  handleClick () {
    console.log(this)
    // this.state.data.unshift('before-one')
    // this.setState({data: this.state.data})
  }



  render() {
    console.log(this.state)
    const arr = this.state.data.map((item, index) => {
      return <TestItemCom item={item} key={index} />
    })

    console.log(arr)
    this.handleClick()
    window.handleClick = this.handleClick
    window.handleClick()
    return (
      <div>
        <button onClick={this.handleClick}>click</button>
        {arr}
      </div>
    )
  }
}


class Index extends Component {
  render() {
    const tempOne = new TempApp()
    console.log(tempOne)
    console.log(tempOne.handleClick())
    return (
      <div>
        <TempApp />
      </div>
    );
  }
}

export default Index;

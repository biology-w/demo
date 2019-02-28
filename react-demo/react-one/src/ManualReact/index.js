import React, {Component} from 'react';
import ReactDOM from 'react-dom'

class ComTwo extends Component{
  render() {
    return(
      <div>ConTwo</div>
    )
  }
}


const OneFn = (
  <div id='demo'>
    <span>one</span>
    <ComTwo name='com-two' />
  </div>
)

console.log('----')
console.log(OneFn)

ReactDOM.render(OneFn, document.querySelector('#root'))

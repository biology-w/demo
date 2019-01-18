import Icon from './assets/mao.jpeg'
import print from './print'
import { cube } from './math.js'

import stylesTest from './style.css'

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}

function component() {
  // 动态导入,代码拆分
  //当涉及到动态代码拆分时，webpack 提供了两个类似的技术。
  // 对于动态导入，第一种，也是优先选择的方式是，使用符合 ECMAScript 提案 的 import() 语法。
  // 第二种，则是使用 webpack 特定的 require.ensure
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
    var element = document.createElement('pre');
    var btn = document.createElement('button');
    var span = document.createElement('span');
    span.innerHTML = _.join(['test', 'one'], '-=');
    // span.classList.add(stylesTest['red'])
    span.classList.add(stylesTest['red'])

    element.innerHTML = [
      'Hello webpack!',
      '5 cubed is equal to ' + cube(5)
    ].join('\n\n')

    element.appendChild(span);

    element.classList.add('red');

    var myIcon = new Image()
    myIcon.src = Icon
    element.appendChild(myIcon)

    btn.innerHTML = 'click';
    btn.onclick = print
    element.appendChild(btn);

    return element;
  })
}


component().then(element => {
  document.body.appendChild(element)
});

if (module.hot) {
  module.hot.accept('./print.js', () => {
    component().then(el => {
      console.log('Accepting the updated printMe module!');
      document.body.removeChild(element)
      // 重新渲染页面后，component 更新 click 事件处理
      document.body.appendChild(el)
    })
  })
}





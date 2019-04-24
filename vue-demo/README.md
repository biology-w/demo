# vue-demo
study vue demo

1.
npm install -g @vue/cli
 OR
yarn global add @vue/cli

2.
 .npm install -g @vue/cli-service-global；
 . 使用 vue serve 和 vue build 命令对单个 *.vue 文件进行快速原型开发;
 . vue serve 的缺点就是它需要安装全局依赖，这使得它在不同机器上的一致性不能得到保证。因此这只适用于快速原型开发


-.vue 纯浏览器开发
-.快速原型开发：单个.vue文件

#Vue工作机制；
  初始化：
    在 new Vue()之后，vue初始化生命周期，事件，props, methods, data, computed与watch等；最重要的是通过Object.defineProperty设置
    setter 和 getter，用来实现 响应式以及依赖收集；
  初始化之后调用$mount会挂载组件；  
  编译
    编译模块分为3个阶段：
    1.parse：  使用正则解析template中的指令，变量等等形成语法书AST;
    2.optimize: 标记一些静态节点，作为后面的性能优化，在diff的时候直接略过；
    3.generate: 把生成的AST转化为渲染函数render function；
  
  响应式：Vue核心内容
    初始化的时候通过defineProperty进行绑定，设置通知的机制；
    当编译生成的渲染函数被实际渲染的时候，会触发getter进行依赖收集，在数据变化的时候触发setter进行更新；
  虚拟Dom
    react首创，vue2开始支持，就是用js对象来描述dom结构，数据修改的时候，先修改虚拟dom中的数据，然后数据做diff，最后再汇集所有的diff，
    力求做最少的dom操作；js里对比很快，而真实dom操作很慢；
    vdom:
    
    {
     tag: 'div',
     props: {
      name: 'test',
      style: { color: red },
      onClick: () => {}
     },
     children: [
       {
         tag: 'a',
         text: 'click btn'
        }
     ]
    }
    <div name='test' style='color: red'} @click=''><a>click btn</a></div>
    
  更新视图  
    
    数据修改触发setter，然后监听器会通知进行修改，通过对比两个Dom树，得到修改的地方就是patch，然后修改这些差异；
  
    new Vue -init-> $mount挂载 --> compile --> render -->Dom树
                                                   |
                                                   |--> getter --收集依赖 --> 监听器 --> patch --> Dom更新
                                                                            |
                                                                            |
                                                   setter --通知------------->
                                                   
                                                   
     
     
     
     
  defineProperty
    依赖收集与追踪
                                                     
  检查点
  编译compile
  compile.js
  入口文件
  依赖收集 Dep
  监听器
  vuex
  vue-router
  vue3.0展望
 进阶思考 

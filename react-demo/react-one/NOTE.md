1.想要利用PureComponent特性，原则：
   . 确保数据类型是值类型；
   . 如果是引用类型，确保地址不变，同时不应该有深层次数据变化。

2.组件复合而非组件继承； 
   . props.children 

3. 保证组件的单一性；
   .尽可能简单，复用性高。
   .可使用HOC组件对组件扩展。

4.组件通信--上下文 跨层级传值
   . vuejs的privide,inject模式的来源--context
   .Provider--提供者
   .Consumer--消耗者
   .老版本的context:
      .getChildContext用来返回数据
      .定义childContextTypes声明
   .新版本上下文
      .{ Provider, Consumer } = React.createContext()   

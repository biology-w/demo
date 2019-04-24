// 初始化的Vue；

class MVue {
  constructor(options) {
    // vue数据
    this.$data = options.data

    // 参数对象
    this.$options = options

    // 劫持监听所有data属性,通知变化
    this.observer(this.$data)

    // created函数绑定this实例
    if(options.created) {
      options.created.call(this)
    }

    // 对模版元素进行编译，解析；扫描模版中所有的变量，指令，依赖
    // 解析指令，订阅数据变化，绑定更新函数，初始化视图；
    this.$compile = new MCompile(options.el, this)
  }

  observer(data) {
    // 简单判断是否是对象
    if(!data || (typeof data !== 'object')) {
      return
    }

    // 劫持对象属性
    Object.keys(data).forEach(key => {
      // 为每一个key定义响应式
      this.defineReactive(data, key, data[key])

      // 为vue的data做属性代理；使得vue实例可以直接访问data内的属性;
      this.proxyData(key)
    })
  }

  defineReactive(obj, key, val) {
    // 递归查找嵌套属性
    this.observer(val)
    // 创建依赖管理器
    const dep = new Depend()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 添加Watcher的实例
        Depend.target && dep.addDep(Depend.target)
        return val
      },
      set(newValue) {
        if(newValue === val) {
          return
        }
        val = newValue
        dep.notify()
      }
    })
  }

  proxyData(key) {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get() {
        return this.$data[key]
      },
      set(val) {
        this.$data[key] =val
      }
    })
  }

}

// depend：依赖管理器，负责将视图中所有的依赖收集管理，包括依赖添加和通知；
class Depend{
  constructor() {
    // 存放Watcher的实例
    this.deps = []
  }

  addDep(dep) {
    this.deps.push(dep)
  }

  // 通知所有的watcher执行更新
  notify() {
    this.deps.forEach(item => {
      item.update()
    })
  }
}

// Watcher: 具体的更新执行者
class Watcher{
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb

    // 当new Watcher的时候将当前实例附加到Depend.target上
    Depend.target = this;
    // 调用get函数
    this.vm[this.key]
    Depend.target = null
  }

  // 更新
  update() {
    this.cb.call(this.vm, this.vm[this.key])
  }
}












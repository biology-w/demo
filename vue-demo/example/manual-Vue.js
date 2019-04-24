// vue2.0原理

// 依赖收集: 收集Watcher对象; 读取数据的时候触发get开始收集Watcher对象;写数据的时候触发set，通知Dep调用notify触发所有watcher的update
// 方法更新对应视图
class MDep {
  constructor() {
    this.deps = []
  }

  // 在deps中添加一个监听器对象
  addDep(dep) {
    this.deps.push(dep)
  }

  nofity(){
    this.deps.forEach(dep => {
      dep.update()
    })
  }
}


// 监听器
class MWatcher {
  constructor() {
    // 在get中使用
    MDep.target = this
  }

  update () {
    console.log('update---')
  }

}



// compile 编译器：扫描模版中所有的依赖，变量，指令
// 创建更新函数和watcher
class Compile {
  // el是
  constructor(el, vm) {

  }

}

// manual-vue
class MVue {
  constructor(options) {
    this._data = options.data;
    this.observer(this._data)

    // 新建一个watcher对象，这个时候Dep.target会指向这个对象
    new MWatcher()
    console.log('模拟render,触发test的getter', this._data.test)
  }

  observer(value) {
    if (!value || typeof value !== 'object') {
      return
    }

    Object.keys(value).forEach(item => {
      this.defineReactive(value, item, value[item])
    })
  }

  defineReactive(obj, key, val) {
    const _this = this
    // 便利对象内的对象
    this.observer(val)
    const dep = new MDep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 将当前的watcher对象存入Dep中；
        dep.addDep(MDep.target)
        console.log(dep)
        return val
      },
      set(newValue) {
        dep.nofity(newValue)
      }
    })
  }

}

// const tempObj = new MVue({
//   data: {
//     test: 'one test'
//   }
// })
//
// setTimeout(function () {
//   tempObj._data.test = 'one 2000'
// }, 2000)



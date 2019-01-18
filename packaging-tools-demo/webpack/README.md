webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码：

webpack's Watch Mode
webpack-dev-server
webpack-dev-middleware



有三种常用的代码分离方法：

入口起点：使用 entry 配置手动地分离代码。
防止重复：使用 CommonsChunkPlugin 去重和分离 chunk。
动态导入：通过模块的内联函数调用来分离代码。


package.json:
"sideEffects": false,
 Tells webpack to recognise the sideEffects flag in package.json or
 rules to skip over modules which are flagged to contain no side effects when exports are not used

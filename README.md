# node-demo

> vue全家桶+koa2+mysql全栈练手小项目，简单发布修改文章功能

## 目录结构
├─build 构建脚本目录
├─config 项目配置
├─server koa2服务器
├─src
│  ├─assets 资源目录
│  │  ├─images 图片
│  │  └─styles 公共样式
│  ├─Axios 封装axios
│  ├─components 公共组件
│  │  ├─Header 
│  │  ├─layout
│  │  └─uploadImg
│  ├─pages 
│  │  ├─detail 文章详情页
│  │  ├─home 主页
│  │  │  ├─article
│  │  │  │  └─components
│  │  │  └─home
│  │  │      └─components
│  │  └─login 登录页
│  ├─router 前端路由
│  ├─service 请求方法
│  ├─store 应用级数据(state)
│  └─utils 数据处理文件
└─static
## tips
可在server目录下的api.js文件中更改数据库连接

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

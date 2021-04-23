# node-demo

> vue全家桶+sequelize-typescript全栈练手小项目，简单发布修改文章功能

## 目录结构
### 后端部分
```
├│  app.ts       服务器连接
├─configs        配置文件
├─controllers    sequelize-ts控制器
├─database
│  ├─migrations  数据库脚本迁移文件
│  └─seeders     数据库脚本种子文件(未设计)
├─middlewares    中间件(token鉴权)  
├─models   数据库模型
├─types    TS接口
└─validators  TS校验器
```
### 前端部分
```
├─build 构建脚本目录
├─config 项目配置
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
```
## 项目启动
npm install 安装分别依赖后
在frontend和backend下npm run dev启动前后端项目
### backend下的数据库操作
npm run db:init 创建数据库并执行种子脚本
npm run db:redo 重置所有数据库

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

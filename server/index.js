// 模块引入
const koa = require("koa");
const router = require("./api.js")
const koaBody = require("koa-body");
const path = require('path');
const serve = require('koa-static');
// 实例化app
let app = new koa();
// 模块注册
// app.use(serve(path.resolve('dist')));
app.use(koaBody());
app.use(router.routes());
// 监听端口
app.listen(3005);
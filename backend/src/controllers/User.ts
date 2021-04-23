import { Ctx, Body, Controller, Post } from "koa-ts-controllers";
import {Context} from 'koa'
import {RegisterBody, LoginBody} from "../validators/User"
import {User as UserModel} from "../models/User";
import {Personal as PersonalModel} from "../models/Personal"
import {UserArticles as UserArticlesModel} from '../models/UserArticles'
import Boom from '@hapi/boom'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import configs from '../configs'
@Controller('/user')
export class UserController {
    /**
     * 用户注册
     */
    @Post('/register')
    async register(
        @Ctx() ctx: Context,
        @Body() body: RegisterBody
    ){
        let {username, password} = body;
        // 验证数据库中是否已经存在要注册的用户
        let user = await UserModel.findOne({
            where: {
                username
            }
        })
        console.log(user)
        if (user) {
            throw Boom.conflict('注册失败', '用户名已经被注册')
        }
        let newUser = new UserModel();
        newUser.username = username;
        newUser.password = password;
        await newUser.save();
        ctx.status = 201;
        let personal = new PersonalModel()
        personal.username = username
        await personal.save()
        let userArticle = new UserArticlesModel()
        userArticle.username = username
        userArticle.articles = JSON.stringify([])
        await userArticle.save()
        return {
            error_info: "0",
            message: '注册成功！'
        }
    }

    /**
     * 登录
     */
    @Post('/login')
    async login(
        @Ctx() ctx:Context,
        @Body() body: LoginBody
    ) {
        let {username, password} = body;
        let user = await UserModel.findOne({
            where: {username}
        })
        if (!user){
            throw Boom.notFound('登录失败','登录失败,用户不存在')
        }

        let md5 = crypto.createHash('md5');
        password = md5.update(password).digest('hex')
        if (password !== user.password) {
            throw Boom.forbidden('登录失败','登录失败,密码错误')
        }
        let userInfo = {
            id: user.id,
            username: user.username
        }

        let token = jwt.sign(userInfo, configs.jwt.privateKey)
        ctx.set('authorization', token);
        return {
            error_info: '0',
            message: '登录成功！'
        }
    }

}
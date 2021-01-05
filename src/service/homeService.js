import Axios from "@/Axios/Axios";

class _homeService {
    constructor() {}
    // 用户登录
    async login(params) {
        const url = '/api/login'
        const result = await Axios.requestApi({
            url,
            params,
            method: "get"
        })
        return result
    }
    // 用户注册
    async regist(data) {
        const url = '/api/regist';
        const result = await Axios.requestApi({
            url,
            data,
            method: "post"
        })
        return result
    }
    // 获取用户信息
    async getUserInfo(params) {
        const url = "/api/userinfo";
        const result = await Axios.requestApi({
            url,
            params,
            method: "get"
        })
        return result
    }
    // 添加用户基本信息
    async addUserInfo(data) {
        const url = "/api/addData";
        const result = await Axios.requestApi({
            url,
            data,
            method: "post"
        })
        return result 
    }

    // 上传头像
    async addImg(data) {
        const url = "/api/addImg";
        const result = await Axios.requestApi({
            url,
            data,
            method: "post"
        })
        return result 
    }

    // 获取文章
    async getArticles(params) {
        const url = "/api/articles";
        const result = await Axios.requestApi({
            url,
            params,
            method: "get"
        })
        return result
    }

    // 发布文章
    async addArticle(data) {
        const url = '/api/addArticle'
        const result = await Axios.requestApi({
            url,
            data,
        })
        return result
    }
}

export default new _homeService();
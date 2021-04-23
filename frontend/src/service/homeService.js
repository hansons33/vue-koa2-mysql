import Axios from "@/Axios/Axios";
class _homeService {
    constructor() {}
    // 用户登录
    async login(data) {
        const url = '/test/user/login'
        const result = await Axios.axios({
            url,
            data,
            method: "post"
        })
        return result
    }
    // 用户注册
    async regist(data) {
        const url = '/test/user/register';
        const result = await Axios.requestApi({
            url,
            data,
            method: "post"
        })
        return result
    }
    // 获取用户信息
    async getUserInfo(params) {
        const url = "/test//userInfo/getData";
        const result = await Axios.requestApi({
            url,
            params,
            method: "get"
        })
        return result
    }
    // 添加用户基本信息
    async addUserInfo(data) {
        const url = "/test//userInfo/addData";
        const result = await Axios.requestApi({
            url,
            data,
            method: "post"
        })
        return result 
    }

    // 获取文章
    async getArticles(params) {
        const url = "/test/userInfo/getArticle";
        const result = await Axios.requestApi({
            url,
            params,
            method: "get"
        })
        return result
    }

    // 发布文章
    async addArticle(data) {
        const url = '/test/userInfo/addArticle'
        const result = await Axios.requestApi({
            url,
            data,
        })
        return result
    }

    // 编辑或删除文章
    async deleteArticle(data) {
        const url = "/test/userInfo/deleteArticle"
        const result = await Axios.requestApi({
            url,
            data
        })
        return result
    }
}

export default new _homeService();
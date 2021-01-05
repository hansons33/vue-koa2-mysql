import axios from "axios";
import qs from 'qs';
import {Toast} from 'vant'
// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 在请求头加参数
        // if(token){
        //     config.headers.Authorization = `token fdsafds`;
        // }
        // console.log(config);
        if (config.headers && config.headers['Content-Type'].indexOf("application/x-www-form-urlencoded") > -1) {
            config.data = qs.stringify(config.data)
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if(error.response){
            // switch (error.response.status) {
            //     case 401:
            //         // 返回 401跳转到登录页面
            //         router.replace({
            //             path: 'login',
            //         })
            // }
        }
        return Promise.reject(error.response.data)
    }
)

class Axios{
    axios(config) {
        return new Promise((resolve,reject)=>{
            let _option = {
                method: 'post',
                url: null,
                timeout: 30000,
                params: null,
                data: null,
                headers: null,
                withCredentials: false,
                validateStatus: (status)=>{
                    return status >=200 && status < 300;
                },
                ...config
            }
            axios.request(_option).then(res => {
                resolve(typeof res.data === 'object' ? res.data : JSON.Parse(res.data))
            }, error => {
                console.log('axios_error', JSON.stringify(error) );
                if (error.response) {
                    reject(error.response.data)
                } else {
                    reject(error)
                }
            })
        })
    }
    async requestApi(ajaxParams) {
        let results = {}
        try {
            const data = await this.axios({
                ...ajaxParams,
                params: {
                     ...ajaxParams.params 
                }
            });
            if (data && data.error_info){
                let error_info = data.error_info;
                let resultMsg = data.message;
                if (error_info == '0'){
                    results = data;
                }else if(error_info == '1'){
                    Toast({
                        message: resultMsg || '请稍后重新再试'
                    });
                    results = "ERROR"
                }else{
                    Toast({
                        message: '请稍后重新再试'
                    })
                    results = "OTHER_ERROR"
                }
            }
        } catch (e) {
            console.log("requestApi,", JSON.stringify(e));
            Toast({
                message: '请稍后重新再试'
            });
            results = "CATCH_ERROR"
        }
        return results
    }
    
}
export default new Axios();
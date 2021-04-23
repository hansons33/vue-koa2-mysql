import axios from "axios";
import qs from 'qs';
import {Toast} from 'vant'


// 请求拦截器
axios.interceptors.request.use(
    config => {
        try {
            let token = localStorage.getItem('token')
            if (token){
                config.headers = {}
                config.headers.authorization = token
            }
            if (config.headers && config.headers['Content-Type'].indexOf("application/x-www-form-urlencoded") > -1) {
                config.data = qs.stringify(config.data)
            }
        } catch(err) {

        }
        return config
    }
    
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if(error.response){
            console.log(error.response)
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
                resolve(res)
            }, error => {
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
            const res = await this.axios({
                ...ajaxParams,
                params: {
                     ...ajaxParams.params 
                }
            });
            const data = res && res.data
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
            console.log("requestApi,", e);
            if (e.errorDetails){
                Toast({
                    message:e.errorDetails,
                    position: 'top'
                })
            }
            results = "CATCH_ERROR"
        }
        return results
    }
    
}
export default new Axios();
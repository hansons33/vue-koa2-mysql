<template>
    <section>
        <div class="content">
            <div class="title">请登录或注册您的账号</div>
            <van-cell-group>
                <van-field 
                v-model="username" 
                label="用户" 
                placeholder="请输入用户名" />
                <van-field 
                class="password" 
                v-model="password" 
                type="password" 
                label="密码" 
                placeholder="请输入密码" />
            </van-cell-group>
            <div class="button">
                <van-button class="login" type="info" @click="login">登录</van-button>
                <van-button type="info" @click="regist">注册</van-button>
            </div>
        </div>
    </section>
</template>

<script>
import HomeService from "@/service/homeService"
export default {
    data(){
        return {
            loginDesc: '登录',
            username:'',
            password:''
        }
    },
    computed:{
        loginInfo(){
            return {
                username: this.username,
                password: this.password
            }
        }
    },
    methods:{
        async login(){
            if(this.loginInfo.username.length && this.loginInfo.password.length){
                let res = await HomeService.login(this.loginInfo)           
                if(res.data && res.data.error_info == "0"){
                    this.$toast(res.data.message)
                    this.$store.commit('set_token',res.headers.authorization)
                    this.$store.commit('setUser',this.loginInfo.username)
                    this.$router.push({
                        path: '/home',
                        query: {
                            username: this.loginInfo.username
                        }
                    })
                }else{
                    this.password = ''
                    this.username = ''
                }
            }else{
                this.$toast("用户名或密码为空，请重新输入")
            }
        },
        async regist(){
            if(this.loginInfo.username.length && this.loginInfo.password.length){
                let result = await HomeService.regist(this.loginInfo)
                if (result.error_info == '0'){
                    this.$toast(result.message)
                }
            }else{
                this.$toast("用户名或密码为空，请重新输入")
            }
        }
    },
    mounted(){
        let mima = document.querySelector('.password')
        let loginButton = document.querySelector('.login')
        mima.addEventListener('keyup',function(e){
            if (e.keyCode == '13'){
                loginButton.click()
            }
        })
    },
    activated(){
        Object.assign(this.$data, this.$options.data()); // 初始化数据
        console.log(123)
    }
}
</script>
<style lang="stylus" scoped>
section
    height: 100vh;
    width: 100vw;
    background: url("~@/assets/images/login2.jpg")no-repeat center;
    background-size: 100% 100%
.content
    height: 3rem;
    width: 3rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto
    text-align:center
    .title
        background: white
        color: black
        font-weight: 500
        padding: .1rem
        font-family: "Arial"
    .button
        background: white
        .van-button
            margin: .05rem
</style>
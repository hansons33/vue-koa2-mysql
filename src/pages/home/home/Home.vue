<template>
    <van-cell-group v-if='!firstLoad'>
        <HeaderBar title="个人主页"></HeaderBar>
        <div class="userInfo">
            <div v-if="!uploadControl">
                <img class="photo" :src="imgUrl" alt="">
            </div>
            <div class="personal">
                <p>昵称:{{petName}}</p>
                <span class="introduce">个人简介:{{this.introduction}}</span>
            </div>
            <div class="settings">
                <p @click="logout">退出登录</p>
                <p @click="changeInfo">修改信息</p>
            </div>
        </div>
        <van-cell>
            <Tab v-if="!firstLoad"></Tab>
        </van-cell>
    </van-cell-group>
</template>

<script>
import FirstLoad from "@/pages/home/home/components/FirstLoad"
import Tab from "@/pages/home/home/components/Tab"
import HomeService from "@/service/homeService"
export default {
    inject: ['reload'],
    name: 'Home',
    components:{
        FirstLoad,
        Tab,
    },
    data(){
        return {
            firstLoad: false,
            petName: '',
            introduction: '',
            imgUrl: "", //头像
            uploadControl: true,
            fileList: [],
            username:'',
            submitBtn: '上传头像'
        }
    },
    computed:{
        submitBtnChange(){
            return this.submitBtn
        }
    },
    methods:{
        async getUserInfo(){ //获取用户信息
            let res = await HomeService.getUserInfo({username:this.username})
            if(res.error_info == '0'){
                this.petName = res.datas.petName
                this.introduction = res.datas.introduction
                if(res.datas.imgUrl){
                    this.imgUrl = res.datas.imgUrl
                    this.uploadControl = false
                }
                this.firstLoad = false
            }else{
                this.firstLoad = true
                this.$router.push({
                    path:'/home/changeInfo',
                    query:{
                        flag:'firstLogin'
                    }
                })
            }
        },
        async afterRead(file){ //读取图片后的回调
            let imgUrl = file.content
            file.status = "uploading";
            file.message = '上传中';
            let res = await HomeService.addImg({
                username: this.username,
                imgUrl
            })
            if(res && res.error_info == "0"){
                this.submitBtn = "确认上传"
                file.status = "done"
            }else{
                this.submitBtn = "重新上传"
                file.status = "failed";
                file.message = "上传失败"
            }
        },
        submit(type){ //上传头像
            if(type == "上传头像"){
                document.querySelector('.van-uploader__input').click()
            }else if(type == "重新上传"){
                console.log(document.querySelector('.van-uploader__preview-delete').click())
                setTimeout(()=>{
                    document.querySelector('.van-uploader__input').click()
                },50)      
            }else{
                this.reload()
            }
        },
        logout(){ //退出登录
            this.$dialog.confirm({
                title: '您确定要退出登录吗？',
            }).then(()=>{
                this.$router.replace('/')
                localStorage.removeItem('token')
                localStorage.removeItem('username')
            }).catch(()=>{
                //
            })
        },
        changeInfo(){
            this.$dialog.confirm({
                title: '点击确认前往修改个人信息'
            }).then(()=>{
                this.$router.push('/home/changeInfo')
            }).catch(()=>{
                //
            })
        },
        onOversize(file) {
            this.$toast('图片不能超过64kb')
        }
    },
    activated(){
        this.username = this.$store.state.username
        this.getUserInfo()
    }
}
</script>

<style lang="stylus" scoped>
.userInfo
    display: flex
    padding: .15rem
    position: relative
    .uploader
        display: inline
    .submit
        font-size: .12rem
    .photo
        width: .8rem
        height: .8rem
        background-size: 100%
    .personal
        margin-left: .12rem
        font-size: .14rem
        max-width: 1.8rem
        p
            font-size: .16rem
            font-weight: 500
            padding: .05rem 0
        .introduce
            opacity: .5
    .settings
        position:absolute
        right: .2rem
        top: .05rem
        min-width: .6rem
        p   
            padding: .02rem
            font-size: .12rem
            color: orange
            &:first-child
                margin-top:.1rem
</style>
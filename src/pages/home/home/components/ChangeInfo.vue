<template>
    <Flex direction='column'>
        <HeaderBar title="设置您的个人信息"></HeaderBar>
        <div class="uploadimg">
            <UploadImg :imgUrl="userInfo.imgUrl"></UploadImg>
        </div>
        <div class="box">
            <van-field 
            v-model="userInfo.petName" 
            label="昵称"
            maxlength="16"
            show-word-limit
            required
            ></van-field>
            <van-field 
            v-model="userInfo.introduction"
            rows="3"
            autosize 
            label="个人简介" 
            type="textarea"
            maxlength="50"
            show-word-limit
            >
            </van-field>
            <van-button size="large" color="#F24957" @click="changeInfo">确认修改</van-button>
        </div>
    </Flex>
</template>

<script>
import HomeService from "@/service/homeService"
import UploadImg from "@/components/uploadImg/uploadImg"
export default {
    name:'ChangeInfo',
    components:{
        UploadImg
    },
    data(){
        return {
            userInfo: {
                petName: '',
                introduction: '',
                imgUrl: ''
            },
        }
    },
    methods:{
        async getUserInfo(){ //获取用户信息
            let res = await HomeService.getUserInfo({username:this.$store.state.username})
            if(res.error_info == '0'){
                console.log(res.datas)
                this.userInfo = res.datas
            }
        },
        async changeInfo(){
            let params = {
                username: this.$store.state.username,
                petName:this.userInfo.petName,
                introduction: this.userInfo.introduction
            }
            console.log(params)
            let res = await HomeService.addUserInfo(params)
            if(res.error_info == "0"){
                this.$toast(res.message)
                this.$router.go(-1)
            }
        }
    },
    activated() {
        if(!this.$route.query.flag){
            this.getUserInfo()
        }
    }
}
</script>

<style lang="stylus" scoped>
.box
    width: 100%
    .van-cell
        margin: .1rem 0
.uploadimg
    width: 100%
    background: white
    display: flex
    justify-content :center
</style>
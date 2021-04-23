<template>
    <section>
        <div class="firstLoad">
            <div class="title">请先设置您基本信息</div>
            <van-cell-group>
                <van-field 
                v-model="petName" 
                label="昵称" 
                maxlength="10"
                show-word-limit
                placeholder="请输入您的昵称" />
                <van-field 
                class="introduce" 
                rows="2"
                type="textarea"
                autosize
                v-model="introduction" 
                label="个人简介" 
                maxlength="50"
                placeholder="请输入您的个人简介" 
                show-word-limit
                />
            </van-cell-group>
            <van-button class="submit" type="info" @click="submit">提交</van-button>
        </div>
    </section>
</template>
<script>
import HomeService from "@/service/homeService"
export default {
    inject: ['reload'],
    name: 'FirstLoad',
    data(){
        return {
            petName: '',
            introduction: ''
        }
    },
    computed:{
        params(){
            return {
                petName: this.petName,
                introduction: this.introduction
            }
        }
    },
    methods:{
        async submit(){
            let res = await HomeService.addUserInfo(this.params)
            if(res.error_info == '0'){
                this.reload()
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
section
    background: white
    height: 100vh
    width: 100%
    z-index: 888
.firstLoad
    position: absolute
    height: 3rem;
    width: 3rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto
    text-align:center
    z-index: 999
    .title
        margin: .1rem
</style>
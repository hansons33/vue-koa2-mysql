<template>
    <div>
        <HeaderBar :title="'发布文章'"></HeaderBar>
        <van-field v-model="title" label="文章标题" placeholder="请填写文章标题"/>
        <van-field v-model="summary" label="文章摘要" placeholder="请填写文章摘要"/>
        <van-field v-model="type" label="文章类型" placeholder="请填写文章类型"/>
        <van-field 
        v-model="content" 
        rows="15"
        autosize 
        label="正文内容" 
        type="textarea"
        maxlength="2000"
        show-word-limit
        placeholder="正文内容"
        /> 
        <van-button size="large" color="#F24957" @click="addArticle">确认发布</van-button>
    </div>
</template>

<script>
import HomeService from "@/service/homeService"
export default {
    name:'Public',
    data(){
        return {
            title:'',
            summary: '',
            content: '',
            type:'',
            username:this.$route.query.username
        }
    },
    computed:{
        public(){
            return this.title.length && this.summary.length && this.type.length && this.content.length
        }
    },
    methods:{
        async addArticle(){
            if(this.public){
                let res = await HomeService.addArticle({
                username:this.username,
                article:{
                    title: this.title,
                    summary: this.summary,
                    content: this.content,
                    timestamp: +(new Date()),
                    type: this.type
                    }
                })
                if (res.error_info == '0'){
                    this.$toast(res.message)
                    this.$router.push({
                        path: '/home',
                        query: {username:this.username}
                    })
                }
            }else{
                this.$toast('请填写完整的文章信息，谢谢！')
            }
        }
    }
}
</script>
<style lang="stylus">

</style>
<template>
    <Flex direction="column" full>
        <HeaderBar :title="'文章详情'"></HeaderBar>
        <FlexItem block class="article">
            <div class="tips">
                <h2 class="title">{{article.title}}</h2>
                <span class="time">发布时间:{{article.timestamp}}</span>
                <span>作者:{{this.$store.state.username}}</span>
            </div>
            <div class="content">{{article.content}}</div>
        </FlexItem>
        <div class="buttons">
            <van-button size="normal" color="#7232dd" @click="edit">重新编辑</van-button>
            <van-button size="normal" color="#F24957" @click="Fdelete">删除文章</van-button>
        </div>
    </Flex>
</template>

<script>
import HomeService from "@/service/homeService"
import dataUtils from "@/utils/dataUtils"
export default {
    name:'Detail',
    data(){
        return {
            article:''
        }
    },
    methods:{
        async getArticle(){
            let res = await HomeService.getArticles({
                username:this.$store.state.username
                })
            if (res.error_info == '0'){
                let title = this.$route.query.title
                let temp = res.datas.article.filter(item=>item.title == title)[0]
                if(temp){   // 若该文章存在
                    this.article = {
                        title: temp.title || '--',
                        summary: temp.summary || '--',
                        type: temp.type || '--',
                        timestamp: dataUtils.getDateTime(temp.timestamp) || '--',
                        content: temp.content || '--'
                    }
                }else{
                    this.$toast('该文章不存在')
                }
            }
        },
        async deleteArticle(){
            let res = await HomeService.deleteArticle({
                username:this.$store.state.username,
                title:this.article.title
            })
            this.$toast(res.message)
            if (res.error_info == "0"){
                this.$router.replace('/home')
            }
        },
        Fdelete() {
            this.$dialog.confirm({
                message:'您确定要删除该文章吗？'
            }).then(()=>{
                this.deleteArticle()
            }).catch(()=>{})
        },
        edit(){
            this.$router.push({
                name: 'public',
                params:{
                    username: this.$store.state.username,
                    title: this.article.title,
                    type: 'edit',
                    article: this.article
                }
            })
        }
    },
    created() {
        this.getArticle()
    },
    activated() {
        this.getArticle()
    }
}
</script>

<style lang="stylus" scoped>
.article
    background: white
    .tips
        text-align:center
        padding: .1rem
        border-bottom: 1px solid #ebebeb;
        span
            margin: .03rem
            color: #555555
    .content
        padding: .1rem
        font-size: .16rem
.buttons
    width: 100%
    background: white
    text-align:center
    .van-button
        margin: .05rem .3rem
</style>
<template>
    <Flex direction="column" full>
        <HeaderBar :title="'文章详情'"></HeaderBar>
        <FlexItem block class="article">
            <div class="tips">
                <h2 class="title">{{article.title}}</h2>
                <span class="time">发布时间:{{article.timestamp}}</span>
                <span>作者:{{this.$route.query.username}}</span>
            </div>
            <div class="content">{{article.content}}</div>
        </FlexItem>
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
                username:this.$route.query.username
                })
            if (res.error_info == '0'){
                let title = this.$route.query.title
                let temp = res.datas.article.filter(item=>item.title == title)[0]
                this.article = {
                    title: temp.title || '--',
                    summary: temp.summary || '--',
                    type: temp.type || '--',
                    timestamp: dataUtils.getDateTime(temp.timestamp) || '--',
                    content: temp.content || '--'
                }
            }
        },
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
        
</style>
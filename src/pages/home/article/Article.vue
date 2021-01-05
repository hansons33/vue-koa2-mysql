<template>
    <Flex>
        <FlexItem class="article">
            <div class="publish">
                <van-button size="small" color="#696969" class="public" type="info" @click.stop="publish(username)">+发布文章</van-button>
            </div>
            <ul class="news_list">
                <li  v-for="(item,index) of result" :key="index" @click="goToDetail(item.title)">
                    <p class="title">{{item.title}}</p>
                    <p class="text">{{item.summary}}</p>
                    <p class="tips">
                        <span class="left">{{item.type}}</span>
                    </p>
                    <p class="tips">
                        <span class="time">{{item.timestamp}}</span>
                    </p>
                </li>
            </ul>
            <van-pagination v-if="result.length" v-model="currentPage" :total-items="total_article" :items-per-page="3" @change="paginationChange"/>
        </FlexItem>
    </Flex>
</template>

<script>
import HomeService from "@/service/homeService"
import dataUtils from "@/utils/dataUtils"
export default {
    name:'Article',
    data(){
        return {
            result: [],
            username: '',
            article:'123123',
            noArticle: false,
            currentPage: 1,
            total_article: 0,
            totalArticle: []
        }
    },
    methods:{
        async getArticle(){
            let res = await HomeService.getArticles({
                username:this.username
                })
            if (res.error_info == '0'){
                const temp = []
                res.datas.article.forEach(item=>{
                    const cur = {
                        title: item.title || '--',
                        summary: item.summary || '--',
                        type: item.type || '--',
                        timestamp: dataUtils.getDateTime(item.timestamp) || '--',
                        content: item.content || '--'
                    }
                    temp.push(cur)
                })
                this.totalArticle = temp
                this.total_article = this.totalArticle.length
                this.result = this.totalArticle.slice((this.currentPage-1)*3,this.currentPage*3)
            }else{
                this.noArticle = true
            } 
        },
        publish(username){
            this.$router.push({
                path: '/home/public',
                query: {username},
            })
        },
        goToDetail(title){
            this.$router.push({
                path:'/home/detail',
                query:{
                    username:this.username,
                    title
                }
            })
        },
        paginationChange(){
            this.result = this.totalArticle.slice((this.currentPage-1)*3,this.currentPage*3)
        }
    },
    created(){
        this.username = sessionStorage.getItem('username')
        this.getArticle()
    },
    activated(){
        this.getArticle()
    }
}
</script>
<style lang="stylus" scoped>
.publish
    padding: .05rem
    .public
        float:right
        z-index: 99
.news_list li
    border-bottom: 1px solid #ebebeb;
    padding: .15rem 0;
    p.title
        color: #333333;
        font-size: .16rem;
        font-weight: bold;
        position: relative;
        span
            position: absolute;
            right: 0;
            top: 0;
            font-size: .12rem;
            color: #999;
            font-weight: normal;
    p.text
        color: #555555;
        margin-top: .1rem;
        line-height: .21rem;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    p.tips
        position: relative
        text-align: right;
        margin-top: .1rem;
        min-height: .18rem
        span
            margin-right: .15rem;
        span.left
            float: left;
            border: 1px solid #F24957;
            border-radius: .15rem;
            font-size: .11rem;
            color: #F24957;
            padding: 0 .06rem;
        .time
            position: absolute
            left: 0rem
            color: #999999
            text-align: left
</style>


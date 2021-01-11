<template>
    <Flex>
        <FlexItem class="article">
            <ul class="news_list">
                <li  v-for="(item,index) of result" :key="index" @click="goToDetail(item.title)">
                    <p class="title">
                        {{item.title}}
                        <span v-if="item.isTop" class="isTop">
                            置顶
                        </span>
                    </p>
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
export default {
    name:'Article',
    props:{
        articles:{
            type: Array,
            default: []
        }
    },
    data(){
        return {
            username: '',
            result: [],
            article:'123123',
            currentPage: 1,
            total_article: 0,
            totalArticle: []
        }
    },
    methods:{
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
        this.result = this.articles.sort((a,b)=>{
            return (b.isTop - a.isTop)
        })
        if(this.result.length) {
            this.totalArticle = this.result
            this.total_article = this.totalArticle.length
            this.result = this.totalArticle.slice((this.currentPage-1)*3,this.currentPage*3)
        }
    },
    activated(){
        this.result = this.articles
        if(this.result.length) {
            this.totalArticle = this.result
            this.total_article = this.totalArticle.length
            this.result = this.totalArticle.slice((this.currentPage-1)*3,this.currentPage*3)
        }
    }
}
</script>
<style lang="stylus" scoped>
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
            right: .1rem;
            top: 0;
            font-size: .14rem;
            color: #F24957;
            &:after
                height: .15rem
                width: .1rem
                content: '';
                position:absolute;
                right: -.1rem
                top: .05rem
                background: url('~@/assets/images/isTop.png')no-repeat center
                background-size: .13rem .13rem
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


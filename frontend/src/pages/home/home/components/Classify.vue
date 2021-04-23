<template>
    <div class="flexBox">
        <van-sidebar v-model="activeKey" @change="onChange">
            <van-sidebar-item 
            v-for="(item,index) of types"
            :key="index"
            :title="item"
            >
            </van-sidebar-item>
        </van-sidebar>
        <div class="articleBox">
            <ul class="article_list">
                <li class="article" v-for="(item,index) of article" :key="index">
                    <h3 class="title">标题:{{item.title}}</h3>
                    <p class="summary">摘要:{{item.summary}}</p>
                    <p class="read" @click="goToDetail(item.title)">阅读全文</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Article from "@/pages/home/article/Article"
export default {
    name: 'Classify',
    components:{
        Article
    },
    props:{
        articles:{
            default: [],
            type: Array
        }
    },
    data(){
        return {
            result: [],
            types: [],
            value1: 0,
            activeKey: 0,
            article: []
        }
    },
    methods:{
        init(){
            this.result = this.articles
            this.result.map(item=>{
                if(!this.types.includes(item.type)){
                    this.types.push(item.type)
                }
            })
            this.article = this.result.filter(item=>{
                return item.type == this.types[this.activeKey]
            })
        },
        onChange(index){
            this.article = this.result.filter(item=>{
                return item.type == this.types[index]
            })
        },
        goToDetail(title){
            this.$router.push({
                path:'/home/detail',
                query:{
                    username:this.$store.state.username,
                    title
                }
            })
        },
    },
    created(){
        this.init()
    },
    activated(){
        this.init()
    }
}
</script>

<style lang="stylus" scoped>
.flexBox
    display: flex
    flex-direction :row
.articleBox
    width: 100%
.article_list
    padding: .2rem
    .article
        min-heigth: .8rem
        margin-bottom: .1rem
        border-bottom: 1px solid #ebebeb;
        position:relative
        .summary
            margin-left: .1rem
        .read
            text-align: right
            text-decoration: underline
</style>
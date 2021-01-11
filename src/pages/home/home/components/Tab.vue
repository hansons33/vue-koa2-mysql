<template>
    <div>
        <van-tabs class=".tab_title tab-title" v-model="active">
            <van-tab  title="我的随笔">
                <div class="publish">
                    <van-button size="small" color="#696969" class="public" type="info" @click.stop="publish(username)">+发布文章</van-button>
                </div>
                <Article v-if="flag" :articles="articles"></Article>
            </van-tab>
            <van-tab title="文章分类">
                <Classify v-if="flag" :articles="articles"></Classify>
            </van-tab>
            <van-tab title="联系我们">
                <contect-us></contect-us>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import Article from "@/pages/home/article/Article"
import ContectUs from './ContectUs.vue'
import HomeService from "@/service/homeService"
import dataUtils from "@/utils/dataUtils"
import Classify from './Classify.vue'
export default {
    name:'Tab',
    components:{
        Article,
        ContectUs,
        Classify
    },
    data(){
        return {
            active: 0,
            username:'',
            articles: []
        }
    },
    computed:{
        flag(){
            return this.articles.length
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
                        content: item.content || '--',
                        isTop: item.isTop
                    }
                    temp.push(cur)
                })
                this.articles = temp
            }
        },
        publish(username){
            this.$router.push({
                path: '/home/public',
                query: {username},
            })
        },
        init(){
            this.articles = []
            this.username = this.$store.state.username
            this.getArticle()
        }
    },
    activated() {
        this.init()
    }
}
</script>

<style lang="stylus" scoped>
.tab_title
    display: flex;
    font-size: .15rem;
    color: #555555;
    text-align: center;
    line-height: .35rem;
.tab-title
    >>>.van-tabs__wrap
        border-bottom: 1px solid #ebebeb;
    >>>.van-tab__text
        font-size: 15px;
.publish
    text-align:right
    padding-top: .05rem
.public
    z-index: 99
</style>
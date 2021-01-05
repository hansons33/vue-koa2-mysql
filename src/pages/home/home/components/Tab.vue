<template>
    <div>
        <van-tabs class=".tab_title tab-title" v-model="active">
            <van-tab title="我的随笔">
                <Article></Article>
            </van-tab>
            <van-tab title="文章分类"></van-tab>
            <van-tab title="联系我们">
                <contect-us></contect-us>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import Article from "@/pages/home/article/Article"
import ContectUs from './ContectUs.vue'
export default {
    name:'Tab',
    components:{
        Article,
        ContectUs
    },
    data(){
        return {
            active: 0
        }
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
</style>
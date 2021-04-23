<template>
    <div>
        <header 
            class="header" 
            :style="{ background: bgColor}"
        >
            <div 
                class="back" 
                @click="handleBack"
                :style="{ background: `url(${backIcon}) no-repeat center / ${bgSize}`}"
                v-if="hasBack"
            >
            </div>
            <h3 class="tit" :style="{ color: titleColor}">
                {{title}}
            </h3>
            <slot></slot>
        </header>
        <div class="tempbox"></div>
    </div>
</template>
<script>
export default {
    name: 'header-bar',
    props:{
        title: String,
        hasBack: {  // 是否显示返回箭头
            type: Boolean,
            default: true
        },
        bgColor: {   // header背景色
            type: String,
            default: "white",
        },
        titleColor: {  // 文字颜色
            type: String,
            default: "#666666"
        },
        backIcon: {   // 返回箭头icon
            type: String,
            default: require('@/assets/images/backIcon.png')
        },
        bgSize: {    // icon背景图大小
            type: String,
            default: '.2rem 0.2rem'
        },
        hasOrderRecord: { // 是否显示'订单记录'
            type: Boolean,
            default: false
        }
    },
    // activated() {
    // },
    methods: {
        handleBack() {
            // 派发返回箭头被点击事件
            if (typeof(this.$listeners['handleBack']) === "function") {
                this.$emit('handleBack')
            } else {
                this.$router.go(-1)
            }           
        }
    }
}
</script>
<style lang="stylus" scoped>
.header
    position: absolute
    top: 0
    left: 0
    right: 0
    height: 0.44rem
    line-height: 0.44rem
    background: #242738
    z-index: 8
    display: flex
    padding: 0 0.44rem
    box-sizing: border-box
    .back
        position: absolute
        left: 0
        top: 0
        width: 0.44rem
        height: 0.44rem
        background-size: 100%
    .tit
        flex: 1
        font-size: 0.18rem
        text-align: center
        white-space: nowrap
        text-overflow: ellipsis
        overflow: hidden
        word-break: break-all
.tempbox
    width: 100%
    height: 0.44rem
</style>
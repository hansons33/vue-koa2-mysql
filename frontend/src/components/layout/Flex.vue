<template>
    <div :class="classObject" :style="styleObject" v-on="$listeners">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "MyFlex",
    props: {
        direction: String, //换行
        wrap: String, //是否换行
        justify: String, //主轴
        align: String, //副轴
        alignContent: String,
        full: {  //是否百分百继承父元素
            type: Boolean,
            default: false,
        },
        flex: [String, Number],
    },
    computed: {
        classObject: function () {
            return {
                flexbox: true,
                "flexbox-full": this.full,
                [`flexbox-dir-${this.direction}`]: this.direction,
                [`flexbox-${this.wrap}`]: this.wrap,
                [`flexbox-justify-${this.justify}`]: this.justify,
                [`flexbox-align-${this.align}`]: this.align,
                [`flexbox-align-content-${this.alignContent}`]: this.alignContent,
            };
        },
        styleObject: function () {
            if (this.flex) {
                return {
                    "-webkit-box-flex": this.flex,
                    "-webkit-flex": this.flex,
                    "-ms-flex": this.flex,
                    flex: this.flex,
                    overflow: "auto",
                };
            }
            return {};
        },
    },
};
</script>
<style lang="stylus">
.flexbox
    text-align: left
    overflow: hidden
    display: flex
    align-items: center
.flexbox.flexbox-full
    width: 100%
    height: 100%
.flexbox > .flexbox-full-x
    width: 100%
.flexbox > .flexbox-full-y
    width: 100%
/* flex-direction 方向 */
.flexbox.flexbox-dir-row
    flex-direction: row
.flexbox.flexbox-dir-row-reverse
    flex-direction: row-reverse
.flexbox.flexbox-dir-column
    flex-direction: column
.flexbox.flexbox-dir-column-reverse
    flex-direction: column-reverse

/* flex-wrap 换行 */
.flexbox.flexbox-nowrap
    flex-wrap: nowrap
.flexbox.flexbox-wrap
    flex-wrap: wrap
.flexbox.flexbox-wrap-reverse
    flex-wrap: wrap-reverse

/* justify-content */
.flexbox.flexbox-justify-start
    justify-content: flex-start
.flexbox.flexbox-justify-end
    justify-content: flex-end
.flexbox.flexbox-justify-center
    justify-content: center
.flexbox.flexbox-justify-between
    justify-content: space-between
.flexbox.flexbox-justify-around
    justify-content: space-around

/* align-items */
.flexbox.flexbox-align-start
    align-items: flex-start
.flexbox.flexbox-align-end
    align-items: flex-end
.flexbox.flexbox-align-center
    align-items: center
.flexbox.flexbox-align-stretch
    align-items: stretch
.flexbox.flexbox-align-baseline
    align-items: baseline
/* align-content */
.flexbox.flexbox-align-content-start
    align-content: flex-start
.flexbox.flexbox-align-content-end
    align-content: flex-end
.flexbox.flexbox-align-content-center
    align-content: center
.flexbox.flexbox-align-content-between
    align-content: space-between
.flexbox.flexbox-align-content-around
    align-content: space-around
.flexbox.flexbox-align-content-stretch
    align-content: stretch
.flexbox-none
    flex: none
    overflow: hidden
.flexbox-1
    flex: 1
    overflow-x: hidden
    overflow-y: auto
</style>
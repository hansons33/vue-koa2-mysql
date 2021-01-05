<template>
    <div :style="styleObject" v-on="$listeners">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "FlexItem",
    props: {
        flex: {
            type: [String, Number],
            default: 1,
        },
        block: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        styleObject: function () {
            return {
                "-webkit-box-flex": this.flex,
                "-webkit-flex": this.flex,
                "-ms-flex": this.flex,
                flex: this.flex,
                "overflow-y": "auto",
                "overflow-x": "hidden",
                width: this.block ? "100%" : undefined,
            };
        },
    },
};
</script>
<style lang="stylus" scoped></style>
<template>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Index',
    data() {
        return {
            ...mapState(['transitionName'])
        }
    }
}
</script>
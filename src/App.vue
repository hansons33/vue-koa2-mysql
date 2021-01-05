<template>
  <div id="app" class="app-container">
      <transition :name="transitionName">
          <keep-alive>
              <router-view></router-view>
          </keep-alive>
      </transition >
  </div>
</template>

<script>
export default {
  name: 'App',
  provide (){
    return {
      reload: this.reload
    }
  },
  data (){
    return {
      isRouterAlive: true,
      transitionName:''
    }
  },
  watch: {
        $route(to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            if(from.path == '/'){
                // 直接从外部进入去掉转场效果
                this.transitionName = ''
            }else{
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        }
    },
  methods: {
    reload (){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    } 
  }
}
</script>

<style lang="stylus" scoped>
.app-container
	width: 100%
	height: 100%
</style>

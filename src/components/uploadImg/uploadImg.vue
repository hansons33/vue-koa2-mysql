<template>
    <div>
        <van-uploader 
            v-if="!uploadControl"
            v-model="fileList" 
            :afterRead="afterRead"
            :max-count="1"
            :max-size="size * 1024"
            @oversize="onOversize"
            class="uploader"
            />
        <div v-if="uploadControl">
            <img class="photo" :src="imgUrl" alt="">
        </div>
        <van-button v-if="changable" class="submit" type="info" @click="submit(submitBtn)">{{submitBtn}}</van-button>
    </div>
</template>

<script>
import HomeService from "@/service/homeService"
export default {
    inject:['reload'],
    name: 'uploadImg',
    props:{
        imgUrl:{
            type: String,
            default: ''
        },
        size:{
            type: Number,
            default: 256
        },
        changable:{
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            fileList:[],
            submitBtn: '上传头像',
            uploadControl: true,
        }
    },
    watch:{
        imgUrl(newVal){
            if(newVal){
                this.submitBtn = '更换头像'
                this.uploadControl = true
            }else{
                this.uploadControl = false
            }
        }
    },
    methods:{
        async afterRead(file){ //读取图片后的回调
            let imgUrl = file.content
            file.status = "uploading";
            file.message = '上传中';
            let res = await HomeService.addImg({
                username: this.$store.state.username,
                imgUrl
            })
            if(res && res.error_info == "0"){
                this.uploadControl = false
                this.submitBtn = "更换头像"
                file.status = "done"
            }else{
                this.submitBtn = "重新上传"
                file.status = "failed";
                file.message = "上传失败"
            }
        },
        submit(type){ //上传头像
            if(type == "上传头像"){
                document.querySelector('.van-uploader__input').click()
            }else{
                this.uploadControl = false
                setTimeout(()=>{
                    let button = document.querySelector('.van-uploader__preview-delete')
                    if(button){
                        return new Promise((resolve)=>{
                            document.querySelector('.van-uploader__preview-delete').click()  
                            resolve(1)   
                        }).then((resolve)=>{
                            document.querySelector('.van-uploader__input').click()
                        })
                    }else{
                        document.querySelector('.van-uploader__input').click()
                    }
                },50)
            }
        },
        onOversize(file) {
            this.$toast(`图片不能超过${this.size}kb`)
            this.submitBtn = "重新上传"
        },
    },
    activated(){
        Object.assign(this.$data,this.$options.data())
        if(!this.imgUrl.length){
            this.uploadControl = false
        }
    },
}
</script>

<style lang="stylus" scoped>
.uploader
    display: inline
.submit
    font-size: .12rem
.photo
    margin: 0 .08rem .08rem 0
    width: .8rem
    height: .8rem
    background-size: 100%
</style>
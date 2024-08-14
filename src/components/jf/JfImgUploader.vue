<template>
  <div class="img-uploader" :style="{width:size+'px',height:size+'px'}" @mousemove="maskShow=true" @mouseleave="maskShow=false">
    <el-upload
      class="uploader"
      :class="{'circle':circle}"
      accept="image/*"
      :before-upload="before">
      <div v-if="urls.length">
        <div v-for="(url,index) in urls" :key="index">
          <el-image :src="url" fit="cover"/>
          <div v-if="maskShow" class="mask" :class="{'circle':circle}" @click.stop>
            <el-icon @click.stop="preview(url,urls)"><View /></el-icon>
            <el-icon @click.stop="urls.splice(index,1)"><Delete/></el-icon>
          </div>
        </div>
      </div>
      <div v-else class="uploader-icon" :class="{'circle':circle}">
        <el-icon><Plus/></el-icon>
      </div>
    </el-upload>
  </div>
</template>
<script>
import {Delete, Plus, UserFilled, View} from "@element-plus/icons-vue";
import {preview} from '@planckdev/element-plus/utils'
import {upload} from "@/api/system/comm";

export default {
  name: 'JfImgUploader',
  components: {Delete, Plus, UserFilled},
  props:{
    size:{//组件显示宽高
      type:Number,
      default:100
    },
    urls:{//默认图片
      type:Array,
      default:[]
    },
    hasPreview:{//是否显示预览
      type:Boolean,
      default:true
    },
    hasDel:{//是否显示删除按钮
      type:Boolean,
      default:true
    },
    multiple:{//多图
      type:Boolean,
      default:false
    },
    circle:{//圆形
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      maskShow:false,
    };
  },
  methods: {
    preview(url){
      preview(url,this.urls)
    },
    before(file) {
      let form = new FormData();
      //可以再这里添加其他参数
      form.append("file", file);
      upload(form).then(data=>{
        this.urls.push(data)
      })
      return false
    }
  }
}
</script>
<style>
.el-upload{
  width: 100%;
  height: 100%;
}
</style>
<style scoped lang="scss">
.img-uploader{
  position: relative;
  .uploader{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .uploader-icon{
      width: calc(100% - 1px);
      height: calc(100% - 1px);
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      font-size: 28px;
      color: #8c939d;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .circle{
    border-radius: 50% !important;
    overflow: hidden;
  }
  .mask{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);
    .el-icon{
      color: #fff;
      margin: 4px;
      cursor: pointer;
    }
  }
}
</style>
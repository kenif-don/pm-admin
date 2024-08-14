<template>
  <el-upload :before-upload="before">
    <div v-if="files.length">
      <div v-for="(file,index) in files" :key="index">
        <el-tag type="info" closable @close="files.splice(index,1)">{{file.length > 10 ? '...'+file.substring(file.length - 10) : file}}</el-tag>
      </div>
    </div>
    <jf-btn v-else text="上传"/>
  </el-upload>
</template>
<script>
import {upload} from "@/api/system/comm";
import JfBtn from "@/components/jf/JfBtn.vue";

export default {
  name: 'JfFileUploader',
  components: {JfBtn},
  props: {
    urls: {//默认图片
      type: Array,
      default: []
    },
    multiple: {//多图
      type: Boolean,
      default: false
    },
  },
  watch: {
    urls(val) {
      if (val && val.length > 0) {
        this.files = val
      }
    }
  },
  data() {
    return {
      files: []
    }
  },
  methods: {
    before(file) {
      let form = new FormData();
      //可以再这里添加其他参数
      form.append("file", file);
      upload(form).then(data => {
        this.files.push(data)
      })
      return false
    }
  }
}
</script>
<style>
.el-upload {
  width: 100%;
  height: 100%;
}
</style>
<style scoped lang="scss">
</style>
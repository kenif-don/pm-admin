<template>
  <el-upload class="ml12" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :before-upload="before">
    <jf-btn icon="Upload" :text="text||'导入'"/>
  </el-upload>
</template>
<script>
import JfBtn from "@/components/jf/JfBtn.vue";

export default {
  name: 'JfFileUploader',
  components: {JfBtn},
  props:['text'],
  methods: {
    before(file) {
      let form = new FormData();
      //可以再这里添加其他参数
      form.append("file", file);
      this.$emit('upload',form);
      return false
    }
  }
}
</script>
<style scoped lang="scss">
</style>
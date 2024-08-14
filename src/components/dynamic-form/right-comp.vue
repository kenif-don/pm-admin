<template>
  <div
      v-if="element"
      class="right-comp-container"
      :style="{'width': width,'height': height ? height : 'calc(100vh - 16px)'}">
    <div class="fl-center">
      <custom-title :title="element.name"/>
    </div>
    <input-right v-if="element.tag === 'input'" :form="element"/>
    <date-right v-if="element.tag === 'date'" :form="element"/>
    <select-right v-if="element.tag === 'select'" :form="element"/>
    <label-right v-if="element.tag === 'label'" :form="element"/>
    <upload-right v-if="element.tag === 'upload'" :form="element"/>
    <container-right v-if="element.tag === 'multiple-container' || element.tag === 'single-container'" :form="element"/>
    <row-right v-if="element.tag === 'el-row'" :form="element"/>
  </div>
</template>
<script>
import CustomTitle from "./comps/custom-title.vue";
import inputRight from "./right-attr/input-right.vue";
import dateRight from "./right-attr/date-right.vue";
import selectRight from "./right-attr/select-right.vue";
import labelRight from "./right-attr/label-right.vue";
import uploadRight from "./right-attr/upload-right.vue";
import containerRight from "./right-attr/container-right.vue";
import rowRight from "./right-attr/row-right.vue";
export default {
  components: {CustomTitle, inputRight,dateRight,selectRight,labelRight,uploadRight, containerRight,rowRight},
  props: ['element', 'width', 'height'],
}
</script>
<style>
.el-form-item {
  margin-bottom: 8px !important;
}
.el-form-item__content {
  display: flex;
  align-items: center;
  height: 40px;
}
</style>
<style lang="scss" scoped>
.right-attr-container {
  padding: 8px;
}

.right-comp-container {
  border-left: 1px solid #e6e6e6;
  overflow-y: auto;
  .fl-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
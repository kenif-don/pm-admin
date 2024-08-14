<template>
  <div class="left-comp-container" :style="{'width': width,'height': height ? height : '100vh'}">
    <div class="comp-item" v-for="item in config" :key="item.name">
      <custom-title :title="item.name"/>
      <div class="comp-item-child-container">
        <draggable
            class="comp-item-child-item"
            v-for="child in item.children" :key="child.name"
            :list="[child]"
            :group="{name:'dynamic-form',pull:'clone',put:false}"
            :clone="cloneObj"
            animation="340"
        >
          <span  @click.stop="add(child)">{{ child.name }}</span>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import  config from "./config";
import customTitle from "./comps/custom-title.vue";
import draggable from "vuedraggable";

export default {
  components: {customTitle, draggable},
  props: ['width', 'height'],
  data() {
    return {
      config
    }
  },
  methods: {
    cloneObj(obj) {
      //克隆并添加一个随机id
      const clone = JSON.parse(JSON.stringify(obj))
      clone.id = new Date().getTime();
      return clone
    },
    add(obj) {
      this.$emit('add', this.cloneObj(obj));
    }
  }
}
</script>

<style lang="scss" scoped>
.left-comp-container {
  border-right: 1px solid #e6e6e6;
  overflow-y: auto;


  .comp-item {
    padding: 10px;
    color: #121212;

    .comp-item-child-container {
      display: flex;
      flex-wrap: wrap;
      margin-top: 12px;

      .comp-item-child-item {
        border: 1px solid #dedede;
        margin-right: 8px;
        margin-bottom: 8px;
        padding: 4px 8px;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>
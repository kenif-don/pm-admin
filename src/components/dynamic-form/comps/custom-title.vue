<template>
  <div class="custom-title-container">
    <span class="custom-title" :style="{'color': titleColor ? titleColor : '#121212'}">{{ title }}</span>
    <span class="custom-subtitle" :style="{'color': titleColor ? titleColor : '#999999'}">{{ subtitle }}</span>
  </div>
</template>

<script>
export default {
  name: "custom-title",
  props: ['title', 'subtitle', 'titleColor','subtitleColor'],
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.custom-title-container{
  display:flex;
  flex-direction:column;
  .custom-title{
    font-size: 20px;
    font-weight: bold;
  }

  .custom-subtitle{
    font-size: 14px;
  }
}
</style>
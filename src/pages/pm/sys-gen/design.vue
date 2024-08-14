<template>
  <div style="width: 100%;height: calc(100vh - 86px);">
    <div id="antv-x6"/>
  </div>

</template>
<script>
import { Graph } from '@antv/x6'

export default {
  data () {
    return {
      graph: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.graph = new Graph({
        container: document.getElementById('antv-x6'),
        autoResize: true,//宽高自适应
        panning: true,//鼠标按下可拖动
        mousewheel: true,//鼠标滚轮缩放
        grid: true,//网格背景
        background: {
          color: '#F2F7FA',
        },
      })
      this.graph.addNode({
        id: 'node1',
        shape: 'rect',
        x: 100,
        y: 40,
        width: 100,
        height: 40,
        foreignObject: true,
      })
      this.graph.addNode({
        id: 'node2',
        shape: 'rect',
        x: 400,
        y: 20,
        width: '100',
        height: 40,
        label:'系统生成系统生成系统生成系统生成',
        tools: [
          {
            name: 'button-remove',
            args: { x: 99, y: -1 },
          },
          {
            name: 'node-editor',
          }
        ],
      })
      this.graph.addNode({
        id: 'node3',
        shape: 'rect',
        x: 400,
        y: 100,
        width: 100,
        height: 40,
      })
      this.graph.addEdge({
        source: 'node1',
        target: 'node2',
      })
      this.graph.addEdge({
        source: 'node1',
        target: 'node3',
      })
      //循环
      this.graph.addEdge({
        source: 'node1',
        target: 'node1',
        router:{
          name: 'manhattan',//避开障碍
          args: {
            startDirections: ['top'],
            endDirections: ['bottom'],
          },
        },
        connector:'rounded',//圆角
        labels: ['循环'],
        tools: ['edge-editor']
      })
      //画布操作
      /**
       * graph.resize(800, 600) // resize 画布大小
       * graph.translate(20, 20) // 在 x、y 方向上平移画布
       * graph.zoom(0.2) // 将画布缩放级别增加 0.2（默认为1）
       * graph.zoom(-0.2) // 将画布缩放级别减少 0.2
       * graph.zoomTo(1.2) // 将画布缩放级别设置为 1.2
       * // 将画布中元素缩小或者放大一定级别，让画布正好容纳所有元素，可以通过 maxScale 配置最大缩放级别
       * graph.zoomToFit({ maxScale: 1 })
       * graph.centerContent() // 将画布中元素居中展示
       * */
    }
  }
}
</script>
<style scoped lang="scss">

</style>
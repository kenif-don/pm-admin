<template>
  <div :style="{ width: size + 'px', height: size + 'px' }">
    <!-- 用于渲染ECharts图表的DOM元素 -->
    <div :id="id" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-liquidfill';
export default {
  name: "WaterCharts",
  props: {
    id: {
      type: String,
      default: 0
    },
    rate: {// 百分比
      type: Number,
      required: true,
      default: 50,
    },
    size: {// 图表大小
      type: Number,
      required: true,
      default: 214,
    },
    color: {// 水球颜色
      type: String,
      default: '#37cc5b',
    },
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    rate(newValue) {
      this.drawWaterball(newValue);
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.chart = echarts.init(document.getElementById(this.id));
      this.drawWaterball(this.rate);
    })
  },
  methods: {
    drawWaterball(rate) {
      if(!this.chart) return
      const option = {
        series: [
          {
            type: 'liquidFill',
            data: [rate / 100], // 百分比的值，取值范围为0到1
            color: [this.color],
            radius: '85%', // 水球图的半径，可以根据需要调整
            itemStyle: {
              opacity: 0.5, // 波浪颜色透明度
            },
            label: {
              formatter(param) {
                return [`{a|${rate || (param.value * 100).toFixed(0)}}`, '{b|%}'].join('');
              },
              rich: {
                a: {
                  fontSize: 36,
                  color: this.color,
                  fontFamily: 'DINPro',
                  fontWeight: 400,
                  zIndex: 1
                },
                b: {
                  fontSize: 26,
                  color: this.color,
                  fontFamily: 'DINPro-Regular',
                  fontWeight: 400,
                  padding: [0, 0, 0, 0],
                },
              },
            },
            backgroundStyle: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(255, 255, 255, 0)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(255, 255, 255, 1)', // 100% 处的颜色
                  },
                ],
              },
            },
            outline: {
              borderDistance: 5,
              itemStyle: {
                borderWidth: 2,
                borderColor: this.color,
                shadowBlur: 30,
              },
            },
          },
        ],
      };

      this.chart.setOption(option);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>


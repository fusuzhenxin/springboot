<template>
  <div ref="chart" style="width: 100%; height: 800px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      mapData: {
        "inbound": [],
        "outbound": [0, 0, 0, 0, 1, 1],
        "categories": ["一月", "二月", "三月", "四月", "四季度", "全年"]
      },
      allData:'',
      chart: null,
    };
  },
  created() {
    this.load()
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart);
    this.updateChart();
  },
  methods: {
    load(){
      this.request.get("/echarts/data").then(res =>{

        if (res.code === '200') {
          this.mapData.inbound = res.data.inbound
          this.mapData.outbound = res.data.outbound
          this.mapData.categories = res.data.categories
        } else {
          this.$message.error("加载失败")
        }
        this.updateChart();  // 在获取数据后更新图表
      })
    },
    updateChart() {
      const option = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['入库', '出库'],
        },
        xAxis: {
          type: 'category',
          data: this.mapData.categories
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '入库',
            type: 'bar',
            data: this.mapData.inbound
          },
          {
            name: '出库',
            type: 'bar',
            data: this.mapData.outbound
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
};
</script>
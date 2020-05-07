<template>
  <div class="container">
    <div id="chart" ref="chart"></div>
  </div>
</template>

<script>
import logic from "./logic";
export default {
  name: "echarts-map",
  data() {
    return {
      mapBarData: [],
      level: "",
      regionName: '全国'
    };
  },
  mixins: [logic]
};
</script>

<style lang="less" scoped>
#chart {
  height: 400px;
}
</style>
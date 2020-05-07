<template>
  <div class="home" :style="{ padding: '40px ' + padding + 'px' }">
    <ul>
      <li :style="{ backgroundColor: colorPicker(k) }" v-for="(i, k) in itemArr" :key="k">
        <router-link :to="i.url">{{i.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      itemArr: [
        {
          name: "神策分析——四则运算",
          url: "/sd-ele"
        },
        {
          name: "神策分析——图表",
          url: "/sd-chart"
        },
        {
          name: "3D地图",
          url: "/echarts-map"
        }
      ],
      colorMap: ["#409EFF", "#67C23A", "#E6A23C", "#F56C6C", "#909399"],
      column: 4,
      columnWidth: 280
    };
  },
  methods: {
    colorPicker(k) {
      const i = k > this.colorMap.length ? k % this.colorMap.length : k;
      return this.colorMap[i];
    }
  },
  computed: {
    padding() {
      return this.itemArr.length < this.column
        ? ((this.column - this.itemArr.length) * this.columnWidth) / 2
        : 0;
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 1120px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  ul {
    li {
      width: 240px;
      display: inline-block;
      height: 140px;
      border-radius: 4px;
      text-align: center;
      margin: 20px;
      line-height: 140px;
      a {
        color: #fff;
        text-decoration: none;
        display: block;
      }
    }
  }
}
</style>

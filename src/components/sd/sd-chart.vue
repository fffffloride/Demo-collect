<template>
  <div class="chart">
    <div class="container">
      <ul>
        <li>
          <div class="report-chart">
            <div class="time-picker">
              <el-button type="primary" @click="compare">对比</el-button>
              <el-button type="primary" @click="reset">复原</el-button>
            </div>
            <div class="chart-name">测试</div>
            <div class="chart-tool">
              <el-select v-model="value" placeholder="请选择" @change="typeChange">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="chart-box" id="event"></div>
        </li>
        <li>
          <funnel></funnel>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import funnel from "./sd-chart-funnel"
export default {
  data() {
    return {
      chart1: {},
      data1: [
        { date: "3-13 1:00", number: 60, time: "current" },
        { date: "3-13 2:00", number: 25, time: "current" },
        { date: "3-13 3:00", number: 50, time: "current" },
        { date: "3-13 4:00", number: 66, time: "current" },
        { date: "3-13 5:00", number: 75, time: "current" },
        { date: "3-13 6:00", number: 62, time: "current" },
        { date: "3-13 7:00", number: 88, time: "current" },
        { date: "3-13 8:00", number: 100, time: "current" },
        { date: "3-13 9:00", number: 25, time: "current" },
        { date: "3-13 10:00", number: 63, time: "current" },
        { date: "3-13 11:00", number: 45, time: "current" }
      ],
      data2: [
        { date: "3-13 1:00", number: 40 },
        { date: "3-13 2:00", number: 55 },
        { date: "3-13 3:00", number: 60 },
        { date: "3-13 4:00", number: 36 },
        { date: "3-13 5:00", number: 75 },
        { date: "3-13 6:00", number: 72 },
        { date: "3-13 7:00", number: 78 },
        { date: "3-13 8:00", number: 30 },
        { date: "3-13 9:00", number: 65 },
        { date: "3-13 10:00", number: 13 },
        { date: "3-13 11:00", number: 75 }
      ],
      typeOptions: [
        {
          label: "折线图",
          value: 0
        },
        {
          label: "柱状图",
          value: 1
        }
      ],
      value: 0
    };
  },
  mounted() {
    this.chart1 = new this.Chart({
      container: "event",
      autoFit: true,
      height: 380,
      padding: [40, 40]
    });
    this.chart1.tooltip({
      showCrosshairs: true,
      shared: true
    });
    this.chart1.data(this.data1);

    this.chart1
      .line()
      .position("date*number")
      .color("time");
    this.chart1
      .point()
      .position("date*number")
      .color("time")
      .shape("circle");
    this.chart1.scale("number", {
      nice: true
    });

    this.chart1.render();
  },
  methods: {
    typeChange(value) {
      this.chart1.clear();
      switch (value) {
        case 0:
          this.chart1.data(this.data1);
          this.chart1
            .line()
            .position("date*number")
            .color("time");
          this.chart1
            .point()
            .position("date*number")
            .shape("circle");
          break;
        case 1:
          this.chart1.data(this.data1);
          this.chart1
            .interval()
            .position("date*number")
            .color("time")
            .adjust([
              {
                type: "dodge",
                marginRatio: 0
              }
            ]);
          break;
      }
      this.chart1.render();
    },
    compare() {
      this.data1 = [
        { date: "3-13 1:00/3-12 1:00", number: 60, time: "current" },
        { date: "3-13 2:00/3-12 2:00", number: 25, time: "current" },
        { date: "3-13 3:00/3-12 3:00", number: 50, time: "current" },
        { date: "3-13 4:00/3-12 4:00", number: 66, time: "current" },
        { date: "3-13 5:00/3-12 5:00", number: 75, time: "current" },
        { date: "3-13 6:00/3-12 6:00", number: 62, time: "current" },
        { date: "3-13 7:00/3-12 7:00", number: 88, time: "current" },
        { date: "3-13 8:00/3-12 8:00", number: 100, time: "current" },
        { date: "3-13 9:00/3-12 9:00", number: 25, time: "current" },
        { date: "3-13 10:00/3-12 10:00", number: 63, time: "current" },
        { date: "3-13 11:00/3-12 11:00", number: 45, time: "current" },
        { date: "3-13 1:00/3-12 1:00", number: 30, time: "prevent" },
        { date: "3-13 2:00/3-12 2:00", number: 45, time: "prevent" },
        { date: "3-13 3:00/3-12 3:00", number: 70, time: "prevent" },
        { date: "3-13 4:00/3-12 4:00", number: 96, time: "prevent" },
        { date: "3-13 5:00/3-12 5:00", number: 95, time: "prevent" },
        { date: "3-13 6:00/3-12 6:00", number: 52, time: "prevent" },
        { date: "3-13 7:00/3-12 7:00", number: 38, time: "prevent" },
        { date: "3-13 8:00/3-12 8:00", number: 70, time: "prevent" },
        { date: "3-13 9:00/3-12 9:00", number: 25, time: "prevent" },
        { date: "3-13 10:00/3-12 10:00", number: 73, time: "prevent" },
        { date: "3-13 11:00/3-12 11:00", number: 85, time: "prevent" }
      ];
      this.render();
    },
    reset() {
      this.data1 = [
        { date: "3-13 1:00", number: 60, time: "current" },
        { date: "3-13 2:00", number: 25, time: "current" },
        { date: "3-13 3:00", number: 50, time: "current" },
        { date: "3-13 4:00", number: 66, time: "current" },
        { date: "3-13 5:00", number: 75, time: "current" },
        { date: "3-13 6:00", number: 62, time: "current" },
        { date: "3-13 7:00", number: 88, time: "current" },
        { date: "3-13 8:00", number: 100, time: "current" },
        { date: "3-13 9:00", number: 25, time: "current" },
        { date: "3-13 10:00", number: 63, time: "current" },
        { date: "3-13 11:00", number: 45, time: "current" }
      ];
      this.render();
    },
    render() {
      this.typeChange(this.value);
    }
  },
  components: {
    funnel
  }
};
</script>

<style lang="less" scoped>
.chart {
  width: 100%;
  background-color: #dedede;
  .container {
    height: 100%;
    width: 1600px;
    margin: 0 auto;
    ul {
      padding: 20px;
      li {
        margin-bottom: 20px;
        background-color: #fff;
        border-radius: 6px;
        &:last-child {
          margin-bottom: 0;
        }
        .report-chart {
          height: 70px;
          padding: 20px 12px 14px;
          border-bottom: 1px solid #eee;
          .time-picker {
            width: 210px;
            display: inline-block;
          }
          .chart-name {
            width: calc(100% - 520px);
            display: inline-block;
            text-align: center;
          }
          .chart-tool {
            float: right;
          }
        }
      }
    }
  }
}
</style>
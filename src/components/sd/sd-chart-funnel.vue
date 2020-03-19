<template>
  <div class="funnel">
    <div class="report-chart">
      <div class="time-picker">
        <el-button type="primary">时间选择</el-button>
      </div>
      <div class="chart-name">测试</div>
      <div class="chart-tool">
        <el-button type="primary" @click="reset">趋势</el-button>
        <el-button type="primary" @click="compare">对比</el-button>
      </div>
    </div>
    <div class="funnel-content">
      <div class="funnel-first">
        <svg
          data-step="$ALL"
          :class="{'active': activeFlag[0]}"
          width="107"
          height="57"
          xmlns="http://www.w3.org/2000/svg"
          @click="showChart(0)"
        >
          <g>
            <title />
            <g fill="none" fill-rule="evenodd">
              <g fill="#EAEFF4" :class="{'active': activeFlag[0]}">
                <polygon
                  points="0,0 107,0 107,44 53.5,57 0,44"
                  style="stroke-width: 1; stroke: rgba(0,0,0,0.12);"
                />
              </g>
            </g>
            <text
              fill="#000000"
              stroke="#6666ff"
              stroke-width="0"
              stroke-dasharray="null"
              stroke-linejoin="null"
              stroke-linecap="null"
              x="50%"
              y="23"
              font-size="14"
              font-family="Monospace"
              text-anchor="middle"
              xml:space="preserve"
            >{{firstData.title}}</text>
            <text
              xml:space="preserve"
              text-anchor="middle"
              font-size="14"
              y="39"
              x="48%"
              stroke-linecap="null"
              stroke-linejoin="null"
              stroke-dasharray="null"
              stroke-width="0"
              stroke="#6666ff"
              fill="#000000"
            >{{firstData.percent}}</text>
          </g>
        </svg>
      </div>
      <div class="funnel-item" v-for="(i, k) in conversionData" :key="k">
        <div class="funnel-item-head">
          <span class="step">{{k + 1}}</span>
          <div class="event-title">{{i.title}}</div>
          <span class="line"></span>
          <a class="event-person" href="javascript:">{{i.person}}人</a>
        </div>
        <div class="funnel-item-chart" v-if="i.percent">
          <svg
            data-step="0"
            width="100"
            height="44"
            xmlns="http://www.w3.org/2000/svg"
            :class="{'active': activeFlag[k+1]}"
            @click="showChart(k+1)"
          >
            <g>
              <g fill="none" fill-rule="evenodd">
                <g fill="#EAEFF4" :class="{'active': activeFlag[k+1]}">
                  <polygon
                    points="18,0 82,0 82,20 100,20 50,44 0,20 18,20 "
                    style="stroke-width: 1; stroke: rgba(0,0,0,0.12);"
                  />
                </g>
              </g>
              <text
                xml:space="preserve"
                text-anchor="middle"
                font-size="14px"
                id
                y="26"
                x="48%"
                stroke-linecap="null"
                stroke-linejoin="null"
                stroke-dasharray="null"
                stroke-width="0"
                stroke="#6666ff"
                fill="#000000"
              >{{i.percent}}</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div class="funnel-chart-container">
      <div class="chart-title">{{chartTitle || dataCollect[0].title}}</div>
      <div id="chart-show"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstData: {
        title: "总转化率",
        percent: "33%"
      },
      conversionData: [
        {
          title: "APP启动",
          percent: "99.71%",
          person: 5154
        },
        {
          title: "App浏览页面",
          percent: "33.41%",
          person: 5139
        },
        {
          title: "提交订单",
          percent: "",
          person: 1717
        }
      ],
      activeFlag: [1],
      chart1: {},
      dataCollect: [
        {
          title: "第一层",
          data: [
            { date: "3-13 1:00", number: 60 },
            { date: "3-13 2:00", number: 25 },
            { date: "3-13 3:00", number: 50 },
            { date: "3-13 4:00", number: 66 },
            { date: "3-13 5:00", number: 75 },
            { date: "3-13 6:00", number: 62 },
            { date: "3-13 7:00", number: 88 },
            { date: "3-13 8:00", number: 100 },
            { date: "3-13 9:00", number: 25 },
            { date: "3-13 10:00", number: 63 },
            { date: "3-13 11:00", number: 45 }
          ]
        },
        {
          title: "第二层",
          data: [
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
          ]
        },
        {
          title: "第三层",
          data: [
            { date: "3-13 1:00", number: 83 },
            { date: "3-13 2:00", number: 56 },
            { date: "3-13 3:00", number: 36 },
            { date: "3-13 4:00", number: 27 },
            { date: "3-13 5:00", number: 75 },
            { date: "3-13 6:00", number: 84 },
            { date: "3-13 7:00", number: 82 },
            { date: "3-13 8:00", number: 24 },
            { date: "3-13 9:00", number: 83 },
            { date: "3-13 10:00", number: 52 },
            { date: "3-13 11:00", number: 27 }
          ]
        }
      ],
      chartTitle: "",
      cmpData: [
        { type: "APP启动", percent: 100 },
        { type: "App浏览页面", percent: 66 },
        { type: "提交订单", percent: 33 }
      ],
      block: false
    };
  },
  methods: {
    showChart(flag) {
      if (!this.block) {
        this.activeFlag = [];
        this.activeFlag[flag] = 1;
        this.chartTitle = this.dataCollect[flag].title;
        this.chart1.data(this.dataCollect[flag].data).render(true);
      }
    },
    reset() {
      this.block = false;
      this.activeFlag = [1];

      this.chart1.clear();
      this.chart1.data(this.dataCollect[0].data);
      this.chart1.tooltip({
        showCrosshairs: true,
        shared: true
      });

      this.chart1.line().position("date*number");
      this.chart1
        .point()
        .position("date*number")
        .shape("circle");
      this.chart1.scale("number", {
        nice: true
      });

      this.chart1.render();
    },
    compare() {
      this.activeFlag = [];
      this.block = true;

      this.chart1.clear();
      this.chart1.data(this.cmpData);

      this.chart1
        .interval()
        .position("type*percent")
        .shape("circle");
      this.chart1.scale("percent", {
        nice: true
      });

      this.chart1.render();
    }
  },
  mounted() {
    this.chart1 = new this.Chart({
      container: "chart-show",
      autoFit: true,
      height: 380,
      padding: [40, 40]
    });
    this.chart1.tooltip({
      showCrosshairs: true,
      shared: true
    });
    this.chart1.data(this.dataCollect[0].data);

    this.chart1.line().position("date*number");
    this.chart1
      .point()
      .position("date*number")
      .shape("circle");
    this.chart1.scale("number", {
      nice: true
    });
    this.chart1.axis("number", {
      label: {
        formatter: val => {
          return +val + "%";
        }
      }
    });

    this.chart1.render();
  }
};
</script>

<style lang="less" scoped>
.funnel {
  color: rgba(0, 0, 0, 0.38);
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
  .funnel-content {
    max-height: 400px;
    min-height: 400px;
    display: inline-block;
    overflow-y: auto;
    .funnel-first {
      padding: 10px 0;
      text-align: center;
      svg {
        width: 107px;
        height: 57px;
        cursor: pointer;
      }
    }
    .funnel-item {
      .funnel-item-head {
        background: rgba(0, 0, 0, 0.03);
        border: 1px solid rgba(0, 0, 0, 0.06);
        border-radius: 2px;
        width: 360px;
        line-height: 36px;
        padding: 0 5px;
        display: inline-block;
        .step {
          width: 16px;
          margin: 2px;
          line-height: 16px;
          font-size: 14px;
          background: #c3e6d0;
          color: #2dca93;
          display: inline-block;
          text-align: center;
          vertical-align: middle;
        }
        .event-title {
          display: inline-block;
          text-overflow: ellipsis;
          overflow-x: hidden;
          width: 190px;
          white-space: nowrap;
          vertical-align: middle;
          margin-left: 4px;
        }
        .line {
          border-right: 1px solid rgba(0, 0, 0, 0.12);
          height: 14px;
        }
        .event-person {
          float: right;
          // display: inline-block;
          vertical-align: middle;
        }
      }
      .funnel-item-chart {
        text-align: center;
        padding: 10px 0;
        cursor: pointer;
      }
    }
    svg.active g.active {
      fill: #559ff0;
    }
  }
  .funnel-chart-container {
    height: 400px;
    border-left: 1px solid rgba(0, 0, 0, 0.12);
    padding: 10px 0 10px 10px;
    max-height: 400px;
    display: inline-block;
    width: calc(100% - 390px);
    .chart-title {
      position: relative;
      margin-top: -25px;
      text-align: center;
      padding-top: 5px;
      font-size: 13px;
      color: rgba(0, 0, 0, 0.38);
    }
    .chart-show {
    }
  }
}
</style>
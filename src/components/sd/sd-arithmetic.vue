<template>
  <div class="arithmetic">
    <div class="expression-unit" @click="showList" ref="expression">
      <ul class="clearfix">
        <li
          v-for="(item, key) in selectItemArr"
          :key="key"
          :class="{ normal: true }"
        >
          {{ item.type }}
        </li>
        <li class="text normal" v-show="showInput">
          <input type="text" v-model="inputValue" />
        </li>
      </ul>
    </div>
    <div class="expression-menu" :style="{}" v-show="listFlag">
      <div class="overflow-wrapper" style="height: 192px; max-height: 459px;">
        <ul class="expression-menu-list">
          <li v-for="(item, key) in showData" :key="key" @click="addItem(item)">
            {{ item.type }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      DATAMAP: [
        {
          type: "任意事件",
          level: 1,
          attrs: [
            {
              type: "总次数",
              value: 100,
              level: 2
            },
            {
              type: "用户数",
              value: 120,
              level: 2
            },
            {
              type: "人均次数",
              value: 30,
              level: 2
            }
          ]
        },
        {
          type: "APP 启动",
          level: 1,
          attrs: [
            {
              type: "总次数",
              value: 100,
              level: 2
            },
            {
              type: "IP",
              value: "192.168.2.33",
              level: 2
            }
          ]
        },
        {
          type: "APP 点击事件",
          level: 1,
          attrs: [
            {
              type: "总次数",
              value: 100,
              level: 2
            },
            {
              type: "用户数",
              value: 120,
              level: 2
            },
            {
              type: "人均次数",
              value: 30,
              level: 2
            },
            {
              type: "SDK类型",
              value: "web",
              level: 2
            }
          ]
        }
      ],
      selectItemArr: [],
      listFlag: false,
      arithmeticType: ["+", "-", "*", "/"],
      showInput: false,
      inputValue: "",
      showData: [],
      selectItem: []
    };
  },
  methods: {
    showList() {
      if (this.inputValue === "." && this.selectItem.attrs) {
        this.showData = this.selectItem.attrs;
        this.listFlag = true;
        return;
      }

      if (this.inputValue === "+") {
        this.showData = [...this.DATAMAP];
        this.listFlag = true;
        return;
      }
      // if (this.selectItem.attrs) {
      //   this.inputValue = ".";
      //   this.showInput = true;
      //   this.showData = this.selectItem.attrs;
      //   this.listFlag = true;
      // } else {
      //   this.inputValue = "";
      //   this.showInput = false;
      // }
      // this.listFlag = true;
    },
    addItem(item) {
      this.selectItemArr.push(item);
      this.listFlag = false;
      this.selectItem = item;

      if (item.attrs) {
        this.inputValue = ".";
        this.showInput = true;
        this.showData = item.attrs;
        this.listFlag = true;
      } else {
        this.inputValue = "";
      }
    },
    // judge() {
    //   if (this.arithmeticType.includes(this.inputValue)) {
    //     this.addItem();
    //   }
    // }
  },
  created() {
    this.showData = [...this.DATAMAP];
  },
  mounted() {
    // window.addEventListener("click", () => {
    //   if (event.target !== this.$refs.expression) {
    //     this.showList = false;
    //   }
    // })
  },
  watch: {
    inputValue(value) {
      if (!value) {
        this.showList = false;
      } 
      if (this.arithmeticType.includes(value)) {
        this.showInput = true;
        this.showData = this.selectItem.attrs;
        this.listFlag = true;
      }
      if (value === '.' && this.selectItem.attrs) {
        this.showData = this.selectItem.attrs;
        this.listFlag = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.arithmetic {
  width: 960px;
  height: 90vh;
  margin: 0 auto;
  div {
    display: inline-block;
  }
  .expression-unit {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 36px;
    max-height: 173px;
    overflow-y: scroll;
    margin: 0;
    border: 1px solid #e2e9f1;
    border-radius: 3px;
    padding: 0 0 0 3px;
    background: #fff;
    vertical-align: middle;
    ul {
      li {
        float: left;
        display: inline-block;
        position: relative;
        height: 100%;
        vertical-align: top;
        &.normal {
          padding: 0 8px;
          height: 22px;
          margin: 6px 4px;
          border-radius: 3px;
          background: #edf4fb;
          color: #475669;
          font-size: 12px;
          line-height: 22px;
          white-space: nowrap;
          user-select: none;
          cursor: pointer;
        }
        &.text {
          width: 18px;
          input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            min-width: 1px;
            border: 0;
            padding-left: 0;
            padding-right: 0;
            background: 0 0;
            color: #475669;
            font-size: 12px;
          }
        }
      }
    }
  }
  .expression-menu {
    position: absolute;
    z-index: 1000;
    min-width: 160px;
    max-height: 459px;
    overflow-y: hidden;
    margin: 0 0 0 3px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    padding: 5px 0;
    border-radius: 4px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    background: #fff;
    color: #333;
    font-size: 14px;
    .overflow-wrapper {
      overflow-y: auto;
      height: auto;
      width: 100%;
      ul {
        li {
          cursor: pointer;
          padding: 3px 20px;
          color: #333;
          white-space: nowrap;
          font-size: 14px;
          font-weight: 400;
          line-height: 26px;
        }
      }
    }
  }
}
</style>

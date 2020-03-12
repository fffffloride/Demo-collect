<template>
  <div class="arithmetic">
    <div class="expression-unit" ref="expression">
      <div class="item-box" v-for="(i, j) in index" :key="j">
        <el-cascader :options="DATAMAP" ref="cascader" v-model="selectModelArr[j]"></el-cascader>
        <el-select
          v-model="valueArr[j]"
          placeholder
          style="width: 60px"
          :disabled="!selectModelArr[j]"
          @change="addItem(j)"
        >
          <el-option
            v-for="item in SIGNMAP"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>

    <el-button-group class="button-group">
      <el-button type="primary" icon="el-icon-d-arrow-left" @click="back" :disabled="index == 1"></el-button>
      <el-button type="primary" icon="el-icon-delete" @click="clear" :disabled="index == 1"></el-button>
      <el-button
        type="primary"
        icon="el-icon-circle-check-outline"
        :disabled="saveFlag"
        @click="save"
      >保存</el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      DATAMAP: [
        {
          label: "任意事件",
          value: "任意事件",
          children: [
            {
              label: "总次数",
              value: "总次数"
            },
            {
              label: "用户数",
              value: "用户数"
            },
            {
              label: "人均次数",
              value: "人均次数"
            }
          ]
        },
        {
          label: "APP 启动",
          value: "APP 启动",
          children: [
            {
              label: "总次数",
              value: "总次数"
            },
            {
              label: "IP",
              value: "IP"
            }
          ]
        },
        {
          label: "APP 点击事件",
          value: "APP 点击事件",
          children: [
            {
              label: "总次数",
              value: "总次数"
            },
            {
              label: "用户数",
              value: "用户数"
            },
            {
              label: "人均次数",
              value: "人均次数"
            },
            {
              label: "SDK类型",
              value: "SDK类型"
            }
          ]
        }
      ],
      SIGNMAP: [
        {
          label: "+",
          value: "+"
        },
        {
          label: "-",
          value: "-"
        },
        {
          label: "*",
          value: "*"
        },
        {
          label: "/",
          value: "/"
        }
      ],
      selectModelArr: [],
      valueArr: [],
      index: 1
    };
  },
  methods: {
    save() {
      let str = "";
      let i = 0;
      while (i < this.index) {
        str +=
          this.valueOf(this.selectModelArr[i]) + this.valueOf(this.valueArr[i]);
        i++;
      }
      console.log(str);
    },
    valueOf(i) {
      if (!i || typeof i === "undefined") {
        return "";
      }
      return i;
    },
    addItem(j) {
      if (j === this.index - 1) {
        this.index++;
      }
    },
    back() {
      if (this.selectModelArr[this.index - 1]) {
        this.selectModelArr[this.index - 1] = "";
      }
      if (this.valueArr[this.index - 2]) {
        this.valueArr[this.index - 2] = "";
      }
      this.index--;
    },
    clear() {
      this.index = 1;
      this.selectModelArr = [];
      this.valueArr = [];
    }
  },
  computed: {
    saveFlag() {
      if (
        this.selectModelArr.length === 0 ||
        this.selectModelArr[this.index - 1] === undefined
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="less" scoped>
.arithmetic {
  width: 960px;
  height: 90vh;
  margin: 0 auto;
  div {
    display: block;
    float: left;
  }
  .expression-unit {
    position: relative;
    display: inline-block;
    width: 100%;
    // height: 40px;
    max-height: 173px;
    overflow-y: scroll;
    margin: 0;
    border: 1px solid #e2e9f1;
    border-radius: 3px;
    padding: 0 0 0 3px;
    background: #fff;
    vertical-align: middle;
    .input-wrapper {
      width: 20px;
    }
  }
  .button-group {
    float: right;
    margin-top: 8px;
  }
}
</style>

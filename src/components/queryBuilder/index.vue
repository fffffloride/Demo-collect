<template>
  <div class="user-group">
    <div class="user-group-hd">
      <div class="user-group-hd-info">用户行为满足</div>
      <div class="user-group-hd-add" @click="addBehavior">添加</div>
    </div>
    <div class="user-group-bd">
      <div class="user-group-bd-rules">
        <div class="user-group-bd-rules-relation" v-if="paramsArray.length > 1">
          <!-- <span class="rule">且</span> -->
          <relationButton @click="changeRelation(0)" :status="1"></relationButton>
        </div>
        <ul class="user-group-bd-rules-list">
          <li v-for="(item1, key1) in paramsArray" :key="key1">
            <div class="user-group-bd-rules-relation" v-if="paramsArray[key1].length > 1">
              <span class="rule">且</span>
            </div>
            <ul class="user-group-bd-rules-list">
              <li v-for="(item2, key2) in paramsArray[key1]" :key="key2">
                <span class="num">A</span>
                <div class="container">
                  <div class="item-box">
                    <div class="event-container">
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                      <div class="add-filter" @click="addFilter(key1, key2)">添加筛选</div>
                    </div>
                    <div class="operation">
                      <div>
                        <span @click="addBrather(key1, key2)" v-if="key2 === paramsArray[key1].length - 1">新增</span>
                        <i @click="removeBehavior(key1, key2)">X</i>
                      </div>
                    </div>
                  </div>
                  <div class="filter-box" v-if="paramsArray[key1][key2].rules.length > 0">
                    <span class="word">并且满足</span>
                    <div class="ant-card">
                      <div class="ant-card-body">
                        <!-- <div class="relation">
                              <div class="topline line"></div>
                              <button class="ant-btn">且</button>
                              <div class="bottomline line"></div>
                        </div>-->
                        <div class="ant-row conditions">
                          <div
                            class="ant-row item"
                            v-for="(item3, key3) in paramsArray[key1][key2].rules"
                            :key="key3"
                          >
                            <el-select v-model="value" placeholder="请选择">
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import relationButton from './relationButton';
export default {
  name: "userGroup",
  data() {
    return {
      paramsArray: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      obj: {
        relation: false,
        rules: [
          {
            filters: {
              relation: false,
              rules: []
            }
          }
        ]
      }
    };
  },
  methods: {
    addBehavior() {
      const len = this.paramsArray.length;
      this.$set(this.paramsArray, len, [{ rules: [] }]);
    },
    removeBehavior(index1, index2) {
      this.$delete(this.paramsArray[index1], index2);
    },
    addBrather(index1, index2) {
      this.$set(this.paramsArray[index1], index2 + 1, { rules: [] });
    },
    addFilter(index1, index2) {
      const len = this.paramsArray[index1][index2].rules.length;
      this.paramsArray[index1][index2] &&
        this.$set(this.paramsArray[index1][index2].rules, len, {});
    }
  },
  components: {
    relationButton
  }
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.user-group {
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid #e0e6ed;
  padding: 12px 13px;
  border-radius: 3px;
  width: 800px;
  margin: 0 auto;
  &-hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-info {
      font-size: 14px;
      font-weight: 600;
      color: #1f2d3d;
      margin-right: 8px;
    }
    &-add {
      display: flex;
      align-items: center;
      user-select: none;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      color: #475669;
    }
  }
  &-bd {
    height: auto;
    margin-top: 13px;
    transition: all 0.25s linear;
    overflow: hidden;
    width: 100%;
    &-rules {
      position: relative;
      display: flex;
      &-relation {
        left: 0;
        top: 0;
        bottom: 0;
        position: relative;
        top: 8px;
        margin-right: 8px;
        &::before {
          content: " ";
          position: absolute;
          top: 0;
          left: 50%;
          width: 2px;
          height: 100%;
          overflow: hidden;
          background: #d6efe8;
        }
        span {
          position: relative;
          display: block;
          top: 50%;
          left: 0;
          right: 0;
          width: 25px;
          height: 25px;
          transform: translateY(-50%);
          border-radius: 3px;
          background: #d6efe8;
          color: #00d166;
          text-align: center;
          cursor: pointer;
          user-select: none;
          line-height: 18px;
          font-size: 12px;
        }
      }
      &-list {
        margin: 0;
        padding: 0;
        list-style: none;
        flex: 1;
        li {
          display: flex;
          padding-left: 0;
          margin-bottom: 16px;
          position: relative;
          span.num {
            display: inline-block;
            background: #2dca93;
            color: #fff;
            width: 20px;
            height: 20px;
            border-radius: 2px;
            font-size: 14px;
            line-height: 20px;
            text-align: center;
            position: relative;
            top: 6px;
            margin-right: 14px;
          }
          .container {
            flex: 1;
            .item-box {
              display: flex;
              justify-content: space-between;
              .event-container {
                flex: 1;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                .add-filter {
                  line-height: 40px;
                  margin-left: 10px;
                }
              }
              .operation {
                display: flex;
                align-items: flex-start;
                div {
                  display: flex;
                  height: 32px;
                  align-items: center;
                  span {
                    display: inline-block;
                    height: 32px;
                    line-height: 32px;
                    cursor: pointer;
                    font-size: 14px;
                    color: #5e6d82;
                    font-weight: 400;
                  }
                  i {
                    margin-left: 12px;
                    font-size: 12px;
                    color: #778ca2;
                    position: relative;
                  }
                }
              }
            }
            .filter-box {
              display: flex;
              margin-bottom: 8px;
              span.word {
                width: 140px;
                min-width: 52px;
                height: 32px;
                line-height: 32px;
                margin-top: 2px;
                text-align: right;
                align-self: flex-start;
                color: #5e6d82;
                font-size: 13px;
              }
              .ant-card {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                font-variant: tabular-nums;
                line-height: 1.5;
                list-style: none;
                font-feature-settings: "tnum";
                position: relative;
                border-radius: 2px;
                transition: all 0.3s;
                background: #fff;
                color: #475669;
                font-size: 13px;
                &-body {
                  display: flex;
                  padding: 0 0 0 18px !important;
                  margin: 20px 10px;
                  border-left: 2px solid #6fd2b2;
                  zoom: 1;
                  margin-top: 2px;
                  margin-bottom: 2px;
                  &::before {
                    display: table;
                    content: "";
                  }
                  &::after {
                    clear: both;
                  }
                  .ant-row {
                    position: relative;
                    height: auto;
                    margin-right: 0;
                    margin-left: 0;
                    zoom: 1;
                    display: block;
                    box-sizing: border-box;
                    &::before {
                      display: table;
                      content: "";
                    }
                    &.conditions {
                      display: flex;
                      flex-direction: column;
                    }
                    &.item {
                      display: flex;
                      flex-wrap: wrap;
                      margin-bottom: 8px;
                      align-items: flex-start;
                    }
                  }
                  // .relation {
                  //   display: flex;
                  //   flex-direction: column;
                  //   justify-content: center;
                  //   .topline {
                  //     border-top: 1px solid #d3dce6;
                  //     margin-bottom: 15px;
                  //     top: 15px;
                  //   }
                  //   .line {
                  //     width: 100%;
                  //     margin-left: 16px;
                  //     border-left: 1px solid #d3dce6;
                  //     border-radius: 1px;
                  //     position: relative;
                  //     flex-grow: 2;
                  //   }
                  //   .ant-btn {
                  //     width: 32px;
                  //     height: 32px;
                  //     padding: 0;
                  //     margin-right: 12px;
                  //     background: #fff;
                  //     & > span {
                  //       display: inline-block;
                  //       pointer-events: none;
                  //     }
                  //   }
                  //   .bottomline {
                  //     border-bottom: 1px solid #d3dce6;
                  //     margin-top: 15px;
                  //     bottom: 15px;
                  //   }
                  // }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
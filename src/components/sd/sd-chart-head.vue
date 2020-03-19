<template>
  <div class="chart-head">
    <div class="time-picker">
      <el-button type="primary" @click="$emit('compare')">对比</el-button>
      <el-button type="primary" @click="$emit('reset')">复原</el-button>
    </div>
    <div class="chart-name">{{title}}</div>
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
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style>
</style>
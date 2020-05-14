<template>
  <span class="rule" @click="$emit('click')">{{status ? '且' : '或'}}</span>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    status: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<template>
    <selector :data="list" v-model="selectedIds" />
</template>

<script>
import Selector from "@/components/selector/index";
export default {
    name: "demo",
    components: { Selector },
    data() {
        return {
            list: [{label: '王二', value: '1'}, {label: '张三', value: '2'}, {label: '李四', value: '3'}],
            selectedIds: []
        }
    }
}
</script>

<style scoped>

</style>

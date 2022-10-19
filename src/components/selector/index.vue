<template>
    <div class="wrapper">
        <ul>
            <li
                v-for="(item, index) in list"
                :key="index"
                @click="handleChangeAll(item)"
                :class="{active: currentValue.includes(item.value)}"
            >{{ item.label }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Selector",
    props: ['data', 'value'],
    computed: {
        currentValue: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            }
        },
        list() {
            return [{ label: '全部', value: '' }].concat(this.data);
        },
        selectedAll() {
            return this.currentValue.includes('');
        }
    },
    methods: {
        handleChangeAll(item) {
            if (item.label === '全部') {
                this.currentValue = this.selectedAll ? [] : [''];
            } else {
                if (this.currentValue.includes(item.value)) {
                    this.currentValue = this.currentValue.filter(i => i !== item.value);
                } else {
                    this.currentValue.push(item.value);
                }

                if (this.selectedAll) {
                    this.currentValue = [item.value];
                }

                if (this.currentValue.length === this.data.length) {
                    this.currentValue = [''];
                }
            }

        }
    }
}
</script>

<style lang="less" scoped>
.wrapper {
    width: 800px;
    margin: 0 auto;
    padding-top: 40px;

    ul {
        display: flex;
        justify-content: space-around;

        li {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 80px;
            height: 40px;
            border: 1px solid black;

            &.active {
                border-color: red;
            }
        }
    }
}
</style>

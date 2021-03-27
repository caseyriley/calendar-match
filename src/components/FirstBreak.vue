<template>
    <div class="break" v-if="bool" :style="curHeight">
        <span>Break</span>
        <span>
            {{ minToMilStart }} -
            {{ minutesToMilitary(end ? end : endTime) }}
        </span>
        <span> {{ endTime }}</span>
    </div>
</template>

<script>
export default {
    name: 'FirstBreak',
    props: ['start', 'end'],
    data() {
        return {
            bool: this.start < this.end,
            calcStart: null,
            curStart: this.calcStart ? this.calcStart : this.start,
        };
    },
    methods: {
        minutesToMilitary(num) {
            let h = Math.floor(num / 60);
            let m = num % 60;
            if (m < 10) {
                //if a zero is needed for military time
                let f = '0';
                m = f + `${m}`;
            }
            return `${h}:${m}`;
        },
    },
    computed: {
        minToMilStart: function () {
            let minToMStart = this.minutesToMilitary(this.start);
            return minToMStart;
        },
        curHeight: function () {
            return {height: `${(((this.end ? this.end : this.endTime) - this.start) /1140) * 800}px`};
        },
    },
};
</script>

<style lang="scss" scoped>
@import './../styles/_variables.scss';
.break {
    width: 100%;
    background-color: $color-5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    box-sizing: border-box;
    // border: 5px solid $color-6;
    border-top: none;
}
</style>

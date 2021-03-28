<template>
    <div class="break" v-if="bool" :style="curHeight">
        <span>Break</span>
        <span>
            {{ minToMilStart }} -
            {{ minutesToMilitary(breakEnd ? breakEnd : endTime) }}
        </span>
        <span> {{ endTime }}</span>
    </div>
</template>

<script>
export default {
    name: 'FirstBreak',
    props: ['startTime', 'breakEnd'],
    data() {
        return {
            bool: this.startTime < this.breakEnd,
            calcStart: null,
            curStart: this.calcStart ? this.calcStart : this.startTime,
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
            let minToMStart = this.minutesToMilitary(this.startTime);
            return minToMStart;
        },
        curHeight: function () {
            return {
                height: `${
                    (((this.breakEnd ? this.breakEnd : this.endTime) -
                        this.startTime) /
                        1140) *
                    800
                }px`,
            };
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
    border: 2px solid grey;
    border-radius: 5px;
}
</style>

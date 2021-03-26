<template>
    <div class="break" v-if="bool" :style="{ height }">
        <span>Break</span>
        <span
            >{{ minutesToMilitary(start) }} - {{
                minutesToMilitary(end ? end : endTime)
            }}</span
        >
        <span> {{endTime}}</span>
    </div>
</template>

<script>
export default {
    name: 'FirstBreak',
    props: ['start', 'end'],
    data() {
        return {
            height: `calc(${
                (((this.end ? this.end : this.endTime) - this.start) / 1140) * 800
            }px)`,
            bool: this.start < this.end,
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
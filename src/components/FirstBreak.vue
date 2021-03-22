<template>
    <div class="break" v-if="bool" :style="{ width }">
        <span>{{ start }}/{{ end }}</span>
        <span
            >{{ minutesToMilitary(start) }}/{{
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
            width: `calc(${
                (((this.end ? this.end : this.endTime) - this.start) / 1140) * 100
            }% - 10px)`,
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
    height: 50px;
    background-color: $color-5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    box-sizing: border-box;
    border: 5px solid $color-6;
    border-left: none;
}
</style>
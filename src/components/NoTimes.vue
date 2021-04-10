<template>
    <div class="no-times" v-if="bool['b']" :style="curHeight">
        <span>No Times</span>
        <span
            >{{ minutesToMilitary(start) }} -
            {{ end ? minutesToMilitary(end) : '24:00' }}</span
        >
    </div>
</template>

<script>
export default {
    name: 'NoTimes',
    props: ['start', 'end'],
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
        militaryToMinutes(string) {
            console.log('string NoTimes', string);
            let h = Number(string.match(/[^:]+/)); //match first 1 or 2 numbers
            let m = Number(string.match(/(?<=:)../)); //match last 2 numbers
            return h * 60 + m;
        },
    },
    computed: {
        bool: function () {
            let b = this.start < this.end ? true : false;
            return {
                b
            };
        },
        curHeight: function () {
            return {
                height: `${
                    ((this.end  -
                        this.start) /
                        1440) *
                    800
                }px`,
            };
        },
    },
}
</script>

<style lang="scss" scoped>
@import './../styles/_variables.scss';
.no-times {
    width: 100%;
    background-color: $color-7;
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

<template>
    <div class="break" v-if="bool" :style="curHeight">
        <span>Break</span>
        <span
            >{{ minutesToMilitary(start) }} -
            {{ end ? minutesToMilitary(end) : minutesToMilitary(endTime) }}</span
        >
    </div>
</template>

<script>
export default {
    name: 'Break',
    props: ['start', 'end', 'endTime'],
    data() {
        return {
            // height: `calc(${
            //     (((this.end ? this.end : militaryToMinutes(this.endTime)) - this.start) /
            //         1140) *
            //     800
            // }px)`,
            bool:
                this.start < this.end ||
                this.start < this.endTime
                    ? true
                    : false,
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
        militaryToMinutes(string) {
            console.log('string FirstBreak', string);
            let h = Number(string.match(/[^:]+/)); //match first 1 or 2 numbers
            let m = Number(string.match(/(?<=:)../)); //match last 2 numbers
            return h * 60 + m;
        },
    },
    computed: {
        curHeight: function () {
            return {
                height: `calc(${
                    (((this.end ? this.end : this.endTime) -
                        this.start) /
                        1140) *
                    800
                }px)`,
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

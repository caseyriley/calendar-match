<template>
    <div class="end" :style="curHeight">
        <span class="end__text">End Time</span>
        <span> {{ minutesToStandardTime(endTime) }} </span>
    </div>
</template>

<script>
export default {
    name: 'End',
    props: ['endTime'],
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
            console.log('string End', string);
            let h = Number(string.match(/[^:]+/)); //match first 1 or 2 numbers
            let m = Number(string.match(/(?<=:)../)); //match last 2 numbers
            return h * 60 + m;
        },
        minutesToStandardTime(mins) {
            let amPm = 'am';
            let h = Math.floor(mins / 60);
            if (h > 12) {
                h -= 12;
                amPm = 'pm';
            } else if (h === 0) {
                h = 12;
            } else if (h === 12) {
                amPm = 'pm';
            }
            let m = mins % 60;
            m = m < 10 ? '0' + m : m;
            return `${h}:${m} ${amPm}`;
        },
    },
    computed: {
        curHeight: function () {
            return {
                height: `${((1440 - this.endTime) / 1440) * 1000}px`,
                fontSize: `${this.fontS['s']}px`,
            };
        },
        fontS: function () {
            let s = null;
            let h = ((1440 - this.endTime) / 1440) * 1000;
            if (h > 100) {
                s = 15;
            } else if (h > 80) {
                s = 14;
            } else if (h > 60) {
                s = 13;
            } else if (h > 40) {
                s = 12;
            } else if (h > 20) {
                s = 11;
            } else if (h > 10) {
                s = 9;
            } else {
                s = 7;
            }

            return {
                s,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
@import './../styles/_variables.scss';
.end {
    width: 100%;
    background-color: $color-4;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid grey;
    border-radius: 5px;
    overflow: scroll;
    font-family: 'Noto Sans JP', sans-serif;
    .end__text {
        margin: 0px 3px 0px 0px;
    }
}
.end span {
    // margin: 5px 5px 5px 5px;
    white-space: nowrap;
}
@media screen and (max-width: 420px) {
    .end {
        background-color: lightgray;
    }
}
@media screen and (max-width: 555px) {
    .end {
        font-size: 10px !important;
    }
}
</style>

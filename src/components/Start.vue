<template>
    <div class="start" :style="curHeight">
        <span class="start__text">Start Time </span>
        <span> {{ minutesToStandardTime(startTime) }} </span>
    </div>
</template>

<script>
export default {
    name: 'Start',
    props: ['startTime'],
    data() {
        return {
            height: `calc(${(this.startTime / 1440) * 1000}px)`,
            parentHeight: 0,
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
                height: `calc(${(this.startTime / 1440) * 1000}px)`,
                fontSize: `${this.fontS['s']}px`,
            };
        },
        fontS: function () {
            let s = null;
            let h = (this.startTime / 1440) * 1000;
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
.start {
    width: 100%;
    background-color: $color-4;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    box-sizing: border-box;
    border: 1px solid grey;
    border-bottom: none;
    border-radius: 5px;
    font-family: 'Noto Sans JP', sans-serif;
    .start__text {
        margin: 0px 3px 0px 0px;
    }
}
.start span {
    white-space: nowrap;
}
@media screen and (max-width: 555px) {
    .start {
        font-size: 10px !important;
    }
}
</style>

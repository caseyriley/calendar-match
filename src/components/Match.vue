<template>
    <div class="match" :style="curHeight">
        <span role="img" aria-label="star" class="match__text">⭐️</span>
        <span
            >{{ appStartStandard['start'] }} -
            {{ appEndStandard['end'] }}</span
        >
    </div>
    <no-times
        v-if="appEndMin['end'] < timesArray[timesArray.length - 1][1]"
        :start="appEndMin['end']"
        :end="appNextStart['start'] ? appNextStart['start'] : endTime"
    />
</template>

<script>
import NoTimes from '@/components/NoTimes.vue';
export default {
    name: 'Match',
    components: {
        NoTimes,
    },
    props: ['index', 'timesArray', 'endTime'],
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
            console.log('string Appointment', string);
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
            // h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            return `${h}:${m} ${amPm}`;
        },
    },
    computed: {
        curHeight: function () {
            return {
                height: `${
                    ((this.appEndMin['end'] -
                        this.appStartMin['start']) /
                        1440) *
                    1000
                }px`,
                fontSize: `${this.fontS['s']}px`
            };
        },
        appStartMin: function () {
            const start = this.timesArray[this.index]
                ? this.timesArray[this.index][0]
                : null;
            return {
                start,
            };
        },
        appStartStandard: function () {
            const start = this.timesArray[this.index]
                ? this.minutesToStandardTime(
                      this.timesArray[this.index][0]
                  )
                : null;
            return {
                start,
            };
        },
        appEndMin: function () {
            const end = this.timesArray[this.index]
                ? this.timesArray[this.index][1]
                : null;
            return {
                end,
            };
        },
        appEndStandard: function () {
            const end = this.timesArray[this.index]
                ? this.minutesToStandardTime(
                      this.timesArray[this.index][1]
                  )
                : null;
            return {
                end,
            };
        },
        appNextStart: function () {
            const start = this.timesArray[this.index + 1]
                ? this.timesArray[this.index + 1][0]
                : null;
            return {
                start,
            };
        },
        fontS: function () {
            let s = null;
            let h =
                ((this.appEndMin['end'] - this.appStartMin['start']) /
                    1440) *
                1000;
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
.match {
    width: 100%;

    background-color: $color-9;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    box-sizing: border-box;
    border: 1px solid grey;
    border-radius: 5px;
    .match__text {
        margin: 0px 3px 0px 0px;
    }
}
</style>

<template>
    <div class="timeline__app" :style="curHeight" v-bind="$attrs">
        <span class="busy">Busy</span>
        <span
            >{{ appStartStandard['start'] }} -
            {{ appEndStandard['end'] }}</span
        >
        <div class="delete-app" @click="del" :style="curDelHeight">
            <div />
            <div />
        </div>
    </div>
    <break
        :start="appEndMin['end']"
        :end="appNextStart['start']"
        :endTime="endTime"
    ></break>
</template>

<script>
import Break from '@/components/Break.vue';
// import Break from './Break.vue';
export default {
    name: 'Appointment',
    props: ['key', 'index', 'calendar', 'calNum', 'endTime'],
    components: { Break },
    data() {
        return {
            cal: [...this.calendar],
        };
    },
    methods: {
        del() {
            this.$emit('delete-app', {
                index: this.index,
                calNum: this.calNum,
            });
        },
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
                fontSize: `${this.fontS['s']}px`,
            };
        },
        curDelHeight: function () {
            let h =
                ((this.appEndMin['end'] - this.appStartMin['start']) /
                    1440) *
                1000;
            let s = null;
            if (h > 11) {
                s = 12;
            } else {
                s = 6;
            }
            return {
                height: `${s}px`,
                width: `${s}px`,
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
        appStartMin: function () {
            const start = this.calendar[this.index]
                ? this.calendar[this.index][0]
                : null;
            return {
                start,
            };
        },
        appStartStandard: function () {
            const start = this.calendar[this.index]
                ? this.minutesToStandardTime(
                      this.calendar[this.index][0]
                  )
                : null;
            return {
                start,
            };
        },
        appEndMin: function () {
            const end = this.calendar[this.index]
                ? this.calendar[this.index][1]
                : null;
            return {
                end,
            };
        },
        appEndStandard: function () {
            const end = this.calendar[this.index]
                ? this.minutesToStandardTime(
                      this.calendar[this.index][1]
                  )
                : null;
            return {
                end,
            };
        },
        appNextStart: function () {
            const start = this.calendar[this.index + 1]
                ? this.calendar[this.index + 1][0]
                : null;
            return {
                start,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
@import './../styles/_variables.scss';
.busy {
    margin: 0px 3px 0px 0px;
}
.timeline__app {
    width: 100%;
    background-color: $color-2;
    display: flex;
    // flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    box-sizing: border-box;
    border: 1px solid grey;
    border-radius: 5px;
    font-family: 'Noto Sans JP', sans-serif;
    position: relative;
    .delete-app {
        height: 12px;
        width: 12px;
        background-color: $color-7;
        border: 1px solid grey;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 1px;
        right: 1px;
    }

    .delete-app :nth-child(1) {
        width: 8px;
        background-color: grey;
        border: 1px solid grey;
        transform: rotate(45deg);
        position: absolute;
    }
    .delete-app :nth-child(2) {
        width: 8px;
        background-color: grey;
        border: 1px solid grey;
        transform: rotate(-45deg);
        position: absolute;
    }
}
.delete-app:hover {
    background-color: powderblue;
    border: 1px solid rgb(93, 93, 93);
    cursor: pointer;
}
@media screen and (max-width: 420px) {
    .busy {
        display: none;
    }
    .timeline__app {
        background-color: lightgray;
    }
}
@media screen and (max-width: 555px) {
    .timeline__app {
        font-size: 10px !important;
    }
}
</style>

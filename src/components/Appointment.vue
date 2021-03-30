<template>
    <div class="timeline__app" :style="curHeight">
        <span>Busy</span>
        <span>{{ appStartMin['start'] }}-{{ appEndMil['end'] }}</span>
    </div>
    <Break
        :start="appEndMin['end']"
        :end="appNextStart['start']"
        :endTime="endTime"
    ></Break>
</template>

<script>
// import Break from '@/components/Break.vue';
import Break from './Break.vue';
export default {
    name: 'Appointment',
    // props: ['appStart', 'appEnd', 'appNextStart', 'endTime'],
    props: ['key', 'index', 'calendar', 'endTime'],
    components: { Break },
    data() {
        return {
            // width: `calc(${((this.appEnd - this.appStart) / 1140) * 100}% - 10px)`,
            // appEnd: this.calendar[this.index] ? this.militaryToMinutes(this.calendar[this.index][1]) : null,
            // appStart: this.calendar[this.index] ? this.militaryToMinutes(this.calendar[this.index][0]) : null,
            // appNextStart: this.calendar[this.index + 1] ? this.militaryToMinutes(this.calendar[this.index + 1][0]) : null,
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
            console.log('string', string);
            let h = Number(string.match(/[^:]+/)); //match first 1 or 2 numbers
            let m = Number(string.match(/(?<=:)../)); //match last 2 numbers
            return h * 60 + m;
        },
    },
    computed: {
        curHeight: function () {
            return {
                height: `calc(${
                    ((this.appEndMin['end'] - this.appStart['start']) / 1140) * 800
                }px)`,
            };
        },
        appStart: function () {
            const start = this.calendar[this.index]
                ? this.militaryToMinutes(this.calendar[this.index][0])
                : null;
            return {
                start,
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
        appEndMin: function () {
            const end = this.calendar[this.index]
                ? this.militaryToMinutes(this.calendar[this.index][1])
                : null;
            return {
                end,
            };
        },
        appEndMil: function () {
            const end = this.calendar[this.index]
                ? this.calendar[this.index][1]
                : null;
            return {
                end,
            };
        },
        appNextStart: function () {
            const start = this.calendar[this.index + 1]
                ? this.militaryToMinutes(
                      this.calendar[this.index + 1][0]
                  )
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
.timeline__app {
    width: 100%;

    background-color: $color-2;
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

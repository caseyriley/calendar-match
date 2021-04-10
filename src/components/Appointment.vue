<template>
    <div class="timeline__app" :style="curHeight" v-bind="$attrs">
        <span>Busy</span>
        <span>{{ appStartMil['start'] }}-{{ appEndMil['end'] }}</span>

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
    // props: ['appStart', 'appEnd', 'appNextStart', 'endTime'],
    props: ['key', 'index', 'calendar', 'endTime'],
    components: { Break },
    data() {
        return {
            cal: [...this.calendar],
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
            console.log('string Appointment', string);
            let h = Number(string.match(/[^:]+/)); //match first 1 or 2 numbers
            let m = Number(string.match(/(?<=:)../)); //match last 2 numbers
            return h * 60 + m;
        },
    },
    computed: {
        curHeight: function () {
            return {
                height: `${
                    ((this.appEndMin['end'] -
                        this.appStartMin['start']) /
                        1440) *
                    800
                }px`,
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
        appStartMil: function () {
            const start = this.calendar[this.index]
                ? this.minutesToMilitary(this.calendar[this.index][0])
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
        appEndMil: function () {
            const end = this.calendar[this.index]
                ? this.minutesToMilitary(this.calendar[this.index][1])
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
.timeline__app {
    width: 100%;

    background-color: $color-2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    box-sizing: border-box;
    border: 1px solid grey;
    border-radius: 5px;
}
</style>

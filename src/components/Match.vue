<template>
    <div class="match" :style="curHeight">
        <span>Available Time</span>
        <span>{{index}}</span>
    </div>
</template>

<script>
// import NoTimes from '@/components/NoTimes.vue';
export default {
    name: 'Match',
    components: {
        // NoTimes
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
    },
    computed: {
        curHeight: function () {
            return {
                height: `${
                    (this.appEndMin['end'] -
                        this.appStartMin['start']) / 1140 *
                    800
                }px`,
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
        appStartMil: function () {
            const start = this.timesArray[this.index]
                ? this.minutesToMilitary(
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
        appEndMil: function () {
            const end = this.timesArray[this.index]
                ? this.minutesToMilitary(
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
    },
};
</script>

<style lang="scss" scoped>
@import './../styles/_variables.scss';
.match {
    width: 100%;

    background-color: $color-9;
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

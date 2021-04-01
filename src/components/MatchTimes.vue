<template>
    <div class="app-times" v-if="true">
        <span class="name">Available Times</span>
    </div>
</template>

<script>
export default {
    name: 'MatchTimes',
    props: [
        'meetingDuration',
        'dailyBoundsOne',
        'dailyBoundsTwo',
        'calendarOne',
        'calendarTwo',
    ],
    methods: {
        militaryToMinutes(string) {
            console.log('string', string);
            let h = Number(string.match(/[^:]+/)); //match first 1 or 2 numbers
            let m = Number(string.match(/(?<=:)../)); //match last 2 numbers
            return h * 60 + m;
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
    },
    computed: {
        calMatch: function () {
            const cal = '';
            return cal;
        },
    },
};
</script>

<style lang="scss" scoped>
@import './../styles/_variables.scss';
.app-times {
    width: 200px;
    height: 823px;
    border-radius: 5px;
    background-color: $color-6;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
}
.name {
    height: 20px;
    color: white;
    font-family: 'Russo One', sans-serif;
    display: flex;
    align-items: center;
    margin: 3px 0px 0px 0px;
}
</style>

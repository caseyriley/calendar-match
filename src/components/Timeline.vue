<template>
    <div class="timeline" v-if="calendar.length">
        <span class="name" data-test="timeline-name">{{ name }}</span>
        <start v-if="startTime" :startTime="startTime"></start>
        <first-break
            v-if="startTime < calendar[0][0]"
            :startTime="startTime"
            :breakEnd="breakEnd"
        ></first-break>
        <appointment
            v-for="(app, index) in calendar"
            :key="index"
            :index="index"
            :calendar="calendar"
            :endTime="endTime"
            :calNum="calNum"
            @delete-app="del"
        >
        </appointment>

        <end v-if="endTime" :endTime="endTime"></end>
        <div />
    </div>
</template>

<script>
import Appointment from '@/components/Appointment.vue';
import Start from '@/components/Start.vue';
import End from '@/components/End.vue';
import FirstBreak from '@/components/FirstBreak.vue';
export default {
    name: 'Timeline',
    components: { Appointment, Start, End, FirstBreak },
    props: [
        'name',
        'startTime',
        'breakEnd',
        'endTime',
        'calendar',
        'calNum',
    ],
    methods: {
        militaryToMinutes(string) {
            console.log('string Timeline', string);
            let h = Number(string.match(/[^:]+/)); //match first 1 or 2 numbers
            let m = Number(string.match(/(?<=:)../)); //match last 2 numbers
            return h * 60 + m;
        },
        del({ calNum, index }) {
            this.$emit('delete-app', {
                index: index,
                calNum: calNum,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import './../styles/_variables.scss';
.timeline {
    max-width: 200px;
    min-width: 93px;
    width: 33%;
    height: 1000px;
    border-radius: 5px;
    background-color: $color-6;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    // margin: 0px 0px 500px 0px;
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

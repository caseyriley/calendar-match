<template>
    <div class="timeline">
        <span class="name">{{name}}</span >
        <Start v-if="startTime" :startTime="startTime"></Start>
        <FirstBreak
            v-if="calendar.length"
            :startTime="startTime"
            :breakEnd="breakEnd"
        ></FirstBreak>
        <Appointment
            v-for="(app, index) in calendar"
            :key="index"
            :appStart="
                calendar.length
                    ? militaryToMinutes(calendar[index][0])
                    : null
            "
            :appEnd="
                calendar.length
                    ? militaryToMinutes(calendar[index][1])
                    : null
            "
            :appNextStart="
                calendar[index + 1]
                    ? militaryToMinutes(calendar [index + 1][0])
                    : null
            "
            :endTime="endTime"
        >
        </Appointment>
        <End v-if="endTime" :endTime="endTime"></End>
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
        'appStart',
        'appEnd',
        'appNextStart',
        'calendar',
    ],
    methods: {
        militaryToMinutes(string) {
            console.log('string', string)
            let h = Number(string.match(/[^:]+/)); //match first 1 or 2 numbers
            let m = Number(string.match(/(?<=:)../)); //match last 2 numbers
            return h * 60 + m;
        },
    },
};
</script>

<style lang="scss" scoped>
@import './../styles/_variables.scss';
.timeline {
    width: 200px;
    height: 823px;
    height: auto;
    // border: 2px solid $color-1;
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

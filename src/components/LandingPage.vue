<template>
    <h1>Find all available appointment times</h1>
    <h2>{{ name1 }}</h2>
    <label>
        What is person one's name?
        <input v-model="name1" />
    </label>
    <label>
        When does
        {{ name1 === null || name1 === '' ? 'person one' : name1 }}
        begin thier day?
        <input v-model="startTime1" type="time" />
    </label>
    <label>
        When does
        {{ name1 === null || name1 === '' ? 'person one' : name1 }}
        end thier day?
        <input v-model="endTime1" type="time" />
    </label>

    <div class="timeline">
        <Start :time="militaryToMinutes(startTime1)"></Start>
        <FirstBreak
            :start="militaryToMinutes(startTime1)"
            :end="militaryToMinutes(calendar1[0][0])"
        ></FirstBreak>
        <Appointment
            v-for="(app, index) in calendar1"
            :key="index"
            :appStart="militaryToMinutes(calendar1[index][0])"
            :appEnd="militaryToMinutes(calendar1[index][1])"
            :appNextStart="
                calendar1[index + 1]
                    ? militaryToMinutes(calendar1[index + 1][0])
                    : null
            "
            :endTime="militaryToMinutes(endTime1)"
        >
        </Appointment>
        <End :time="militaryToMinutes(endTime1)"></End>
    </div>

    <h2>{{ name2 }}</h2>

    <label>
        What is person two's name?
        <input v-model="name2" />
    </label>
</template>

<script>
import Appointment from '@/components/Appointment.vue';
import Start from '@/components/Start.vue';
import End from '@/components/End.vue';
import FirstBreak from '@/components/FirstBreak.vue';
export default {
    name: 'LandingPage',
    components: { Appointment, Start, End, FirstBreak },
    data() {
        return {
            name1: null,
            name2: null,
            startTime1: '6:00',
            startTime2: null,
            endTime1: '20:30',
            endTime2: null,
            calendar1: [
                ['9:00', '10:30'],
                ['12:00', '13:00'],
                ['16:00', '18:00'],
            ],
            calendar2: [],
        };
    },
    methods: {
        militaryToMinutes(string) {
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
    height: 60vh;
    border: 2px solid $color-1;
    border-radius: 5px;
    background-color: $color-6;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;

}

</style>

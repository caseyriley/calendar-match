<template>
    <h1>Find all available appointment times</h1>
    <div class="person-toggle">
        <div class="person-toggle__1" v-on:click="togglePerson1">Person 1</div>
        <div class="person-toggle__divider"></div>
        <div class="person-toggle__2" v-on:click="togglePerson2">Person 2</div>
    </div>
    <div class="userForm" v-if="personToggle">
        <h2>{{ name1 }}</h2>
        <label>
            What is person one's name?
            <input v-model="name1" />
        </label>
        <label>
            When does
            {{
                name1 === null || name1 === '' ? 'person one' : name1
            }}
            begin thier day?
            <input v-model="startTime1" type="time" />
        </label>
        <label>
            When does
            {{
                name1 === null || name1 === '' ? 'person one' : name1
            }}
            end thier day?
            <input v-model="endTime1" type="time" />
        </label>
        <h2>
            Enter
            {{
                name1 === null || name1 === '' ? 'person one' : name1
            }}'s appointment #{{ calendar1.length + 1 }} times and
            click submit, or enter
            {{
                name2 === null || name2 === '' ? 'person two' : name2
            }}'s information
        </h2>
        <label>
            Appointment start time
            <input v-model="appStart" type="time" />
        </label>
        <label>
            Appointment end time
            <input v-model="appEnd" type="time" />
        </label>
        <submit class="app-submit" v-on:click="addApp">Submit</submit>
    </div>

    <div class="timeline-c">
        <div class="timeline">
            <Start
                v-if="startTime1"
                :time="militaryToMinutes(startTime1)"
            ></Start>
            <FirstBreak
                v-if="calendar1.length"
                :start="militaryToMinutes(startTime1)"
                :end="
                    calendar1.length
                        ? militaryToMinutes(calendar1[0][0])
                        : null
                "
            ></FirstBreak>
            <Appointment
                v-for="(app, index) in calendar1"
                :key="index"
                :appStart="
                    calendar1.length
                        ? militaryToMinutes(calendar1[index][0])
                        : null
                "
                :appEnd="
                    calendar1.length
                        ? militaryToMinutes(calendar1[index][1])
                        : null
                "
                :appNextStart="
                    calendar1[index + 1]
                        ? militaryToMinutes(calendar1[index + 1][0])
                        : null
                "
                :endTime="militaryToMinutes(endTime1)"
            >
            </Appointment>
            <End
                v-if="endTime1"
                :time="militaryToMinutes(endTime1)"
            ></End>
        </div>

        <!--    <div class="timeline">
            <Start :time="militaryToMinutes(startTime1)"></Start>
            <FirstBreak
                :start="militaryToMinutes(startTime1)"
                :end="calendar1.length ? militaryToMinutes(calendar1[0][0]) : null"
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
        </div> -->
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
            startTime1: null,
            startTime2: null,
            endTime1: null,
            1: null,
            calendar1: [
                // ['9:00', '10:30'],
                // ['12:00', '13:00'],
                // ['16:00', '18:00'],
            ],
            calendar2: [],
            appStart: null,
            appEnd: null,
            personToggle: true,
        };
    },
    methods: {
        militaryToMinutes(string) {
            let h = Number(string.match(/[^:]+/)); //match first 1 or 2 numbers
            let m = Number(string.match(/(?<=:)../)); //match last 2 numbers
            return h * 60 + m;
        },
        addApp() {
            this.calendar1.push([this.appStart, this.appEnd]);
            console.log('calendar1======>', this.calendar1);
        },
        togglePerson1() {
            this.personToggle = true;
        },
        togglePerson2() {
            this.personToggle = false;
        },
    },
};
</script>
<style lang="scss" scoped>
@import './../styles/_variables.scss';
h1,
h2 {
    font-family: 'Russo One', sans-serif;
    margin: 20px 20px 20px 20px;
    text-align: center;
    color: rgb(000, 222, 222);
}
.timeline-c {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin: 20px 0px 20px 0px;
}
.timeline {
    width: 200px;
    height: 800px;
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
.person-toggle {
    width: 250px;
    height: 40px;
    border-radius: 999px;
    border: 1px solid $color-1;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    overflow: hidden;
}
.person-toggle__1 {
    background-color: $color-5;
}
.person-toggle__2 {
    background-color: rgb(209, 209, 242);
}
.person-toggle__1,
.person-toggle__2 {
    height: 40px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.person-toggle__divider {
    height: 40px;
    border-right: 1px solid $color-1;
}
.userForm {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
label {
    color: grey;
    font-family: 'Russo One', sans-serif;
    font-family: 'Sarabun', sans-serif;
    font-weight: 600;
    font-size: 20px;
}
input {
    border: 1px solid grey;
    border-radius: 5px;
    color: grey;
}
input:focus {
    outline: none;
    background-color: lavender;
    border: 1px solid $color-2;
}
.app-submit {
    border: 1px solid grey;
    min-height: 30px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Russo One', sans-serif;
    border-radius: 999px;
    background-color: lightgrey;
    transition: all 0.3s;
}
.app-submit:hover {
    color: white;
    background-color: grey;
    border: 1px solid white;
}
</style>

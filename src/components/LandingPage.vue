<template>
    <div class="home__scroll">
        <h1>Find all available appointment times</h1>
        <div class="person-toggle">
            <div class="person-toggle__1" v-on:click="togglePerson1">
                Person 1
            </div>
            <div class="person-toggle__divider"></div>
            <div class="person-toggle__2" v-on:click="togglePerson2">
                Person 2
            </div>
        </div>
        <!-- Person 1's Form -->
        <div class="userForm" v-if="personToggle">
            <h2>{{ name1 }}</h2>
            <label>
                What is person one's name?
                <input v-model="name1" />
            </label>
            <label>
                When does
                {{
                    name1 === null || name1 === ''
                        ? 'person one'
                        : name1
                }}
                begin thier day?
                <input v-model="startTime1" type="time" />
            </label>
            <label>
                When does
                {{
                    name1 === null || name1 === ''
                        ? 'person one'
                        : name1
                }}
                end thier day?
                <input v-model="endTime1" type="time" />
            </label>
            <h2>
                Enter
                {{
                    name1 === null || name1 === ''
                        ? 'person one'
                        : name1
                }}'s appointment #{{ calendar1.length + 1 }} times and
                click submit, or enter
                {{
                    name2 === null || name2 === ''
                        ? 'person two'
                        : name2
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
            <submit class="app-submit" v-on:click="addApp1"
                >Submit</submit
            >
        </div>
        <!-- Person 2's Form -->
        <!-- <div class="userForm" v-if="!personToggle">
            <h2>{{ name2 }}</h2>
            <label>
                What is person two's name?
                <input v-model="name2" />
            </label>
            <label>
                When does
                {{
                    name2 === null || name2 === ''
                        ? 'person one'
                        : name2
                }}
                begin thier day?
                <input v-model="startTime2" type="time" />
            </label>
            <label>
                When does
                {{
                    name2 === null || name2 === ''
                        ? 'person one'
                        : name2
                }}
                end thier day?
                <input v-model="endTime2" type="time" />
            </label>
            <h2>
                Enter
                {{
                    name2 === null || name2 === ''
                        ? 'person two'
                        : name2
                }}'s appointment #{{ calendar1.length + 1 }} times and
                click submit, or enter
                {{
                    name2 === null || name2 === ''
                        ? 'person two'
                        : name2
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
            <submit class="app-submit" v-on:click="addApp2"
                >Submit</submit
            >
        </div> -->

        <div class="timeline-c">
            <Timeline
                v-if="startTime1"
                :name="
                    name1 === null || name1 === ''
                        ? 'person one'
                        : name1
                "
                :startTime="
                    startTime1
                        ? militaryToMinutes(startTime1)
                        : '00:00'
                "
                :breakEnd="
                    calendar1.length
                        ? militaryToMinutes(calendar1[0][0])
                        : null
                "
                :endTime="endTime1"
                :calendar="calendar1"
            >
            </Timeline>

            <!-- <Timeline
                v-if="startTime2"
                :name="
                    name1 === null || name1 === ''
                        ? 'person two'
                        : name2
                "
                :startTime="militaryToMinutes(startTime2)"
                :breakEnd="
                    calendar2.length
                        ? militaryToMinutes(calendar2[0][0])
                        : null
                "
                :endTime="militaryToMinutes(endTime2)"
                :calendar="calendar2"
            >
            </Timeline> -->
        </div>
    </div>
</template>

<script>
import Timeline from './Timeline.vue';
// import Appointment from '@/components/Appointment.vue';
// import Start from '@/components/Start.vue';
// import End from '@/components/End.vue';
// import FirstBreak from '@/components/FirstBreak.vue';
export default {
    name: 'LandingPage',
    components: { Timeline },
    // components: { Appointment, Start, End, FirstBreak },
    data() {
        return {
            name1: null,
            name2: null,
            startTime1: null,
            startTime2: null,
            endTime1: null,
            calendar1: [
                // ['9:00', '10:30'],
                // ['12:00', '13:00'],
                // ['16:00', '18:00'],
            ],
            calendar2: [],
            appStart: null,
            appEnd: '20:00',
            personToggle: true,
        };
    },
    methods: {
        militaryToMinutes(string) {
            console.log('string', string);
            let h = Number(string.match(/[^:]+/)); //match first 1 or 2 numbers
            let m = Number(string.match(/(?<=:)../)); //match last 2 numbers
            return h * 60 + m;
        },
        addApp1() {
            let cal = [];
            let pushed = false;
            if (this.calendar1.length < 1) {
                console.log('calendar1.length < 1');
                this.calendar1.push([this.appStart, this.appEnd]);
            } else {
                for (let i = 0; i < this.calendar1.length; i++) {
                    let app = this.calendar1[i];
                    if (
                        // if current appointment is earlier then new appointment
                        // push current appointment

                        this.militaryToMinutes(app[0]) <
                        this.militaryToMinutes(this.appStart)
                    ) {
                        console.log('if 1');
                        cal.push(app);
                    } else if (
                        // if current appointment start time is later then appointment start time and new appointment has not been pushed
                        this.militaryToMinutes(app[0]) > // cur app start time
                            this.militaryToMinutes(this.appStart) && // new app end time
                        pushed === false // new app has not been pushed
                    ) {
                        console.log('if 2');
                        if (cal.length) {
                            if (
                                //if new appointment start time is less than prev appointment end time
                                this.militaryToMinutes(
                                    // new app start time
                                    this.appStart
                                ) <
                                this.militaryToMinutes(
                                    this.calendar1[i - 1][1]
                                ) //
                            ) {
                                console.log('if 2 A.1');
                                const prev = cal.pop();
                                cal.push([prev[0], this.appEnd]);
                                pushed = true;
                                i--;
                                console.log('if 2 A.1 End');
                            } else { //if new appointment start time is greater than prev appointment end time
                                console.log('if 2 A.2');
                                cal.push([this.appStart, this.appEnd]);
                                pushed = true;
                                i--;
                            }
                        } else {
                            console.log('if 2 B');
                            cal.push([this.appStart, this.appEnd]);
                            pushed = true;
                            i--;
                            console.log('if 2 B end');
                        }
                    } else if (
                        // if current new appointment start time is later then appointment start time and new appointment has been pushed
                        this.militaryToMinutes(app[0]) >
                            this.militaryToMinutes(this.appStart) &&
                        pushed === true
                    ) {
                        console.log('if 3');
                        cal.push(app);
                    }
                }
                if (pushed === false) {
                    console.log('last if');
                    if (cal[cal.length - 1][1] > this.appStart) {
                        console.log('last if A');
                        const prev = cal.pop();
                        cal.push([prev[0], this.appEnd]);
                        pushed = true;
                    } else {
                        console.log('last if B');
                        cal.push([this.appStart, this.appEnd]);
                        pushed = true;
                    }
                }
                this.calendar1 = cal;
            }

            console.log('calendar1======>', this.calendar1);

            this.appStart = null;
            this.appEnd = null;
        },
        addApp2() {
            this.calendar2.push([this.appStart, this.appEnd]);
            console.log('calendar1======>', this.calendar1);
            this.appStart = null;
            this.appEnd = null;
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

.home__scroll {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
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
// .timeline {
//     width: 200px;
//     height: 800px;
//     height: auto;
//     // border: 2px solid $color-1;
//     border-radius: 5px;
//     background-color: $color-6;
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-start;
//     align-items: center;
//     position: relative;
// }
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

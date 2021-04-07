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

        <label class="duration">
            How many minutes long is your appointment going to be?
            <input
                v-model="meetingDuration"
                type="number"
                min="0"
                max="1440"
            />
        </label>
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
                <span v-if="reqStartTime['req']" class="required"
                    >*</span
                >
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
                <span v-if="reqEndTime['req']" class="required"
                    >*</span
                >
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
                <span v-if="reqAppStart['req']" class="required"
                    >*</span
                >
            </label>
            <label>
                Appointment end time
                <input v-model="appEnd" type="time" />
                <span v-if="reqAppEnd['req']" class="required"
                    >*</span
                >
            </label>
            <submit class="app-submit" v-on:click="addApp1"
                >Submit</submit
            >
            <span v-if="required1" class="required"
                >please complete required fields *</span
            >
        </div>
        <!-- Person 2's Form -->
        <div class="userForm" v-if="!personToggle">
            <h2>{{ name2 }}</h2>
            <label>
                What is person two's name?
                <input v-model="name2" />
            </label>
            <label>
                When does
                {{
                    name2 === null || name2 === ''
                        ? 'person two'
                        : name2
                }}
                begin thier day?
                <input v-model="startTime2" type="time" />
                <span v-if="reqStartTime2['req']" class="required"
                    >*</span
                >
            </label>
            <label>
                When does
                {{
                    name2 === null || name2 === ''
                        ? 'person two'
                        : name2
                }}
                end thier day?
                <input v-model="endTime2" type="time" />
                <span v-if="reqEndTime2['req']" class="required"
                    >*</span
                >
            </label>
            <h2>
                Enter
                {{
                    name2 === null || name2 === ''
                        ? 'person two'
                        : name2
                }}'s appointment #{{ calendar2.length + 1 }} times and
                click submit, or enter
                {{
                    name1 === null || name1 === ''
                        ? 'person one'
                        : name1
                }}'s information
            </h2>
            <label>
                Appointment start time
                <input v-model="appStart" type="time" />
                <span v-if="reqAppStart2['req']" class="required"
                    >*</span
                >
            </label>
            <label>
                Appointment end time
                <input v-model="appEnd" type="time" />
                <span v-if="reqAppEnd2['req']" class="required"
                    >*</span
                >
            </label>
            <submit class="app-submit" v-on:click="addApp2"
                >Submit</submit
            >
            <span v-if="required2" class="required"
                >please complete required fields *</span
            >
        </div>
        <!-- --------------------- -->

        <div class="timeline-c">
            <timeline
                v-if="startTime1"
                :name="
                    name1 === null || name1 === ''
                        ? 'person one'
                        : name1
                "
                :startTime="startTimeOneComp['t']"
                :breakEnd="calendar1.length ? calendar1[0][0] : null"
                :endTime="endTime1"
                :calendar="[...calendar2Computed['c']]"
            >
            </timeline>
            <!-- MatchTimes --------- -->
            <match-times
                v-if="
                    calendar1.length &&
                    calendar2.length &&
                    meetingDuration
                "
                :meetingDuration="meetingDuration"
                :startTime1="startTimeOneComp['t']"
                :endTime1="endTime1"
                :startTime2="startTime2"
                :endTime2="endTime2"
                :calendarOne="[...calendar1Computed['c']]"
                :calendarTwo="[...calendar2Computed['c']]"
            >
            </match-times>

            <!-- ---------- --------- -->
            <!-- Timeline 2 --------- -->
            <timeline
                v-if="startTime2"
                :name="
                    name2 === null || name2 === ''
                        ? 'person two'
                        : name2
                "
                :startTime="
                    startTime2
                        ? militaryToMinutes(startTime2)
                        : '00:00'
                "
                :breakEnd="calendar2.length ? calendar2[0][0] : null"
                :endTime="endTime2"
                :calendar="[...calendar1Computed['c']]"
            >
            </timeline>
            <!-- ---------- --------- -->
        </div>
    </div>
</template>

<script>
import Timeline from './Timeline.vue';
import MatchTimes from './MatchTimes.vue';
// import Appointment from '@/components/Appointment.vue';
// import Start from '@/components/Start.vue';
// import End from '@/components/End.vue';
// import FirstBreak from '@/components/FirstBreak.vue';
export default {
    name: 'LandingPage',
    components: { Timeline, MatchTimes },
    // components: { Appointment, Start, End, FirstBreak },
    data() {
        return {
            name1: null,
            name2: null,
            startTime1: null,
            startTime2: null,
            endTime1: null,
            endTime2: null,
            calendar1: [],
            calendar2: [],
            appStart: null,
            appEnd: null,
            personToggle: true,
            required1: false,
            required2: false,
            meetingDuration: null,
        };
    },
    methods: {
        militaryToMinutes(string) {
            console.log('string LandingPage', string);
            let h = Number(string.match(/[^:]+/)); //match first 1 or 2 numbers
            let m = Number(string.match(/(?<=:)../)); //match last 2 numbers
            return h * 60 + m;
        },
        addApp1() {
            console.log(
                'calendar1 at addApp1 start======>',
                this.calendar1
            );
            this.required1 = false;
            if (this.startTime1 > this.endTime1) return;
            if (this.appStart > this.appEnd) return;
            if (this.startTime1 > this.appStart)
                this.appStart = this.startTime1;
            if (this.endTime1 < this.appEnd)
                this.appEnd = this.endTime1;
            5;
            if (
                !this.appStart ||
                !this.appEnd ||
                !this.startTime1 ||
                !this.endTime1
            ) {
                this.required1 = true;
                return;
            }
            let cal = [];
            let pushed = false;
            if (this.calendar1.length < 1) {
                // calendar1.length < 1
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
                        // if current appointment start time is later then new appointment start time and new appointment has not been pushed
                        this.militaryToMinutes(app[0]) > // cur app start time
                            this.militaryToMinutes(this.appStart) && // new app end time
                        pushed === false // new app has not been pushed
                    ) {
                        console.log('if 2');
                        if (cal.length) {
                            // if cal.length
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
                                if (
                                    //if new appointment end time is later then next appointment start time but not later then next appointment end time
                                    this.militaryToMinutes(
                                        this.appEnd
                                    ) >
                                        this.militaryToMinutes(
                                            app[0]
                                        ) &&
                                    this.militaryToMinutes(
                                        this.appEnd
                                    ) < this.militaryToMinutes(app[1])
                                ) {
                                    console.log('if 2 A.1.1');
                                    const prev = cal.pop();
                                    cal.push([prev[0], app[1]]);
                                    pushed = true;
                                    console.log('if 2 A.1.1 End');
                                } else if (
                                    //if new appointment end time is later then next appointment end time
                                    this.militaryToMinutes(
                                        this.appEnd
                                    ) > this.militaryToMinutes(app[1])
                                ) {
                                    console.log('if 2 A.1.2');
                                    const prev = cal.pop();
                                    cal.push([prev[0], this.appEnd]);
                                    pushed = true;
                                    console.log('if 2 A.1.2 End');
                                } else {
                                    console.log('if 2 A.1.3');
                                    const prev = cal.pop();
                                    cal.push([prev[0], this.appEnd]);
                                    pushed = true;
                                    i--;
                                    console.log('if 2 A.1.3 End');
                                }
                            } else {
                                //if new appointment start time is greater than prev appointment end time
                                console.log('if 2 A.4');
                                cal.push([
                                    this.appStart,
                                    this.appEnd,
                                ]);
                                pushed = true;
                                i--;
                            }
                        } else {
                            // if cal has no length
                            // if new appointment end time is after current appointment start time but before current appointment end time
                            if (
                                this.militaryToMinutes(this.appEnd) >
                                    this.militaryToMinutes(app[0]) &&
                                this.militaryToMinutes(this.appEnd) <
                                    this.militaryToMinutes(app[1])
                            ) {
                                console.log('if 2 B.1');
                                cal.push([this.appStart, app[1]]);
                                pushed = true;
                                console.log('if 2 B.1 end');
                            } else if (
                                // if new appointment end time is later than current appointment end time
                                this.militaryToMinutes(this.appEnd) >
                                this.militaryToMinutes(app[1])
                            ) {
                                console.log('if 2 B.2');
                                cal.push([
                                    this.appStart,
                                    this.appEnd,
                                ]);
                                pushed = true;
                                console.log('if 2 B.2 end');
                            } else {
                                //if new appointment end time is before current appointment start time
                                console.log('if 2 B.3');
                                cal.push([
                                    this.appStart,
                                    this.appEnd,
                                ]);
                                pushed = true;
                                i--;
                                console.log('if 2 B.3 end');
                            }
                        }
                    } else if (
                        // if current appointment start time is later then new appointment start time and new appointment has been pushed
                        this.militaryToMinutes(app[0]) >
                            this.militaryToMinutes(this.appStart) &&
                        pushed === true
                    ) {
                        console.log('if 3');
                        if (
                            //if the last appointment end time is less than current appointment start time
                            this.militaryToMinutes(
                                cal[cal.length - 1][1]
                            ) < this.militaryToMinutes(app[0])
                        ) {
                            console.log('if 3.1');
                            cal.push(app);
                        } else if (
                            //if the last appointment end time is greater than current appointment start time and less then current appointment end time
                            this.militaryToMinutes(
                                cal[cal.length - 1][1]
                            ) > this.militaryToMinutes(app[0]) &&
                            this.militaryToMinutes(
                                cal[cal.length - 1][1]
                            ) < this.militaryToMinutes(app[1])
                        ) {
                            console.log('if 3.2');
                            const prev = cal.pop();
                            cal.push([prev[0], app[1]]);
                        } else {
                            //if the last appointment end time is greater then the current appointment end time
                            continue;
                        }
                    }
                }
                if (pushed === false) {
                    //if after iterating through the calendar the new appointment has not been push
                    console.log('last if');
                    if (cal[cal.length - 1][1] > this.appStart) {
                        //if last appointment in cal overlaps new appointment start time
                        console.log('last if A');
                        const prev = cal.pop();
                        cal.push([prev[0], this.appEnd]);
                        pushed = true;
                    } else {
                        //if last appointment in cal ends before new appointment start time
                        console.log('last if B');
                        cal.push([this.appStart, this.appEnd]);
                        pushed = true;
                    }
                }
                console.log(
                    'calendar1 LandingPage Pre this.calendar1 = cal',
                    this.calendar1
                );
                console.log(
                    'cal LandingPage this.calendar1 = cal',
                    cal
                );
                this.calendar1 = cal;
                console.log(
                    'calendar1 LandingPage Post this.calendar1 = cal',
                    this.calendar1
                );
            }

            console.log(
                'calendar1 at addApp1 end======>',
                this.calendar1
            );

            this.appStart = null;
            this.appEnd = null;
        },
        addApp2() {
            this.required2 = false;
            if (this.startTime2 > this.endTime2) return;
            if (this.appStart > this.appEnd) return;
            if (this.startTime2 > this.appStart)
                this.appStart = this.startTime2;
            if (this.endTime2 < this.appEnd)
                this.appEnd = this.endTime2;
            5;
            if (
                !this.appStart ||
                !this.appEnd ||
                !this.startTime2 ||
                !this.endTime2
            ) {
                this.required2 = true;
                return;
            }
            let cal = [];
            let pushed = false;
            if (this.calendar2.length < 1) {
                // calendar2.length < 1
                console.log('calendar2.length < 1');
                this.calendar2.push([this.appStart, this.appEnd]);
            } else {
                for (let i = 0; i < this.calendar2.length; i++) {
                    let app = this.calendar2[i];
                    if (
                        // if current appointment is earlier then new appointment
                        // push current appointment

                        this.militaryToMinutes(app[0]) <
                        this.militaryToMinutes(this.appStart)
                    ) {
                        console.log('if 1');
                        cal.push(app);
                    } else if (
                        // if current appointment start time is later then new appointment start time and new appointment has not been pushed
                        this.militaryToMinutes(app[0]) > // cur app start time
                            this.militaryToMinutes(this.appStart) && // new app end time
                        pushed === false // new app has not been pushed
                    ) {
                        console.log('if 2');
                        if (cal.length) {
                            // if cal.length
                            if (
                                //if new appointment start time is less than prev appointment end time
                                this.militaryToMinutes(
                                    // new app start time
                                    this.appStart
                                ) <
                                this.militaryToMinutes(
                                    this.calendar2[i - 1][1]
                                ) //
                            ) {
                                console.log('if 2 A.1');
                                if (
                                    //if new appointment end time is later then next appointment start time but not later then next appointment end time
                                    this.militaryToMinutes(
                                        this.appEnd
                                    ) >
                                        this.militaryToMinutes(
                                            app[0]
                                        ) &&
                                    this.militaryToMinutes(
                                        this.appEnd
                                    ) < this.militaryToMinutes(app[1])
                                ) {
                                    console.log('if 2 A.1.1');
                                    const prev = cal.pop();
                                    cal.push([prev[0], app[1]]);
                                    pushed = true;
                                    console.log('if 2 A.1.1 End');
                                } else if (
                                    //if new appointment end time is later then next appointment end time
                                    this.militaryToMinutes(
                                        this.appEnd
                                    ) > this.militaryToMinutes(app[1])
                                ) {
                                    console.log('if 2 A.1.2');
                                    const prev = cal.pop();
                                    cal.push([prev[0], this.appEnd]);
                                    pushed = true;
                                    console.log('if 2 A.1.2 End');
                                } else {
                                    console.log('if 2 A.1.3');
                                    const prev = cal.pop();
                                    cal.push([prev[0], this.appEnd]);
                                    pushed = true;
                                    i--;
                                    console.log('if 2 A.1.3 End');
                                }
                            } else {
                                //if new appointment start time is greater than prev appointment end time
                                console.log('if 2 A.4');
                                cal.push([
                                    this.appStart,
                                    this.appEnd,
                                ]);
                                pushed = true;
                                i--;
                            }
                        } else {
                            // if cal has no length
                            // if new appointment end time is after current appointment start time but before current appointment end time
                            if (
                                this.militaryToMinutes(this.appEnd) >
                                    this.militaryToMinutes(app[0]) &&
                                this.militaryToMinutes(this.appEnd) <
                                    this.militaryToMinutes(app[1])
                            ) {
                                console.log('if 2 B.1');
                                cal.push([this.appStart, app[1]]);
                                pushed = true;
                                console.log('if 2 B.1 end');
                            } else if (
                                // if new appointment end time is later than current appointment end time
                                this.militaryToMinutes(this.appEnd) >
                                this.militaryToMinutes(app[1])
                            ) {
                                console.log('if 2 B.2');
                                cal.push([
                                    this.appStart,
                                    this.appEnd,
                                ]);
                                pushed = true;
                                console.log('if 2 B.2 end');
                            } else {
                                //if new appointment end time is before current appointment start time
                                console.log('if 2 B.3');
                                cal.push([
                                    this.appStart,
                                    this.appEnd,
                                ]);
                                pushed = true;
                                i--;
                                console.log('if 2 B.3 end');
                            }
                        }
                    } else if (
                        // if current appointment start time is later then new appointment start time and new appointment has been pushed
                        this.militaryToMinutes(app[0]) >
                            this.militaryToMinutes(this.appStart) &&
                        pushed === true
                    ) {
                        console.log('if 3');
                        if (
                            //if the last appointment end time is less than current appointment start time
                            this.militaryToMinutes(
                                cal[cal.length - 1][1]
                            ) < this.militaryToMinutes(app[0])
                        ) {
                            console.log('if 3.1');
                            cal.push(app);
                        } else if (
                            //if the last appointment end time is greater than current appointment start time and less then current appointment end time
                            this.militaryToMinutes(
                                cal[cal.length - 1][1]
                            ) > this.militaryToMinutes(app[0]) &&
                            this.militaryToMinutes(
                                cal[cal.length - 1][1]
                            ) < this.militaryToMinutes(app[1])
                        ) {
                            console.log('if 3.2');
                            const prev = cal.pop();
                            cal.push([prev[0], app[1]]);
                        } else {
                            //if the last appointment end time is greater then the current appointment end time
                            continue;
                        }
                    }
                }
                if (pushed === false) {
                    //if after iterating through the calendar the new appointment has not been push
                    console.log('last if');
                    if (cal[cal.length - 1][1] > this.appStart) {
                        //if last appointment in cal overlaps new appointment start time
                        console.log('last if A');
                        const prev = cal.pop();
                        cal.push([prev[0], this.appEnd]);
                        pushed = true;
                    } else {
                        //if last appointment in cal ends before new appointment start time
                        console.log('last if B');
                        cal.push([this.appStart, this.appEnd]);
                        pushed = true;
                    }
                }
                this.calendar2 = cal;
            }

            console.log('calendar1======>', this.calendar2);

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
    computed: {
        startTimeOneComp: function () {
            const t = this.startTime1 ? this.militaryToMinutes(this.startTime1) : 0;
            return {
                t
            }
        },
        endTimeOneComp: function () {
            const t = this.militaryToMinutes(this.endTime1);
            return {
                t
            }
        },
        calendar1Computed: function () {
            let c = [...this.calendar1];
            return {
                c,
            };
        },
        calendar2Computed: function () {
            let c = [...this.calendar2];
            return {
                c,
            };
        },
        reqStartTime: function () {
            const req =
                this.required1 && !this.startTime1 ? true : false;
            return {
                req,
            };
        },
        reqStartTime2: function () {
            const req =
                this.required2 && !this.startTime2 ? true : false;
            return {
                req,
            };
        },
        reqEndTime: function () {
            const req =
                this.required1 && !this.endTime1 ? true : false;
            return {
                req,
            };
        },
        reqEndTime2: function () {
            const req =
                this.required2 && !this.endTime2 ? true : false;
            return {
                req,
            };
        },
        reqAppStart: function () {
            const req =
                this.required1 && !this.appStart ? true : false;
            return {
                req,
            };
        },
        reqAppStart2: function () {
            const req =
                this.required2 && !this.appStart ? true : false;
            return {
                req,
            };
        },
        reqAppEnd: function () {
            const req = this.required1 && !this.appEnd ? true : false;
            return {
                req,
            };
        },
        reqAppEnd2: function () {
            const req = this.required2 && !this.appEnd ? true : false;
            return {
                req,
            };
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
.duration {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    align-items: center;
    margin: 20px 0px 0px 0px;
    // border-top: 1px solid grey;
    // border-bottom: 1px solid grey;
    input {
        margin: 10px 0px 7px 0px;
    }
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
.required {
    color: red;
    margin: 0px 0px 0px 5px;
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

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
        <div class="person-underline">
            <div class="line" :style="personToggleStyle"></div>
            <!-- <div class="line2" v-else key="89"></div> -->
        </div>

        <label class="duration">
            How many minutes long is your appointment going to be?
            <input
                v-model="meetingDuration"
                type="number"
                min="0"
                max="1440"
                data-test="meetingDuration"
            />
        </label>

        <!-- Person 1's Form -->
        <!-- <transition name="fade" appear> -->
        <div class="userForm" v-if="personToggle">
            <h2 class="person-one-name">{{ name1 }}</h2>
            <label>
                What is person one's name?
                <input v-model="name1" data-test="name1" />
            </label>
            <label>
                When does
                {{
                    name1 === null || name1 === ''
                        ? 'person one'
                        : name1
                }}
                begin thier day?
                <input
                    v-model="startTime1"
                    type="time"
                    data-test="startTime1"
                />
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
                <input
                    v-model="endTime1"
                    type="time"
                    data-test="endTime1"
                />
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
                }}'s appointment #{{
                    calendar1Computed['c'].length + 1
                }}
                start/end times and click submit, or edit
                {{
                    name2 === null || name2 === ''
                        ? 'person two'
                        : name2
                }}'s calendar
            </h2>
            <label>
                Appointment start time
                <input
                    v-model="appStart"
                    type="time"
                    data-test="appStart"
                />
                <span v-if="reqAppStart['req']" class="required"
                    >*</span
                >
            </label>
            <label>
                Appointment end time
                <input
                    v-model="appEnd"
                    type="time"
                    data-test="appEnd"
                />
                <span v-if="reqAppEnd['req']" class="required"
                    >*</span
                >
            </label>
            <span class="message">{{ message }}</span>
            <button class="app-submit" v-on:click="addApp1">
                Submit
            </button>
            <span v-if="required1" class="required"
                >please complete required fields *</span
            >
        </div>

        <div class="userForm" v-else-if="!personToggle">
            <!-- Person 2's Form -->
            <h2 class="person-two-name">{{ name2 }}</h2>
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
                }}'s appointment #{{
                    calendar2Computed['c'].length + 1
                }}
                start/end times and click submit, or edit
                {{
                    name1 === null || name1 === ''
                        ? 'person one'
                        : name1
                }}'s calendar
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
            <span class="message">{{ message }}</span>
            <div class="app-submit" v-on:click="addApp1">Submit</div>
            <span v-if="required2" class="required"
                >please complete required fields *</span
            >
        </div>
        <!-- </transition> -->
        <!-- --------------------- -->
        <div class="calendar-c">
            <div class="timeline-c" key="0">
                <timeline
                    v-if="startTime1"
                    :key="calKey1"
                    :name="
                        name1 === null || name1 === ''
                            ? 'person one'
                            : name1
                    "
                    :startTime="startTimeOneComp['t']"
                    :breakEnd="
                        calendar1Computed['c'].length
                            ? calendar1Computed['c'][0][0]
                            : null
                    "
                    :endTime="endTimeOneComp['t']"
                    :calendar="[...calendar1Computed['c']]"
                    :calNum="1"
                    @delete-app="deleteApp"
                    data-test="timeline"
                >
                </timeline>

                <!-- MatchTimes --------- -->
                <match-times
                    v-if="
                        calendar1Computed['c'].length &&
                        calendar2Computed['c'].length &&
                        meetingDuration
                    "
                    :key="777"
                    :meetingDuration="meetingDuration"
                    :startTime1="startTimeOneComp['t']"
                    :endTime1="endTimeOneComp['t']"
                    :startTime2="startTimeTwoComp['t']"
                    :endTime2="endTimeTwoComp['t']"
                    :calendarOne="[...calendar1Computed['c']]"
                    :calendarTwo="[...calendar2Computed['c']]"
                >
                </match-times>

                <!-- ---------- --------- -->
                <!-- Timeline 2 --------- -->
                <timeline
                    v-if="startTime2"
                    :key="calKey2"
                    :name="
                        name2 === null || name2 === ''
                            ? 'person two'
                            : name2
                    "
                    :startTime="startTimeTwoComp['t']"
                    :breakEnd="
                        calendar2Computed['c'].length
                            ? calendar2Computed['c'][0][0]
                            : null
                    "
                    :endTime="endTimeTwoComp['t']"
                    :calendar="[...calendar2Computed['c']]"
                    :calNum="2"
                    @delete-app="deleteApp"
                >
                </timeline>
                <!-- ---------- --------- -->
            </div>
        </div>
    </div>
    <div class="bottom-space"></div>
</template>

<script>
import Timeline from './Timeline.vue';
import MatchTimes from './MatchTimes.vue';
export default {
    name: 'LandingPage',
    components: {
        Timeline,
        MatchTimes,
    },
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
            calKey1: 1000,
            calKey2: 100,
            message: '',
        };
    },
    methods: {
        militaryToMinutes(string) {
            console.log('string LandingPage', string);
            if (string === null) {
                if (this.personToggle === true) {
                    this.required1 = true;
                } else {
                    this.required2 = true;
                }
            }
            let h = Number(string.match(/[^:]+/)); //match first 1 or 2 numbers
            let m = Number(string.match(/(?<=:)../)); //match last 2 numbers
            return h * 60 + m;
        },
        rerenderCal1() {
            this.calKey1 += 1;
        },
        rerenderCal2() {
            this.calKey2 += 1;
        },
        deleteApp({ calNum, index }) {
            if (calNum === 1) {
                this.calendar1Computed['c'].splice(index, 1);
                this.rerenderCal1();
            } else {
                this.calendar2Computed['c'].splice(index, 1);
                this.rerenderCal2();
            }
        },
        addApp1() {
            console.log(
                'calendar1Computed[c] at addApp1 start======>',
                this.calendar1Computed['c']
            );
            this.message = '';
            this.required1 = false;
            let startTime = this.personToggle
                ? this.startTime1
                : this.startTime2;
            let endTime = this.personToggle
                ? this.endTime1
                : this.endTime2;
            let calendar = this.personToggle
                ? this.calendar1Computed['c']
                : this.calendar2Computed['c'];
            let minStartTime = this.militaryToMinutes(startTime);
            let minEndTime = this.militaryToMinutes(endTime);
            let minAppStart = this.militaryToMinutes(this.appStart);
            let minAppEnd = this.militaryToMinutes(this.appEnd);
            if (startTime > endTime) {
                this.message =
                    'You must end your day later then you start your day';
                return;
            }
            if (minAppStart > minAppEnd) {
                this.message =
                    'Appointment End Time must be later then appointment Start Time';
                return;
            }
            if (minAppEnd < minAppStart + 15) {
                this.message =
                    'Appointments must be at least 15 minutes long';
                return;
            }
            if (minAppEnd < minStartTime + 15) {
                this.message =
                    'Appointments must start after you start your day and be at least 15 minutes long';
                return;
            }
            if (minAppStart > minEndTime - 15) {
                this.message =
                    'Appointments must start at least 15 minutes before you end your day';
                return;
            }
            if (minStartTime > minAppStart) {
                this.appStart = startTime;
                minAppStart = minStartTime;
            }
            if (minEndTime < minAppEnd) {
                this.appEnd = endTime;
                minAppEnd = minEndTime;
            }
            if (
                !this.appStart ||
                !this.appEnd ||
                !startTime ||
                !endTime
            ) {
                this.required1 = true;
                return;
            }
            let cal = [];
            let pushed = false;
            // let appSt = minAppStart;
            // let appEn = this.militaryToMinutes(this.appEnd);

            if (calendar.length < 1) {
                // calendar1.length < 1
                console.log('calendar1.length < 1');
                calendar.push([minAppStart, minAppEnd]);
            } else {
                for (let i = 0; i < calendar.length; i++) {
                    let app = calendar[i];
                    console.log('app**************', app);
                    if (
                        // if current appointment is earlier then new appointment
                        // push current appointment
                        app[0] < minAppStart
                    ) {
                        console.log('if 1');
                        cal.push(app);
                    } else if (
                        // if current appointment start time is later then new appointment start time and new appointment has not been pushed
                        app[0] > // cur app start time
                            minAppStart && // new app end time
                        pushed === false // new app has not been pushed
                    ) {
                        console.log('if 2');
                        if (cal.length) {
                            // if cal.length
                            if (
                                //if new appointment start time is less than or equal to prev appointment end time
                                minAppStart <= calendar[i - 1][1]
                            ) {
                                console.log('if 2 A.1');
                                if (
                                    //if new appointment end time is later then next appointment start time but not later then next appointment end time
                                    minAppEnd > app[0] &&
                                    minAppEnd < app[1]
                                ) {
                                    console.log('if 2 A.1.1');
                                    const prev = cal.pop();
                                    cal.push([prev[0], app[1]]);
                                    pushed = true;
                                } else if (
                                    //if new appointment end time is at least then next appointment end time
                                    minAppEnd >= app[1]
                                ) {
                                    console.log('if 2 A.1.2');
                                    const prev = cal.pop();
                                    cal.push([prev[0], minAppEnd]);
                                } else {
                                    console.log('if 2 A.1.4');
                                    const prev = cal.pop();
                                    cal.push([prev[0], minAppEnd]);
                                    pushed = true;
                                    i--;
                                }
                            } else {
                                //if new appointment start time is greater than prev appointment end time
                                console.log('if 2 A.5');
                                cal.push([minAppStart, minAppEnd]);
                                pushed = true;
                                i--;
                            }
                        } else {
                            // if cal has no length
                            // if new appointment end time is after current appointment start time but before current appointment end time
                            if (
                                minAppEnd >= app[0] &&
                                minAppEnd < app[1]
                            ) {
                                console.log('if 2 B.1');
                                cal.push([minAppStart, app[1]]);
                                pushed = true;
                                30;
                            } else if (
                                // if new appointment end time is later than current appointment end time
                                minAppEnd > app[1]
                            ) {
                                console.log('if 2 B.2');
                                cal.push([minAppStart, minAppEnd]);
                                pushed = true;
                            } else {
                                //if new appointment end time is before current appointment start time
                                console.log('if 2 B.3');
                                cal.push([minAppStart, minAppEnd]);
                                pushed = true;
                                i--;
                                console.log('if 2 B.4');
                            }
                        }
                    } else if (
                        // if current appointment start time is later then new appointment start time and new appointment has been pushed
                        app[0] > minAppStart &&
                        pushed === true
                    ) {
                        console.log('if 3');
                        if (
                            //if the last appointment end time is less than current appointment start time
                            cal[cal.length - 1][1] < app[0]
                        ) {
                            console.log('if 3.1');
                            cal.push(app);
                        } else if (
                            //if the last appointment end time is greater than current appointment start time and less then current appointment end time

                            cal[cal.length - 1][1] > app[0] &&
                            cal[cal.length - 1][1] < app[1]
                        ) {
                            console.log('if 3.2');
                            const prev = cal.pop();
                            cal.push([prev[0], app[1]]);
                        } else if (
                            cal[cal.length - 1][1] === minAppStart &&
                            minAppEnd === app[0]
                        ) {
                            //if the new appointment start time is equal to the previous appointment end time and the new appointment end time is equal to the current appointment start time
                            console.log('if 3.3');
                            let prev = cal.pop();
                            cal.push([prev[0], app[1]]);
                        } else if (
                            //if the new appointment end time is equal to the last appointment start time
                            minAppEnd === app[0]
                        ) {
                            console.log('if 3.4');
                            console.log(
                                'cal[cal.length - 1][1]',
                                cal[cal.length - 1][1]
                            );
                            cal.pop();
                            cal.push([minAppStart, app[1]]);
                        } else {
                            //if the last appointment end time is greater then the current appointment end time
                            console.log('if 3.5');
                            continue;
                        }
                    }
                }
                if (pushed === false) {
                    //if after iterating through the calendar the new appointment has not been push
                    console.log('last if');
                    console.log('last if cal', cal);
                    if (cal[cal.length - 1][1] >= minAppStart) {
                        //if last appointment in cal overlaps new appointment start time
                        console.log('last if A');
                        const prev = cal.pop();
                        cal.push([prev[0], minAppEnd]);
                        pushed = true;
                    } else {
                        //if last appointment in cal ends before new appointment start time
                        console.log('last if B');
                        cal.push([minAppStart, minAppEnd]);
                        pushed = true;
                    }
                }
                let cl = this.personToggle
                    ? this.calendar1Computed
                    : this.calendar2Computed;
                cl['c'] = cal;

                console.log(
                    'this.calendar1Computed[c] LandingPage Post this.this.calendar1Computed[c] = cal',
                    calendar
                );
            }

            console.log('calendar at addApp1 end======>', calendar);

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
        personToggleStyle: function () {
            let s = null;
            if (this.personToggle) {
                s = 0;
            } else {
                s = 126;
            }
            return {
                left: `${s}px`,
            };
        },
        personToggleComp: function () {
            const t = !this.personToggle;
            return { t };
        },
        startTimeOneComp: function () {
            const t = this.startTime1
                ? this.militaryToMinutes(this.startTime1)
                : 0;
            return {
                t,
            };
        },
        startTimeTwoComp: function () {
            const t = this.startTime2
                ? this.militaryToMinutes(this.startTime2)
                : 0;
            return {
                t,
            };
        },
        endTimeOneComp: function () {
            const t = this.endTime1
                ? this.militaryToMinutes(this.endTime1)
                : 1440;
            return {
                t,
            };
        },
        endTimeTwoComp: function () {
            const t = this.endTime2
                ? this.militaryToMinutes(this.endTime2)
                : 1440;
            return {
                t,
            };
        },
        calendar1Computed: function () {
            let c = [];
            return {
                c,
            };
        },
        calendar2Computed: function () {
            let c = [];
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

// .fade-appear {
//     animation: fade-in ease 0.4s;
//     animation-iteration-count: 1;
//     animation-fill-mode: forwards;
// }

// @keyframes fade-in {
//     0% {
//         opacity: 0;
//     }
//     50% {
//         opacity: 0;
//     }
//     100% {
//         opacity: 1;
//     }
// }

// .fade-in-2 {
//     animation: fade-in ease 5s;
//     animation-iteration-count: 1;
//     animation-fill-mode: forwards;
// }

// @keyframes fade-in {
//     0% {
//         opacity: 0;
//     }
//     40% {
//         opacity: 0;
//     }
//     100% {
//         opacity: 1;
//     }
// }
.fade-enter-from {
    opacity: 0;
}
.fade-enter-active {
    transition: opacity 2s ease;
}
.fade-enter-to {
    opacity: 1;
}
// .fade-leave-from {
//     opacity: 1;
// }
// .fade-leave-to {
//     opacity: 0;
// }
// .fade-leave-active {
//     transition: opacity 2s ease;
// }

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
    color: whitesmoke;
    max-width: 500px;
}
.message {
    font-family: 'Montserrat', sans-serif;
    color: red;
    font-size: 20px;
    text-align: center;
    margin: 20px 20px 20px 20px;
}
.person-one-name,
.person-two-name {
    text-shadow: 0px 2px 4px rgb(0, 0, 0, 0.8);
}
.person-one-name {
    color: $color-5;
}
.person-two-name {
    color: rgb(209, 209, 242);
}
.duration {
    align-items: center;
    margin: 20px 0px 0px 0px;
    text-align: center;
    input {
        margin: 10px 0px 7px 0px;
    }
}
.timeline-c {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin: 0px 0px 20px 0px;
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
    transition: filter 0.3s;
    font-family: 'Russo One', sans-serif;
    color: rgb(82, 82, 82);
}
.person-toggle__1:hover,
.person-toggle__2:hover {
    cursor: pointer;
    filter: brightness(0.96);
}
.person-toggle__divider {
    height: 40px;
    border-right: 1px solid $color-1;
}
.person-underline {
    width: 250px;
    height: 6px;
    display: flex;
    margin: 3px 0px 0px 0px;

    .line {
        width: 125px;
        height: 6px;
        background-color: plum;
        border-radius: 999px;
        position: relative;
        transition: all 0.5s;
    }
    .line2 {
        width: 125px;
        height: 6px;
        background-color: plum;
        border-radius: 999px;
        margin: 0px 0px 0px 125px;
    }
}
.userForm {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
label {
    color: whitesmoke;
    font-family: 'Russo One', sans-serif;
    font-family: 'Sarabun', sans-serif;
    font-weight: 600;
    font-size: 20px;
    text-align: center;
    margin: 0px 0px 20px 0px;
    max-width: 525px;
}
input {
    border: 1px solid grey;
    border-radius: 5px;
    color: grey;
    transition: all 0.5s;
}
input:hover {
    background-color: rgb(212, 212, 253);
    cursor: pointer;
}
input:focus {
    outline: none;
    background-color: lavender;
    border: 1px solid $color-2;
    color: black;
}
.required {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
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
    margin: 0px 0px 20px 0px;
}
.app-submit:hover {
    color: white;
    background-color: grey;
    border: 1px solid white;
    cursor: pointer;
}
.calendar-c {
    height: 1000px;
    width: 100%;
    max-width: 700px;
    min-width: 280px;
    display: flex;
    justify-content: space-evenly;
    flex-shrink: 10;
    margin: 0px 0px 100px 0px;
}
.bottom-space {
    height: 50px;
    width: 100%;
}
@media screen and (max-width: 567px) {
    .duration,
    .userForm label {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .app-submit {
        margin: 7px 0px 0px 0px;
    }
}
</style>

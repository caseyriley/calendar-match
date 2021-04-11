<template>
    <div class="app-times" v-if="bool['b']">
        <span class="name">Available Times</span>
        <no-times
            v-if="timesArray['cal']"
            :start="0"
            :end="end['e']"
        />
        <match
            v-for="(time, index) in timesArray['cal']"
            :key="index"
            :index="index"
            :timesArray="[...timesArray['cal']]"
            :endTime="combinedEndTime['e']"
        />
        <no-times
            v-if="timesArray['cal']"
            :start="
                timesArray['cal'][timesArray['cal'].length - 1][1]
            "
            :end="1440"
        />
    </div>
</template>

<script>
import NoTimes from '@/components/NoTimes.vue';
import Match from '@/components/Match.vue';
export default {
    name: 'MatchTimes',
    components: { NoTimes, Match },
    props: [
        'meetingDuration',
        // 'dailyBoundsOne',
        // 'dailyBoundsTwo',
        'startTime1',
        'startTime2',
        'endTime1',
        'endTime2',
        'calendarOne',
        'calendarTwo',
    ],
    methods: {
        militaryToMinutes(string) {
            console.log('string MatchTimes', string);
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
        calMatch() {
            ////////////////convert daily bounds to minutes///////////////
            debugger;
            this.bool['b'] = false;
            console.log(
                'calendar1 at start of calMatch$$$$$$$$$$',
                this.calendarOne
            );
            let dailyBounds1 = [this.startTime1, this.endTime1];
            let dailyBounds2 = [this.startTime2, this.endTime2];
            let calendarA = [...this.calendarOne];
            let calendarB = [...this.calendarTwo];
            console.log('dailyBounds1', dailyBounds1);
            console.log('dailyBounds2', dailyBounds2);

            // dailyBounds1[0] = this.militaryToMinutes(
            //     this.dailyBoundsOne[0]
            // );
            // dailyBounds1[1] = this.militaryToMinutes(
            //     this.dailyBoundsOne[1]
            // );
            // dailyBounds2[0] = this.militaryToMinutes(
            //     this.dailyBoundsTwo[0]
            // );
            // dailyBounds2[1] = this.militaryToMinutes(
            //     this.dailyBoundsTwo[1]
            // );

            ////////set dBounds to min and max times available for both clients///////
            let dBounds = [
                Math.max(dailyBounds1[0], dailyBounds2[0]),
                Math.min(dailyBounds1[1], dailyBounds2[1]),
            ];

            console.log('dBounds', dBounds);
            console.log('calendarA', calendarA);
            console.log('calendarB', calendarB);
            console.log(
                'meetingDuration',
                this.meetingDurationComp['d']
            );

            ///////if there is no time available to clients due to thier dailyBounds//////
            if (
                dBounds[1] - dBounds[0] <
                this.meetingDurationComp['d']
            ) {
                console.log('No available times for a meeting');
                return 'No available times for a meeting';
            }

            //////convert both calendars to minutes///////
            // calendarA.forEach((array, i) =>
            //     array.forEach((el, j) => {
            //         calendarA[i][j] = this.militaryToMinutes(el);
            //     })
            // );

            // calendarB.forEach((array, i) =>
            //     array.forEach((el, j) => {
            //         calendarB[i][j] = this.militaryToMinutes(el);
            //     })
            // );

            //////declare result to be returned at end of function if there is
            //////at least one available meeting time
            let result = [];

            //if both clients are available at the same time before their first appointment,
            //add that time to result
            if (
                calendarA[0][0] > dBounds[0] &&
                calendarB[0][0] > dBounds[0]
            ) {
                console.log('134');
                if (
                    Math.min(calendarA[0][0], calendarB[0][0]) -
                        dBounds[0] >=
                    this.meetingDurationComp['d']
                )
                    result.push([
                        dBounds[0],
                        Math.min(calendarA[0][0], calendarB[0][0]),
                    ]);
            }

            //iterate through both calendars as needed
            let idx1 = 0;
            let idx2 = 0;

            while (
                idx1 < calendarA.length &&
                idx2 < calendarB.length
            ) {
                //if not at the last index of either calendar
                if (calendarA[idx1 + 1] && calendarB[idx2 + 1]) {
                    console.log('156');
                    console.log('idx1-', idx1, ',idx2-', idx2)
                    let nextS1 = calendarA[idx1 + 1][0];
                    let nextS2 = calendarB[idx2 + 1][0];
                    let nextS = Math.min(nextS1, nextS2);

                    let end1 = calendarA[idx1][1];
                    let end2 = calendarB[idx2][1];
                    let curEnd = Math.max(end1, end2);

                    //if both clients are free at the same time push that time to result
                    if (
                        nextS - curEnd >=
                        this.meetingDurationComp['d']
                    ) {
                        console.log('170');
                        console.log('idx1-', idx1, ',idx2-', idx2)
                        result.push([curEnd, nextS]);
                        idx1++;
                        idx2++;
                        continue;
                        //if there is not enough time for a meeting increment inexes accordingly
                    } else if (
                        nextS - curEnd <
                        this.meetingDurationComp['d']
                    ) {
                        //if both indexes should increment because the start of both
                        //clients next appointment is later then both clients next availble openings
                        if (
                            calendarA[idx1 + 1][0] <
                                calendarB[idx2 + 1][1] &&
                            calendarB[idx2 + 1][0] <
                                calendarA[idx1 + 1][1]
                        ) {
                            console.log('188');
                            console.log('idx1-', idx1, ',idx2-', idx2)
                            idx1++;
                            idx2++;
                            continue;
                            //if only idx2 should increment due to the start time of the
                            //next available opening on calendarA
                        } else if (
                            calendarA[idx1 + 1][0] >
                            calendarB[idx2 + 1][1]
                        ) {
                            console.log('198');
                            console.log('idx1-', idx1, ',idx2-', idx2)
                            idx2++;
                            continue;
                            //if only idx1 should increment due to the start time of the
                            //next available opening on calendarB
                        } else if (
                            calendarB[idx2 + 1][0] >
                            calendarA[idx1 + 1][1]
                        ) {
                            console.log('207');
                            console.log('idx1-', idx1, ',idx2-', idx2)
                            idx1++;
                            continue;
                        }
                    }
                } else if (
                    calendarA.length - 1 === idx1 &&
                    calendarB.length - 1 === idx2
                ) {
                    //if at at the end of both calendars
                    if (
                        calendarB[idx2][0] - calendarA[idx1][1] >
                        this.meetingDurationComp['d']
                    ) {
                        console.log('222');
                        console.log('idx1-', idx1, ',idx2-', idx2)
                        //if there is time available after calendarA last appointment and before calendarB last appointment
                        if (dBounds[0] < calendarA[idx1][1]) {
                            result.push([
                                calendarA[idx1][1],
                                calendarB[idx2][0],
                            ]);
                        } else if (
                            dBounds[0] > calendarA[idx1][1] &&
                            dBounds[0] < calendarB[idx2][0]
                        ) {
                            result.push([
                                dBounds[0],
                                calendarB[idx2][0],
                            ]);
                        }
                    } else if (
                        calendarA[idx1][0] - calendarB[idx2][1] >
                        this.meetingDurationComp['d']
                    ) {
                        console.log('242');
                        console.log('idx1-', idx1, ',idx2-', idx2)
                        //if there is time after calendarB last appointment and before calendarA next appointment
                        if (dBounds[0] < calendarB[idx2][1]) {
                            result.push([
                                calendarB[idx2][1],
                                calendarA[idx1][0],
                            ]);
                        } else if (
                            dBounds[0] > calendarB[idx2][1] &&
                            dBounds[0] < calendarA[idx1][0]
                        ) {
                            result.push([
                                dBounds[0],
                                calendarA[idx1][0],
                            ]);
                        }
                    }
                    //
                    console.log('260');
                    console.log('idx1-', idx1, ',idx2-', idx2)
                    let end1 = calendarA[idx1][1];
                    let end2 = calendarB[idx2][1];
                    let curEnd = Math.max(end1, end2);
                    if (
                        dBounds[1] - curEnd >=
                        this.meetingDurationComp['d']
                    ) {
                        result.push([curEnd, dBounds[1]]);
                    }
                    break;
                } else if (
                    calendarA[idx1 + 1] &&
                    !calendarB[idx2 + 1]
                ) {
                    // if calendarA has not been fully iterated but calendarB has been // ****
                    if (
                        calendarA[idx1][0] -
                            calendarB[calendarB.length - 1][1] >
                        this.meetingDurationComp['d']
                    ) {
                        // if there is enough time after calendarB last appointmentment and before calendarA appointment
                        console.log('281');
                        console.log('idx1-', idx1, ',idx2-', idx2)
                        result.push([
                            calendarB[calendarB.length - 1][1],
                            calendarA[idx1][0],
                        ]);

                        while (idx1 < calendarA.length - 1) {
                            if (
                                calendarA[idx1 + 1][0] -
                                    calendarA[idx1][1] >
                                this.meetingDurationComp['d']
                            ) {
                                result.push([
                                    calendarA[idx1][1],
                                    calendarA[idx1 + 1][0],
                                ]);
                            }
                            idx1++;
                        }
                        if (
                            dBounds[1] -
                                calendarA[calendarA.length - 1][1] >
                            this.meetingDurationComp['d']
                        ) {
                            result.push([
                                calendarA[calendarA.length - 1][1],
                                dBounds[1],
                            ]);
                        }
                    } 
                    
                    // else {
                    //     // if there is not enough time after calendarB last appointment and before calendarA next appointment
                    //     console.log('312'); // here **********
                    //     console.log('idx1-', idx1, ',idx2-', idx2)
                    //     let end1 = calendarB[calendarB.length - 1][1];
                    //     let end2 = calendarA[idx1][1];
                    //     let curEnd = Math.max(end1, end2);
                    //     let start = calendarA[idx1 + 1][0];
                    //     //push any avialable time slot bigger then or equal to the meeting duration
                    //     if (
                    //         curEnd < start &&
                    //         start - curEnd >=
                    //             this.meetingDurationComp['d']
                    //     ) {
                    //         console.log('323');
                    //         console.log('idx1-', idx1, ',idx2-', idx2)
                    //         result.push([curEnd, start]);
                    //     }
                    // }

                    idx1++;
                    continue;
                } else if (
                    calendarB[idx2 + 1] &&
                    !calendarA[idx1 + 1]
                ) {
                    // if calendarB has not been fully iterated but calendarA has   // ****
                    if (
                        calendarB[idx2][0] -
                            calendarA[calendarA.length - 1][1] >
                        this.meetingDurationComp['d']
                    ) {
                        // if there is enough time after calendarA last appointmentment and before calendarB appointment at idx2
                        console.log('304');
                        console.log('idx1-', idx1, ',idx2-', idx2)
                        result.push([
                            calendarA[calendarA.length - 1][1],
                            calendarB[idx2][0],
                        ]);

                        while (idx2 < calendarB.length - 1) {
                            if (
                                calendarB[idx2 + 1][0] -
                                    calendarB[idx2][1] >
                                this.meetingDurationComp['d']
                            ) {
                                result.push([
                                    calendarB[idx2][1],
                                    calendarB[idx2 + 1][0],
                                ]);
                            }
                            idx2++;
                        }
                        if (
                            dBounds[1] -
                                calendarB[calendarB.length - 1][1] >
                            this.meetingDurationComp['d']
                        ) {
                            result.push([
                                calendarB[calendarB.length - 1][1],
                                dBounds[1],
                            ]);
                        }
                    } else {
                        // if there is not enough time after calendarA last appointment and before calendarB at idx2

                        if (calendarA[calendarA.length - 1][1] >= calendarB[idx2][0]){
                            idx2 ++;
                            continue;
                        }

                        console.log('316'); //*********** */
                        console.log('idx1-', idx1, ',idx2-', idx2)
                        let end1 = calendarA[calendarA.length - 1][1];
                        let end2 = calendarB[idx2][1];
                        let curEnd = Math.max(end1, end2);
                        let start = calendarB[idx2 + 1][0];
                        //push any avialable time slot bigger then or equal to the meeting duration
                        if (
                            curEnd < start &&
                            start - curEnd >=
                                this.meetingDurationComp['d']
                        ) {
                            console.log('227');
                            console.log('idx1-', idx1, ',idx2-', idx2)
                            result.push([curEnd, start]);
                        }
                    }

                    idx2++;
                    continue;
                }
            }

            //if there are no available time for both clients to meet in the day then let them know
            if (result.length < 1) {
                console.log('No available times for a meeting');
                return 'No available times for a meeting';
            }

            //convert result times from minutes to military time
            // result.forEach((el, i) => {
            //     result[i][0] = this.minutesToMilitary(el[0]);
            //     result[i][1] = this.minutesToMilitary(el[1]);
            // });
            console.log('result++++', result);
            console.log(
                'calendar1 at end of calMatch$$$$$$$$$$',
                this.calendarOne
            );
            this.bool['b'] = true;
            return result;
        },
    },
    computed: {
        timesArray: function () {
            const cal = this.calMatch();
            return { cal };
        },
        end: function () {
            let e = '';
            if (this.timesArray['cal']) {
                e =
                    this.timesArray['cal'][0][0] > 0
                        ? this.timesArray['cal'][0][0]
                        : 0;
            } else {
                e = 0;
            }

            return { e };
        },
        combinedEndTime: function () {
            let e = 1140;
            if (this.endTime1 < this.endTime2) {
                e = this.endTime1;
            } else {
                e = this.endTime2;
            }
            return {
                e,
            };
        },
        meetingDurationComp: function () {
            let d = Number(this.meetingDuration);
            return {
                d,
            };
        },
        bool: function () {
            let b = true;
            return {
                b,
            };
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

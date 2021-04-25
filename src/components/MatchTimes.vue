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
            // debugger;
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

            //////declare result to be returned at end of function if there is
            //////at least one available meeting time
            let result = [];

            //if both clients are available at the same time before their first appointment,
            //add that time to result
            if (
                calendarA[0][0] > dBounds[0] &&
                calendarB[0][0] > dBounds[0]
            ) {
                if (
                    Math.min(calendarA[0][0], calendarB[0][0]) -
                        dBounds[0] >=
                    this.meetingDurationComp['d']
                )
                    console.log('124');
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
                    let nextS1 = calendarA[idx1 + 1][0];
                    let nextS2 = calendarB[idx2 + 1][0];
                    let nextS = null;

                    let end1 = calendarA[idx1][1];
                    let end2 = calendarB[idx2][1];
                    let curEnd = null;

                    if (calendarB[idx2][0] > calendarA[idx1][1]) {
                        if (calendarB[idx2 - 1]) {
                            curEnd = Math.max(
                                calendarA[idx1][1],
                                calendarB[idx2 - 1][1]
                            );
                            if (
                                calendarB[idx2][0] <=
                                calendarA[idx1 + 1][0]
                            ) {
                                nextS = calendarB[idx2][0];
                            } else {
                                nextS = calendarA[idx1 + 1][0];
                            }
                        } else {
                            if (
                                calendarA[idx1 + 1][0] <
                                calendarB[idx2][0]
                            ) {
                                curEnd = calendarA[idx1][1];
                                nextS = calendarA[idx1 + 1][0];
                            } else {
                                curEnd = calendarA[idx1][1];
                                nextS = calendarB[idx2][0];
                            }
                        }
                    } else if (
                        calendarA[idx1][0] > calendarB[idx2][1]
                    ) {
                        if (calendarA[idx1 - 1]) {
                            curEnd = Math.max(
                                calendarB[idx2][1],
                                calendarA[idx1 - 1][1]
                            );
                            if (
                                calendarA[idx1][0] <=
                                calendarB[idx2 + 1][0]
                            ) {
                                nextS = calendarA[idx1][0];
                            } else {
                                nextS = calendarB[idx2 + 1][0];
                            }
                        } else {
                            if (
                                calendarB[idx2 + 1][0] <
                                calendarA[idx1][0]
                            ) {
                                curEnd = calendarB[idx2][1];
                                nextS = calendarB[idx2 + 1][0];
                            } else {
                                curEnd = calendarB[idx2][1];
                                nextS = calendarA[idx1][0];
                            }
                        }
                    } else {
                        curEnd = Math.max(end1, end2);
                        nextS = Math.min(nextS1, nextS2);
                    }

                    console.log('curEnd', curEnd);
                    console.log('nextS', nextS);

                    if (
                        nextS - curEnd >=
                        this.meetingDurationComp['d']
                    ) {
                        if (
                            result[result.length - 1][0] !== curEnd &&
                            result[result.length - 1][1] !== nextS
                        ) {
                            console.log('177');
                            console.log(
                                'idx1-',
                                idx1,
                                ',idx2-',
                                idx2
                            );
                            result.push([curEnd, nextS]);
                        }

                        if (
                            calendarA[idx1 + 1][0] >
                            calendarB[idx2 + 1][1]
                        ) {
                            console.log('increment 198');
                            console.log(
                                'idx1-',
                                idx1,
                                ',idx2-',
                                idx2
                            );
                            idx2++;
                            continue;
                        } else if (
                            calendarB[idx2 + 1][0] >
                            calendarA[idx1 + 1][1]
                        ) {
                            console.log('increment 211');
                            console.log(
                                'idx1-',
                                idx1,
                                ',idx2-',
                                idx2
                            );
                            idx1++;
                            continue;
                        } else {
                            if (
                                calendarB[idx2][0] <
                                calendarA[idx1][0]
                            ) {
                                console.log('increment 235');
                                console.log(
                                    'idx1-',
                                    idx1,
                                    ',idx2-',
                                    idx2
                                );
                                idx2++;
                                continue;
                            } else if (
                                calendarA[idx1][0] <
                                calendarB[idx2][0]
                            ) {
                                console.log('increment 248');
                                console.log(
                                    'idx1-',
                                    idx1,
                                    ',idx2-',
                                    idx2
                                );
                                idx1++;
                                continue;
                            } else {
                                console.log('increment 258');
                                console.log(
                                    'idx1-',
                                    idx1,
                                    ',idx2-',
                                    idx2
                                );
                                idx1++;
                                idx2++;
                                continue;
                            }
                        }
                    } else if (
                        nextS - curEnd <
                        this.meetingDurationComp['d']
                    ) {
                        //if there is not enough time for a meeting increment indexes accordingly

                        if (
                            calendarA[idx1 + 1][0] <
                                calendarB[idx2 + 1][1] &&
                            calendarB[idx2 + 1][0] <
                                calendarA[idx1 + 1][1]
                        ) {
                            //if both indexes should increment because the start of both
                            //clients next appointment is later then both clients next availble openings
                            console.log('246');
                            console.log(
                                'idx1-',
                                idx1,
                                ',idx2-',
                                idx2
                            );
                            idx1++;
                            idx2++;
                            continue;
                        } else if (
                            calendarA[idx1 + 1][0] >
                            calendarB[idx2 + 1][1]
                        ) {
                            if (
                                calendarB[idx2 + 1][0] -
                                    calendarB[idx2][1] >
                                this.meetingDurationComp['d']
                            ) {
                                //if there is enough time between calendar B cur and next appointment
                                if (
                                    calendarB[idx2][1] >
                                        calendarA[idx1][1] &&
                                    calendarB[idx2 + 1][0] <
                                        calendarA[idx1 + 1][0] &&
                                    calendarB[idx2 + 1][0] -
                                        calendarB[idx2][1] >=
                                        this.meetingDurationComp['d']
                                ) {
                                    console.log('325');
                                    console.log(
                                        'idx1-',
                                        idx1,
                                        ',idx2-',
                                        idx2
                                    );

                                    result.push([
                                        calendarB[idx2][1],
                                        calendarB[idx2 + 1][0],
                                    ]);
                                    idx2++;
                                    continue;
                                } else {
                                    console.log('increment 340');
                                    console.log(
                                        'idx1-',
                                        idx1,
                                        ',idx2-',
                                        idx2
                                    );
                                    idx2++;
                                    continue;
                                }
                            }
                            //if only idx2 should increment due to the start time of the
                            //next available opening on calendarA
                            console.log('increment 282');
                            console.log(
                                'idx1-',
                                idx1,
                                ',idx2-',
                                idx2
                            );
                            idx2++;
                            continue;
                        } else if (
                            calendarB[idx2 + 1][0] >
                            calendarA[idx1 + 1][1]
                        ) {
                            if (
                                calendarA[idx1 + 1][0] -
                                    calendarA[idx1][1] >
                                this.meetingDurationComp['d']
                            ) {
                                //if there is enough time between calendar A cur and next appointment
                                if (
                                    calendarA[idx1][1] >
                                        calendarB[idx2][1] &&
                                    calendarA[idx1 + 1][0] <
                                        calendarB[idx2 + 1][0] &&
                                    calendarA[idx2 + 1][0] -
                                        calendarA[idx1][1] >=
                                        this.meetingDurationComp['d']
                                ) {
                                    console.log('381');
                                    console.log(
                                        'idx1-',
                                        idx1,
                                        ',idx2-',
                                        idx2
                                    );

                                    result.push([
                                        calendarA[idx1][1],
                                        calendarA[idx1 + 1][0],
                                    ]);
                                    idx1++;
                                    continue;
                                } else {
                                    console.log('increment 396');
                                    console.log(
                                        'idx1-',
                                        idx1,
                                        ',idx2-',
                                        idx2
                                    );
                                    idx1++;
                                    continue;
                                }
                            } else {
                                //if only idx1 should increment due to the start time of the
                                //next available opening on calendarB
                                console.log('increment 317');
                                console.log(
                                    'idx1-',
                                    idx1,
                                    ',idx2-',
                                    idx2
                                );
                                idx1++;
                                continue;
                            }
                        }
                    }
                } else if (
                    calendarA.length - 1 === idx1 &&
                    calendarB.length - 1 === idx2
                ) {
                    //if at at the end of both calendars
                    if (
                        calendarB[idx2][0] - calendarA[idx1][1] >=
                        this.meetingDurationComp['d']
                    ) {
                        //if there is time available after calendarA last appointment and before calendarB last appointment
                        if (dBounds[0] < calendarA[idx1][1]) {
                            let start1 = calendarA[idx1][1];
                            let start2 = calendarB[idx2 - 1]
                                ? calendarB[idx2 - 1][1]
                                : calendarA[idx1][1];
                            let cureStart = Math.max(start1, start2);
                            console.log('345');
                            console.log(
                                'idx1-',
                                idx1,
                                ',idx2-',
                                idx2
                            );
                            result.push([
                                cureStart,
                                calendarB[idx2][0],
                            ]);
                        } else if (
                            dBounds[0] > calendarA[idx1][1] &&
                            dBounds[0] < calendarB[idx2][0]
                        ) {
                            console.log('360');
                            console.log(
                                'idx1-',
                                idx1,
                                ',idx2-',
                                idx2
                            );
                            result.push([
                                dBounds[0],
                                calendarB[idx2][0],
                            ]);
                        }
                    } else if (
                        calendarA[idx1][0] - calendarB[idx2][1] >=
                        this.meetingDurationComp['d']
                    ) {
                        //if there is time after calendarB last appointment and before calendarA next appointment
                        if (dBounds[0] < calendarB[idx2][1]) {
                            let start1 = calendarB[idx2][1];
                            let start2 = calendarA[idx1 - 1]
                                ? calendarA[idx1 - 1][1]
                                : calendarB[idx2][1];
                            let cureStart = Math.max(start1, start2);
                            console.log('383');
                            console.log(
                                'idx1-',
                                idx1,
                                ',idx2-',
                                idx2
                            );
                            result.push([
                                cureStart,
                                calendarA[idx1][0],
                            ]);
                        } else if (
                            dBounds[0] > calendarB[idx2][1] &&
                            dBounds[0] < calendarA[idx1][0]
                        ) {
                            console.log('398');
                            console.log(
                                'idx1-',
                                idx1,
                                ',idx2-',
                                idx2
                            );
                            result.push([
                                dBounds[0],
                                calendarA[idx1][0],
                            ]);
                        }
                    }
                    //

                    let end1 = calendarA[idx1][1];
                    let end2 = calendarB[idx2][1];
                    let curEnd = Math.max(end1, end2);
                    if (
                        dBounds[1] - curEnd >=
                        this.meetingDurationComp['d']
                    ) {
                        console.log('420');
                        console.log('idx1-', idx1, ',idx2-', idx2);
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
                            calendarB[calendarB.length - 1][1] >=
                        this.meetingDurationComp['d']
                    ) {
                        // if there is enough time after calendarB last appointmentment and before calendarA appointment
                        console.log('436');
                        console.log('idx1-', idx1, ',idx2-', idx2);

                        let end = calendarB[idx2][1];

                        let start = calendarA[idx1][0];
                        if (
                            start - end >=
                            this.meetingDurationComp['d']
                        ) {
                            result.push([end, start]);
                        }

                        while (idx1 < calendarA.length - 1) {
                            if (
                                calendarA[idx1 + 1][0] -
                                    calendarA[idx1][1] >=
                                this.meetingDurationComp['d']
                            ) {
                                console.log('456');
                                console.log(
                                    'idx1-',
                                    idx1,
                                    ',idx2-',
                                    idx2
                                );
                                result.push([
                                    calendarA[idx1][1],
                                    calendarA[idx1 + 1][0],
                                ]);
                            }
                            idx1++;
                        }
                        if (
                            dBounds[1] -
                                calendarA[calendarA.length - 1][1] >=
                            this.meetingDurationComp['d']
                        ) {
                            //if there is enough time after calendar B current appointment and before calendar A last appointment
                            console.log('476');
                            console.log(
                                'idx1-',
                                idx1,
                                ',idx2-',
                                idx2
                            );
                            result.push([
                                calendarA[calendarA.length - 1][1],
                                dBounds[1],
                            ]);
                            break;
                        }
                    } else if (
                        calendarB[calendarB.length - 1][0] -
                            calendarA[idx1][1] >=
                        this.meetingDurationComp['d']
                    ) {
                        //if there is time before calendar B last appointment and the end of calendar A current appointment
                        //push time as needed

                        if (calendarA[idx1 + 1]) {
                            let nextS = Math.min(
                                calendarA[idx1 + 1][0],
                                calendarB[idx2][0]
                            );
                            let curEnd = null;

                            for (
                                let i = 0;
                                i < calendarB.length;
                                i++
                            ) {
                                let a = calendarB[i];
                                if (a[1] < nextS) {
                                    curEnd = a[1];
                                }
                            }

                            for (
                                let j = 0;
                                j < calendarA.length;
                                j++
                            ) {
                                let a = calendarA[j];
                                if (
                                    a[1] < nextS &&
                                    a[1] > curEnd &&
                                    a[1] >= calendarA[idx1][1]
                                ) {
                                    curEnd = a[1];
                                }
                            }
                            if (
                                result[result.length - 1][0] !==
                                    curEnd &&
                                result[result.length - 1][1] !==
                                    nextS &&
                                nextS - curEnd >= this.meetingDurationComp['d']
                            ) {
                                console.log('536');
                                console.log(
                                    'idx1-',
                                    idx1,
                                    ',idx2-',
                                    idx2
                                );

                                result.push([curEnd, nextS]);
                            } else {
                                console.log('no push on 536 idx1 ++')
                            }

                            idx1++;
                            continue;
                        }
                    }

                    idx1++;
                    continue;
                } else if (
                    calendarB[idx2 + 1] &&
                    !calendarA[idx1 + 1]
                ) {
                    // if calendarB has not been fully iterated but calendarA has   // ****
                    if (
                        calendarB[idx2][0] -
                            calendarA[calendarA.length - 1][1] >=
                        this.meetingDurationComp['d']
                    ) {
                        // if there is enough time after calendarA last appointmentment and before calendarB appointment at idx2
                        console.log('564');
                        console.log('idx1-', idx1, ',idx2-', idx2);

                        let end = calendarA[idx1][1];

                        let start = calendarB[idx2][0];
                        if (
                            start - end >=
                            this.meetingDurationComp['d']
                        ) {
                            result.push([end, start]);
                        }

                        while (idx2 < calendarB.length - 1) {
                            if (
                                calendarB[idx2 + 1][0] -
                                    calendarB[idx2][1] >=
                                this.meetingDurationComp['d']
                            ) {
                                console.log('584');
                                console.log(
                                    'idx1-',
                                    idx1,
                                    ',idx2-',
                                    idx2
                                );
                                result.push([
                                    calendarB[idx2][1],
                                    calendarB[idx2 + 1][0],
                                ]);
                            }
                            idx2++;
                        }
                        if (
                            dBounds[1] -
                                calendarB[calendarB.length - 1][1] >=
                            this.meetingDurationComp['d']
                        ) {
                            //if there is enough time after calendar A current appointment and before calendar B last appointment
                            console.log('603');
                            console.log(
                                'idx1-',
                                idx1,
                                ',idx2-',
                                idx2
                            );
                            result.push([
                                calendarB[calendarB.length - 1][1],
                                dBounds[1],
                            ]);
                            break;
                        }
                    } else if (
                        calendarA[calendarA.length - 1][0] -
                            calendarB[idx2][1] >=
                        this.meetingDurationComp['d']
                    ) {
                        //if there is time before calendar A last appointment and the end of calendar B current appointment
                        //push time as needed
                        if (calendarB[idx2 + 1]) {
                            let nextS = Math.min(
                                calendarB[idx2 + 1][0],
                                calendarA[idx1][0]
                            );
                            let curEnd = -1;

                            for (
                                let i = 0;
                                i < calendarA.length;
                                i++
                            ) {
                                let a = calendarA[i];
                                if (a[1] < nextS) {
                                    curEnd = a[1];
                                }
                            }

                            for (
                                let j = 0;
                                j < calendarB.length;
                                j++
                            ) {
                                let a = calendarB[j];
                                if (
                                    a[1] < nextS &&
                                    a[1] > curEnd &&
                                    a[1] >= calendarB[idx2][1]
                                ) {
                                    curEnd = a[1];
                                }
                            }
                            if (
                                result[result.length - 1][0] !==
                                    curEnd &&
                                result[result.length - 1][1] !==
                                    nextS &&
                                nextS - curEnd >= this.meetingDurationComp['d']
                            ) {
                                console.log('731');
                                console.log(
                                    'idx1-',
                                    idx1,
                                    ',idx2-',
                                    idx2
                                );
                                result.push([curEnd, nextS]);
                            } else {
                                console.log('no push on 731 idx2 ++')
                            }

                            idx2++;
                            continue;
                        }
                    }
                }
            }

            //if there are no available time for both clients to meet in the day then let them know
            if (result.length < 1) {
                console.log('No available times for a meeting');
                return 'No available times for a meeting';
            }

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
    height: 1000px;
    border-radius: 5px;
    background-color: $color-6;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    font-family: 'Noto Sans JP', sans-serif;
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

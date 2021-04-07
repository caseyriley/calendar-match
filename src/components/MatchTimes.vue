<template>
    <div class="app-times" v-if="true">
        <span class="name">Available Times</span>
        <span>{{ timesArray['cal'] }}</span>
        <!-- <NoTimes
            v-if="timesArray.length"
            :start="0"
            :end="end['e']"
        /> -->
    </div>
</template>

<script>
// import NoTimes from '@/components/NoTimes.vue';
export default {
    name: 'MatchTimes',
    // components: { NoTimes },
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
            console.log(
                'calendar1 at start of calMatch$$$$$$$$$$',
                this.calendarOne
            );
            let dailyBounds1 = [
                this.startTime1,
                this.endTime1,
            ];
            let dailyBounds2 = [
                this.militaryToMinutes(this.startTime2),
                this.militaryToMinutes(this.endTime2),
            ];
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
            console.log('meetingDuration', this.meetingDuration);

            ///////if there is no time available to clients due to thier dailyBounds//////
            if (dBounds[1] - dBounds[0] < this.meetingDuration) {
                console.log('No available times for a meeting');
                return 'No available times for a meeting';
            }

            //////convert both calendars to minutes///////
            calendarA.forEach((array, i) =>
                array.forEach((el, j) => {
                    calendarA[i][j] = this.militaryToMinutes(el);
                })
            );

            calendarB.forEach((array, i) =>
                array.forEach((el, j) => {
                    calendarB[i][j] = this.militaryToMinutes(el);
                })
            );

            //////declare result to be returned at end of function if there is
            //////at least one available meeting time
            let result = [];

            //if both clients are available at the same time before their first appointment,
            //add that time to result
            if (
                calendarA[0][0] > dBounds[0] &&
                calendarB[0][0] > dBounds[0]
            ) {
                console.log('114');
                if (
                    Math.min(calendarA[0][0], calendarB[0][0]) -
                        dBounds[0] >=
                    this.meetingDuration
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
                    console.log('136');
                    let nextS1 = calendarA[idx1 + 1][0];
                    let nextS2 = calendarB[idx2 + 1][0];
                    let nextS = Math.min(nextS1, nextS2);

                    let end1 = calendarA[idx1][1];
                    let end2 = calendarB[idx2][1];
                    let curEnd = Math.max(end1, end2);

                    //if both clients are free at the same time push that time to result
                    if (nextS - curEnd >= this.meetingDuration) {
                        console.log('147');
                        result.push([curEnd, nextS]);
                        idx1++;
                        idx2++;
                        continue;
                        //if there is not enough time for a meeting increment inexes accordingly
                    } else if (
                        nextS - curEnd <
                        this.meetingDuration
                    ) {
                        //if both indexes should increment because the start of both
                        //clients next appointment is later then both clients next availble openings
                        if (
                            calendarA[idx1 + 1][0] <
                                calendarB[idx2 + 1][1] &&
                            calendarB[idx2 + 1][0] <
                                calendarA[idx1 + 1][1]
                        ) {
                            console.log('167');
                            idx1++;
                            idx2++;
                            continue;
                            //if only idx2 should increment due to the start time of the
                            //next available opening on calendarA
                        } else if (
                            calendarA[idx1 + 1][0] >
                            calendarB[idx2 + 1][1]
                        ) {
                            console.log('177');
                            idx2++;
                            continue;
                            //if only idx1 should increment due to the start time of the
                            //next available opening on calendarB
                        } else if (
                            calendarB[idx2 + 1][0] >
                            calendarA[idx1 + 1][1]
                        ) {
                            console.log('186');
                            idx1++;
                            continue;
                        }
                    }

                    //if at the end of both calendars push to result any time left in both clients schedules
                    //that is greater than or equal to the meeting duration
                } else if (
                    calendarA.length - 1 === idx1 &&
                    calendarB.length - 1 === idx2
                ) {
                    console.log('198');
                    let end1 = calendarA[idx1][1];
                    let end2 = calendarB[idx2][1];
                    let curEnd = Math.max(end1, end2);
                    if (dBounds[1] - curEnd >= this.meetingDuration) {
                        result.push([curEnd, dBounds[1]]);
                    }
                    break;
                    //if only calendarA has not been fully iterated through
                } else if (
                    calendarA[idx1 + 1] &&
                    !calendarB[idx2 + 1]
                ) {
                    console.log('211');
                    let end1 = calendarA[idx1][1];
                    let end2 = calendarB[calendarB.length - 1][1];
                    let curEnd = Math.max(end1, end2);
                    let start = calendarA[idx1 + 1][0];
                    //push any avialable time slot bigger then or equal to the meeting duration
                    if (
                        curEnd < start &&
                        start - curEnd >= this.meetingDuration
                    ) {
                        result.push([curEnd, start]);
                    }

                    idx1++;
                    continue;
                    //if only calendar two has not been fully iterated through
                } else if (
                    calendarB[idx2 + 1] &&
                    !calendarA[idx1 + 1]
                ) {
                    console.log('231');
                    let end1 = calendarA[calendarA.length - 1][1];
                    let end2 = calendarB[idx2][1];
                    let curEnd = Math.max(end1, end2);
                    let start = calendarB[idx2 + 1][0];
                    //push any avialable time slot bigger then or equal to the meeting duration
                    if (
                        curEnd < start &&
                        start - curEnd >= this.meetingDuration
                    ) {
                        console.log('240');
                        result.push([curEnd, start]);
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
            console.log('255');
            //convert result times from minutes to military time
            result.forEach((el, i) => {
                result[i][0] = this.minutesToMilitary(el[0]);
                result[i][1] = this.minutesToMilitary(el[1]);
            });
            console.log('result++++', result);
            console.log(
                'calendar1 at end of calMatch$$$$$$$$$$',
                this.calendarOne
            );
            return result;
        },
    },
    computed: {
        timesArray: function () {
            const cal = this.calMatch();
            return cal;
        },
        end: function () {
            let e = '';
            if (this.timesArray[0]) {
                e =
                    this.militaryToMinutes(
                        this.timesArray['cal'][0][0]
                    ) > 0
                        ? this.militaryToMinutes(
                              this.timesArray['cal'][0][0]
                          )
                        : 0;
            }

            return e;
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

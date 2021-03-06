// window.addEventListener("DOMContentLoaded", e => {

//This submission is for the problum Calendar Matching//

/////// These are the test cases I used:
//1
// calendar1 = [['9:00', '10:30'],['12:00', '13:00'], ['16:00', '18:00']]
// dailyBounds1 = ['9:00', '20:30']
// calendar2 = [['10:00', '11:30'],['12:30', '14:30'], ['14:30', '15:00'], ['16:00', '17:00']]
// dailyBounds2 = ['10:00', '18:30']
// meetingDuration = 30
//2
let calendar1 = [
    ['9:00', '10:30'],
    ['12:00', '13:00'],
    ['16:00', '18:00'],
];
let dailyBounds1 = ['6:00', '20:30'];
let calendar2 = [
    ['10:00', '11:30'],
    ['12:30', '14:30'],
    ['14:30', '15:00'],
    ['16:00', '17:00'],
];
let dailyBounds2 = ['7:00', '18:30'];
let meetingDuration = 30;
//3
// let = calendar1 = [['9:00', '10:30'] ,['12:00', '13:00'], ['16:00', '18:00']]
// let = dailyBounds1 = ['6:00', '20:30']
// let = calendar2 = [['10:00', '17:30']]
// let = dailyBounds2 = ['7:00', '18:30']
// let = meetingDuration = 30
//4
// let = calendar1 = [['9:00', '10:30'] ,['12:00', '14:30']]
// let = dailyBounds1 = ['9 :00', '20:30']
// let = calendar2 = [['10:00', '11:30'] ,['12:30', '14:30'], ['14:30', '15:00'], ['16:00', '17:00']]
// let = dailyBounds2 = ['7:00', '18:30']
// let = meetingDuration = 30
//5
// let = calendar1 = [['9:00', '10:30'] ,['12:00', '14:30']]
// let = dailyBounds1 = ['9 :00', '20:30']
// let = calendar2 = [['10:00', '11:30'] ,['12:30', '14:30'], ['14:30', '15:00'], ['16:00', '17:00']]
// let = dailyBounds2 = ['7:00', '18:30']
// let = meetingDuration = 60
//6
// calendar1 = [['9:00', '10:30'],['12:00', '13:00'], ['16:00', '18:00']]
// dailyBounds1 = ['9:00', '20:30']
// calendar2 = [['10:00', '11:30'],['12:30', '14:30'], ['14:30', '15:00'], ['16:00', '17:00']]
// dailyBounds2 = ['10:00', '18:30']
// meetingDuration = 60
//7
// calendar1 = [['9:00', '10:30'],['12:00', '13:00'], ['15:30', '18:00']]
// dailyBounds1 = ['9:00', '20:30']
// calendar2 = [['10:00', '11:30'],['12:30', '14:30'], ['14:30', '15:00'], ['16:00', '17:00']]
// dailyBounds2 = ['10:00', '18:30']
// meetingDuration = 60
//8
// calendar1 = [['9:15', '10:10'],['12:00', '13:15'], ['15:45', '18:00']]
// dailyBounds1 = ['7:00', '20:30']
// calendar2 = [['10:00', '11:50'],['12:30', '14:40'], ['14:30', '15:00'], ['16:00', '17:00']]
// dailyBounds2 = ['10:00', '19:30']
// meetingDuration = 45
//9
// calendar1 = [['9:15', '10:10'],['12:00', '13:15'], ['15:45', '18:00']]
// dailyBounds1 = ['7:00', '20:30']
// calendar2 = [['10:00', '11:50'],['12:30', '14:40'], ['14:30', '15:00'], ['16:00', '17:00']]
// dailyBounds2 = ['10:00', '19:30']
// meetingDuration = 46

////////////////////Helper functions//////////////////

function militaryToMinutes(string) {
    let h = Number(string.match(/[^:]+/)); //match first 1 or 2 numbers
    let m = Number(string.match(/(?<=:)../)); //match last 2 numbers
    return h * 60 + m;
}

function minutesToMilitary(num) {
    let h = Math.floor(num / 60);
    let m = num % 60;
    if (m < 10) {
        //if a zero is needed for military time
        let f = '0';
        m = f + `${m}`;
    }
    return `${h}:${m}`;
}

//////////////////The main function//////////////////////

function calMatch() {
    ////////////////convert daily bounds to minutes///////////////
    dailyBounds1[0] = militaryToMinutes(dailyBounds1[0]);
    dailyBounds1[1] = militaryToMinutes(dailyBounds1[1]);
    dailyBounds2[0] = militaryToMinutes(dailyBounds2[0]);
    dailyBounds2[1] = militaryToMinutes(dailyBounds2[1]);

    ////////set dBounds to min and max times available for both clients///////
    let dBounds = [
        Math.max(dailyBounds1[0], dailyBounds2[0]),
        Math.min(dailyBounds1[1], dailyBounds2[1]),
    ];

    ///////if there is no time available to clients due to thier dailyBounds//////
    if (dBounds[1] - dBounds[0] < meetingDuration) {
        console.log('No available times for a meeting');
        return 'No available times for a meeting';
    }

    //////convert both calendars to minutes///////
    calendar1.forEach((array, i) =>
        array.forEach((el, j) => {
            calendar1[i][j] = militaryToMinutes(el);
        })
    );

    calendar2.forEach((array, i) =>
        array.forEach((el, j) => {
            calendar2[i][j] = militaryToMinutes(el);
        })
    );

    //////declare result to be returned at end of function if there is
    //////at least one available meeting time
    let result = [];

    //if both clients are available at the same time before their first appointment,
    //add that time to result
    if (
        calendar1[0][0] > dBounds[0] &&
        calendar2[0][0] > dBounds[0]
    ) {
        if (
            Math.min(calendar1[0][0], calendar2[0][0]) - dBounds[0] >=
            meetingDuration
        )
            result.push([
                dBounds[0],
                Math.min(calendar1[0][0], calendar2[0][0]),
            ]);
    }

    //iterate through both calendars as needed
    let idx1 = 0;
    let idx2 = 0;

    while (idx1 < calendar1.length && idx2 < calendar2.length) {
        //if not at the last index of either calendar
        if (calendar1[idx1 + 1] && calendar2[idx2 + 1]) {
            let nextS1 = calendar1[idx1 + 1][0];
            let nextS2 = calendar2[idx2 + 1][0];
            let nextS = Math.min(nextS1, nextS2);

            let end1 = calendar1[idx1][1];
            let end2 = calendar2[idx2][1];
            let curEnd = Math.max(end1, end2);

            //if both clients are free at the same time push that time to result
            if (nextS - curEnd >= meetingDuration) {
                result.push([curEnd, nextS]);
                idx1++;
                idx2++;
                continue;
                //if there is not enough time for a meeting increment inexes accordingly
            } else if (nextS - curEnd < meetingDuration) {
                //if both indexes should increment because the start of both
                //clients next appointment is later then both clients next availble openings
                if (
                    calendar1[idx1 + 1][0] < calendar2[idx2 + 1][1] &&
                    calendar2[idx2 + 1][0] < calendar1[idx1 + 1][1]
                ) {
                    idx1++;
                    idx2++;
                    continue;
                    //if only idx2 should increment due to the start time of the
                    //next available opening on calendar1
                } else if (
                    calendar1[idx1 + 1][0] > calendar2[idx2 + 1][1]
                ) {
                    idx2++;
                    continue;
                    //if only idx1 should increment due to the start time of the
                    //next available opening on calendar2
                } else if (
                    calendar2[idx2 + 1][0] > calendar1[idx1 + 1][1]
                ) {
                    idx1++;
                    continue;
                }
            }

            //if at the end of both calendars push to result any time left in both clients schedules
            //that is greater than or equal to the meeting duration
        } else if (
            calendar1.length - 1 === idx1 &&
            calendar2.length - 1 === idx2
        ) {
            let end1 = calendar1[idx1][1];
            let end2 = calendar2[idx2][1];
            let curEnd = Math.max(end1, end2);
            if (dBounds[1] - curEnd >= meetingDuration) {
                result.push([curEnd, dBounds[1]]);
            }
            break;
            //if only calendar1 has not been fully iterated through
        } else if (calendar1[idx1 + 1] && !calendar2[idx2 + 1]) {
            let end1 = calendar1[idx1][1];
            let end2 = calendar2[calendar2.length - 1][1];
            let curEnd = Math.max(end1, end2);
            let start = calendar1[idx1 + 1][0];
            //push any avialable time slot bigger then or equal to the meeting duration
            if (curEnd < start && start - curEnd >= meetingDuration) {
                result.push([curEnd, start]);
            }

            idx1++;
            continue;
            //if only calendar two has not been fully iterated through
        } else if (calendar2[idx2 + 1] && !calendar1[idx1 + 1]) {
            let end1 = calendar1[calendar1.length - 1][1];
            let end2 = calendar2[idx2][1];
            let curEnd = Math.max(end1, end2);
            let start = calendar2[idx2 + 1][0];
            //push any avialable time slot bigger then or equal to the meeting duration
            if (curEnd < start && start - curEnd >= meetingDuration) {
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

    //convert result times from minutes to military time
    result.forEach((el, i) => {
        result[i][0] = minutesToMilitary(el[0]);
        result[i][1] = minutesToMilitary(el[1]);
    });
    console.log(result);
    return result;
}

calMatch();

// })

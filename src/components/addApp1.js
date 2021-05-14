function addApp1() {
    console.log(
        'calendar1Computed[c] at addApp1 start======>',
        this.calendar1Computed['c']
    );
    this.message = '';
    this.required1 = false;
    let startTime = this.personToggle
        ? this.startTime1
        : this.startTime2;
    let endTime = this.personToggle ? this.endTime1 : this.endTime2;
    let calendar = this.personToggle
        ? this.calendar1Computed['c']
        : this.calendar2Computed['c'];
    if (startTime > endTime) {
        this.message =
            'You must end your day later then you start your day';
        return;
    }
    if (this.appStart > this.appEnd) {
        this.message =
            'Appointment End Time must be later then appointment Start Time';
        return;
    }
    if (
        this.militaryToMinutes(startTime) >
        this.militaryToMinutes(this.appStart)
    ) {
        this.appStart = startTime;
    }
    if (
        this.militaryToMinutes(endTime) <
        this.militaryToMinutes(this.appEnd)
    ) {
        this.appEnd = endTime;
    }
    if (!this.appStart || !this.appEnd || !startTime || !endTime) {
        this.required1 = true;
        return;
    }
    let cal = [];
    let pushed = false;
    let appSt = this.militaryToMinutes(this.appStart);
    let appEn = this.militaryToMinutes(this.appEnd);

    if (calendar.length < 1) {
        // calendar1.length < 1
        console.log('calendar1.length < 1');
        calendar.push([appSt, appEn]);
        // this.calendar1.push(['05:00', '06:00']);
    } else {
        for (let i = 0; i < calendar.length; i++) {
            let app = calendar[i];
            console.log('app**************', app);
            if (
                // if current appointment is earlier then new appointment
                // push current appointment

                app[0] < appSt
            ) {
                console.log('if 1');
                cal.push(app);
            } else if (
                // if current appointment start time is later then new appointment start time and new appointment has not been pushed
                app[0] > // cur app start time
                    appSt && // new app end time
                pushed === false // new app has not been pushed
            ) {
                console.log('if 2');
                if (cal.length) {
                    // if cal.length
                    if (
                        //if new appointment start time is less than prev appointment end time
                        appSt < calendar[i - 1][1]
                    ) {
                        console.log('if 2 A.1');
                        if (
                            //if new appointment end time is later then next appointment start time but not later then next appointment end time
                            appEn > app[0] &&
                            appEn < app[1]
                        ) {
                            console.log('if 2 A.1.1');
                            const prev = cal.pop();
                            cal.push([prev[0], app[1]]);
                            pushed = true;
                            console.log('if 2 A.1.1 End');
                        } else if (
                            //if new appointment end time is later then next appointment end time
                            appEn > app[1]
                        ) {
                            console.log('if 2 A.1.2');
                            const prev = cal.pop();
                            cal.push([prev[0], appEn]);
                            pushed = true;
                            console.log('if 2 A.1.2 End');
                        } else {
                            console.log('if 2 A.1.3');
                            const prev = cal.pop();
                            cal.push([prev[0], appEn]);
                            pushed = true;
                            i--;
                            console.log('if 2 A.1.3 End');
                        }
                    } else {
                        //if new appointment start time is greater than prev appointment end time
                        console.log('if 2 A.4');
                        cal.push([appSt, appEn]);
                        pushed = true;
                        i--;
                    }
                } else {
                    // if cal has no length
                    // if new appointment end time is after current appointment start time but before current appointment end time
                    if (appEn > app[0] && appEn < app[1]) {
                        console.log('if 2 B.1');
                        cal.push([appSt, app[1]]);
                        pushed = true;
                        console.log('if 2 B.1 end');
                    } else if (
                        // if new appointment end time is later than current appointment end time
                        appEn > app[1]
                    ) {
                        console.log('if 2 B.2');
                        cal.push([appSt, appEn]);
                        pushed = true;
                        console.log('if 2 B.2 end');
                    } else {
                        //if new appointment end time is before current appointment start time
                        console.log('if 2 B.3');
                        cal.push([appSt, appEn]);
                        pushed = true;
                        i--;
                        console.log('if 2 B.3 end');
                    }
                }
            } else if (
                // if current appointment start time is later then new appointment start time and new appointment has been pushed
                app[0] > appSt &&
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
                } else {
                    //if the last appointment end time is greater then the current appointment end time
                    continue;
                }
            }
        }
        if (pushed === false) {
            //if after iterating through the calendar the new appointment has not been push
            console.log('last if');
            console.log('last if cal', cal);
            if (cal[cal.length - 1][1] > appSt) {
                //if last appointment in cal overlaps new appointment start time
                console.log('last if A');
                const prev = cal.pop();
                cal.push([prev[0], appEn]);
                pushed = true;
            } else {
                //if last appointment in cal ends before new appointment start time
                console.log('last if B');
                cal.push([appSt, appEn]);
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
}

module.exports = addApp1;

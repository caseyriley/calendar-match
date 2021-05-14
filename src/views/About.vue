<template>
    <div class="about">
        <div class="scroll">
            <h1>
                Calendar Match is designed to help two people find
                available appointment times between thier schedules.
            </h1>
            <h1>Here are the steps:</h1>
            <h2>Step 1: Fill out the default form for Person 1.</h2>
            <img
                class="img-one"
                alt="person one's form"
                src="../assets/personOneForm.png"
            />
            <h2>
                Step 2: Select Person 2 by clicking the purple button
                labeled "Person 2" and fill out the form for Person 2.
            </h2>
            <img
                class="img-two"
                alt="purple button labeled Person 2"
                src="../assets/personTwoToggle.png"
            />
            <h2>
                Step 3: Any appointment can be deleted by clicking the
                delete button located in the upper/right corder of
                that appointment.
            </h2>
            <img
                class="img-three"
                alt="purple button labeled Person 2"
                src="../assets/appointmentDelete.png"
            />
            <h2>
                Once Person 1 and Person 2 have filled out thier forms
                then all availabe appointment times of at least the
                desired duration will display dynamically.
            </h2>
            <img
                class="img-four"
                alt="purple button labeled Person 2"
                src="../assets/calendarMatch.png"
            />
            <h2>
                That's all you need know to find an available time
                <span role="img" aria-label="check-mark">✅</span>
            </h2>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.about {
    position: fixed;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;
    .scroll {
        height: auto;
        margin: 1000px 0px 0px 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    img {
        border: 2px solid green;
        border-radius: 20px;
        width: 90%;
    }
    .img-one {
        max-width: 748px;
    }
    .img-two {
        max-width: 303px;
    }
    .img-three {
        max-width: 275px;
    }
    .img-four {
        max-width: 672px;
    }
}
h1,
h2 {
    font-family: 'Russo One', sans-serif;
    text-align: center;
    margin: 20px 20px 20px 20px;
    color: whitesmoke;
}
@media screen and (max-width: 580px) {
    h1 {
        font-size: 24px;
    }
    h2 {
        font-size: 18px;
    }
}
</style>

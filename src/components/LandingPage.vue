<template>
    <h1>Find all available appointment times</h1>
    <h2>{{ name1 }}</h2>
    <label>
        What is person one's name?
        <input v-model="name1" />
    </label>
    <label>
        When does
        {{ name1 === null || name1 === '' ? 'person one' : name1 }}
        begin thier day?
        <input v-model="startTime1" type="time" />
    </label>
    <label>
        When does
        {{ name1 === null || name1 === '' ? 'person one' : name1 }}
        end thier day?
        <input v-model="endTime1" type="time" />
    </label>

    <div class="timeline">
        <div
            class="timeline__app"
            v-for="(app,index) in calendar1"
            :key="index"
        >
            <!-- {{
            <div>{{ app }}</div>
            }} -->
        </div>
    </div>

    <h2>{{ name2 }}</h2>

    <label>
        What is person two's name?
        <input v-model="name2" />
    </label>
</template>

<script>
export default {
    name: 'LandingPage',
    data() {
        return {
            name1: null,
            name2: null,
            startTime1: null,
            startTime2: null,
            endTime1: null,
            endTime2: null,
            calendar1: [
                ['9:00', '10:30'],
                ['12:00', '13:00'],
                ['16:00', '18:00'],
            ],
            calendar2: [],
        };
    },
};
</script>

<style lang="scss" scoped>
$color-1: rgb(45, 228, 149);
$color-2: yellow;
$color-3: purple;
.timeline {
    width: 80%;
    height: 50px;
    border: 2px solid $color-1;
    border-radius: 5px;
    background-color: aliceblue;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.timeline__app {
  width: 20px;
  height: 100%;
  background-color: $color-2;
  margin: 0px 0px 0px 5px;
  border: 1px solid $color-3;

}
</style>

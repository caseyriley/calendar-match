<template>
    <div class="timeline__app" :style="{ width }">{{ cal1 }}</div>
</template>

<script>
export default {
    name: 'Appointment',
    props: ['cal1', 'cal2'],
    data() {
        return {
            width: `calc(${this.cal2}px - ${this.cal1}px)`,
            appStyles: {
                // width: `calc(${cal2} - ${cal1} / 1440})`,
            },
        };
    },
};
</script>

<style lang="scss" scoped>
@import './../styles/_variables.scss';
.timeline__app {
    // width: 20px;
    height: 40px;
    background-color: $color-2;
    margin: 5px 0px 5px 5px;
    //   border: 1px solid $color-3;
    border-radius: 5px;
}
</style>

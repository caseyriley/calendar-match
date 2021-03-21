<template>
    <div class="timeline__app"></div>
</template>

<script>
export default {
    name: 'Appointment',
    props: ['cal'],
};
</script>

<style lang="scss" scoped>
.timeline__app {
    width: 20px;
    height: 40px;
    background-color: $color-2;
    margin: 5px 0px 5px 5px;
    //   border: 1px solid $color-3;
    border-radius: 5px;
}
</style>

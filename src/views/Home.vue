<template>
    <div class="home">
        <img
            alt="faces and question marks"
            src="../assets/CalendarMatch3.png"
        />

        <landing-page />
    </div>
</template>

<script>

import LandingPage from '@/components/LandingPage.vue';

export default {
    name: 'Home',
    components: {
        LandingPage,
    },
};
</script>

<style lang="scss" scoped>
.home {
    position: fixed;
    top: 50px;
    left: 0px;
    right: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    height: calc(100vh - 50px);
    img {
        width: 150px;
        height: 150px;
        filter: hue-rotate(40deg);
        margin: 30px 0px 0px 0px;
    }
}
</style>

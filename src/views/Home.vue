<template>
    <div class="home">
        
        <img
            alt="Vue logo"
            src="../assets/blue-stripe-ring.png"
        />

        <LandingPage />
     
    </div>
</template>

<script>
// @ is an alias to /src
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
    // justify-content: center;x
    align-items: center;
    overflow-y: scroll;
    height: calc(100vh - 50px);
    // height: auto;
    border: 1px solid blue;

    img {
        width: 100px;
        height: 100px;
        filter: hue-rotate(40deg);
        margin: 30px 0px 0px 0px;
    }

}

.home-scroll {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    width: 100%;
    height: 100%;

}
</style>

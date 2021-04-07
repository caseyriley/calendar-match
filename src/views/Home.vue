<template>
    <div class="home">
        
        <img
            alt="Vue logo"
            src="../assets/fquestion.jpg"
        />

        <landing-page />
     
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
        width: 150px;
        height: 150px;
        filter: hue-rotate(40deg);
        margin: 30px 0px 0px 0px;
        border-radius: 999px;
        box-shadow: 5px 5px 10px 2px rgb(0, 0, 0, .3);
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

<template>
    <div class="home">
        <div class="home-scroll">
            <img
                alt="Vue logo"
                src="../assets/blue-stripe-ring.png"
            />

            <LandingPage />
        </div>
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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
    height: calc(100vh - 3);
    border: 1px solid blue;

    img {
        margin-top: 350px;
        width: 200px;
        height: 200px;
        filter: hue-rotate(40deg);
    }
}

.home-scroll {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    width: 100%;
}
</style>

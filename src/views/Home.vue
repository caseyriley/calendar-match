<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/blue-stripe-ring.png" />
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        width: 200px;
        filter: hue-rotate(40deg);
        
        
    }
}
</style>

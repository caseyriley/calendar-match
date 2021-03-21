<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div>
    <router-view />
</template>

<style lang="scss">
@import './styles/_variables.scss';
#app {
    width: 100vw;
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background: rgb(165, 210, 230);
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>

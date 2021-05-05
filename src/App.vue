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
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background: rgb(113, 106, 236);
    background: linear-gradient(
        0deg,
        rgba(113, 106, 236, 1) 0%,
        rgba(18, 45, 142, 1) 36%,
        rgba(0, 255, 196, 1) 100%
    );
}

#nav {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid green;
    background-color: rgba(0, 255, 196, 1);
    z-index: 10;
    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>

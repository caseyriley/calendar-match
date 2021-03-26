<template>
    <div class="start" :style="{ height }">
        <span>Start Time </span>
        <span> {{ minutesToMilitary(time) }} </span>
    </div>
</template>

<script>

export default {
    name: 'Start',
    props: ['time'],
    data() {
        console.log("shfdkjhdskf", this.$parent.$data)
        return {
            
            // height: `calc(${(this.time / 1440) * this.parentNode.clientHeight()}px)`,
            // parent: this.$parent.height,
            height: `calc(${(this.time / 1440) * 800}px)`,
            parentHeight: 0,

            
        };
        // console.log('this.parentNode', parent)
            
    },
    // mounted() {
    //          this.parentHeight = this.$parent.minHeight;
    //         },
    methods: {
        minutesToMilitary(num) {
            let h = Math.floor(num / 60);
            let m = num % 60;
            if (m < 10) {
                //if a zero is needed for military time
                let f = '0';
                m = f + `${m}`;
            }
            return `${h}:${m}`;
        },
    },
};
</script>

<style lang="scss" scoped>
@import './../styles/_variables.scss';
.start {
    width: 100%;
    background-color: $color-4;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    box-sizing: border-box;
    // border: 5px solid $color-6;

    // position: absolute;
}
.start span {

    white-space: nowrap;
}
</style>

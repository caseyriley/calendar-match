<template>
    <div class="start" :style="{ height }">
        <span> Start Time {{ minutesToMilitary(time) }} </span>
    </div>
    <h1>{{parent}}</h1>

</template>

<script>

export default {
    name: 'Start',
    props: ['time'],
    data() {
        console.log("shfdkjhdskf", this.$parent.$data)
        return {
            
            // height: `calc(${(this.time / 1440) * this.parentNode.clientHeight()}px)`,
            parent: this.$parent.height,
            minHeight: `calc(${(this.time / 1440) * 100}%)`,
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
    width: 200px;

    background-color: $color-4;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    box-sizing: border-box;
    border: 5px solid $color-6;

    // position: absolute;
}
.start span {
    margin: 5px 5px 5px 5px;
    white-space: nowrap;
}
</style>

<template>
    <div class="end" :style="{ height }">
        <span>End Time</span>
        <span>  {{ minutesToMilitary(time) }} </span>
    </div>
</template>

<script>
export default {
    name: 'End',
    props: ['time'],
    data() {
        return {
            height: `calc(${
                ((1440 - this.time) / 1440) * 800
            }px)`,
        };
    },
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
.end {
    width: 100%;
    background-color: $color-4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // margin: 5px 0px 5px 5px;
    box-sizing: border-box;
    // border: 5px solid $color-6;
    border-top: none;
    overflow: scroll;
}
.end span {
    // margin: 5px 5px 5px 5px;
    white-space: nowrap;
}
</style>

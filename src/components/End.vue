<template>
    <div class="end" :style="curHeight">
        <span>End Time</span>
        <span> {{ minutesToMilitary(endTime) }} </span>
    </div>
</template>

<script>
export default {
    name: 'End',
    props: ['endTime'],
    data() {
        return {
            height: `calc(${((1440 - this.endTime) / 1440) * 800}px)`,
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
    computed: {
        curHeight: function () {
            return {
                height: `${((1440 - this.endTime) / 1440) * 800}px`,
            };
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
    box-sizing: border-box;
    border: 2px solid grey;
    border-radius: 5px;
    overflow: scroll;
}
.end span {
    // margin: 5px 5px 5px 5px;
    white-space: nowrap;
}
</style>

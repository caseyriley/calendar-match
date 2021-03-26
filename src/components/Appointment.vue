<template>
    <div class="timeline__app" :style="{ height }">
        <span>{{ appStart }}/{{ appEnd }}</span>
        <span
            >{{ minutesToMilitary(appStart) }}-{{
                minutesToMilitary(appEnd)
            }}</span
        >
    </div>
    <Break
        :start="appEnd"
        :end="appNextStart"
        :appNextStart="appNextStart"
        :endTime="endTime"
    ></Break>
</template>

<script>
// import Break from '@/components/Break.vue';
import Break from './Break.vue';
export default {
    name: 'Appointment',
    props: ['appStart', 'appEnd', 'appNextStart', 'endTime'],
    components: { Break },
    data() {
        return {
            // width: `calc(${((this.appEnd - this.appStart) / 1140) * 100}% - 10px)`,
            height: `calc(${((this.appEnd - this.appStart) / 1140) * 800}px)`,
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
.timeline__app {
    width: 100%;
    
    background-color: $color-2;
    display: flex;
    // flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    box-sizing: border-box;
    // border: 5px solid $color-6;
    border-top: none;
}
</style>

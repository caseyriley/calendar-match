<template>
    <div class="timeline__app" :style="{ width }">
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
    ></Break>
</template>

<script>
// import Break from '@/components/Break.vue';
import Break from './Break.vue';
export default {
    name: 'Appointment',
    props: ['appStart', 'appEnd', 'appNextStart'],
    components: { Break },
    data() {
        return {
            width: `calc(${
                ((this.cal2 - this.cal1) / 1440) * 100
            }% - 10px)`,
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
    // width: 20px;
    height: 40px;
    background-color: $color-2;
    margin: 5px 0px 5px 5px;
    //   border: 1px solid $color-3;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>

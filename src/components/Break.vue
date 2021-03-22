<template>
    <div class="break" :style="{ width }">
        <span>{{ start }}/{{ end }}</span>
        <span>{{ minutesToMilitary(start) }}/{{ minutesToMilitary(end )}}</span>
    </div>
</template>

<script>
export default {
    name: 'Break',
    props: ['start', 'end', 'appNextStart'],
    data() {
        return {
            width: '100px',
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
.break {
    height: 40px;
    background-color: $color-5;
    margin: 5px 0px 5px 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>

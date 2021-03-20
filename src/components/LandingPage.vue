<template>
  <h1>Find all available appointment times</h1>
  <label >
    What is person one's name?
    <input v-model="name1" />
  </label >
  <label >
    What is person two's name?
    <input v-model="name2" />
  </label>
</template>

<script>
export default {
  name: "LandingPage",
  data() {
    return {
      name1: null,
      name2: null,
    };
  },
};
</script>


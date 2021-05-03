<template>
  <div class="about">
    <h1>Calendar Match is designed to help two peopls find available appointment times between thier schedules of a desired duration.</h1>
    <h2>Step 1: Fill out the default form for Person 1.</h2>
    <h2>Step 2: Select Person 2 by clicking the purple button labeled "Person 2" and fill out the form for Person 2.</h2>
    <h2>Step 3: Any appointment can be deleted by clicking the delete button located in the upper/right corder of that appointment.</h2>
    <h2>Once Person 1 and Person 2 have filled out thier forms then all availabe appointment times of at least the desired duration will display dynamically.</h2>
    <h2>That's all you need know to find an available time <span role="img" aria-label="check-mark">✅</span></h2>
  </div>
</template>
<style lang="scss" scoped>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
}
h1, h2 {
  text-align: center;
  margin: 20px 20px 20px 20px;
}
</style>
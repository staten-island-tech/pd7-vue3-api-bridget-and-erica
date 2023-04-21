<template>
    <div class="restaurant__card">
        <h1>{{ name }}</h1>
        <h2>{{ building }} {{ street }}</h2>
        <p>{{ grade }}</p>
    </div>
</template>
  
<script>
export default {
    name: 'restaurantCard',
    props: {
        restaurant: Object,
        name: String,
        grade: String,
        street: String,
        building: String
    }
}
</script>
  
<style scoped>
/* card styles */
.restaurant__card {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;

    width: 18vw;

    outline: 1px black solid;
    margin: 5px 0;
    padding: 5px;
}
</style>
<template>
    <div class="restaurant__card">
        <h1>{{ name }}</h1>
        <h2>{{ building }} {{ street }}</h2>
        <p>Grade: {{ grade }}</p>
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
h1 {
    font-family: 'Crimson Text', serif;
    font-size: 2rem;
}

h2 {
    font-family: 'Noto Sans', sans-serif;
    font-weight: 400;
    font-size: 1.6rem;
}

p {
    font-family: 'Noto Sans', sans-serif;
    font-weight: 400;
    font-size: 2rem;

}

.restaurant__card {
    font-family: 'Noto Sans', sans-serif;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    width: 18vw;
    margin: 1rem;
    padding: 2rem;
    border-style: solid;
    border-width: 1px;
    border-color: #000;
}
</style>
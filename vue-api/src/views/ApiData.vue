<template>
    <!-- container for restaurant cards -->
    <div class="container__restaurant-card">
        <!-- restaurant cards -->
        <restaurantCard v-for="restaurant in restaurant" :key="restaurant.camis" :restaurant="restaurant"
            :name="restaurant.dba" :grade="restaurant.grade" :street="restaurant.street" :building="restaurant.building" />
    </div>
</template>
  
<script setup>
//imports vue reactivity API's
import { ref, onMounted } from 'vue'
import restaurantCard from '../components/RestaurantCard.vue'

//makes restaurant change to following data
const restaurant = ref('')

async function getRestaurantData() {
    //gets data from API url
    let result = await fetch('https://data.cityofnewyork.us/resource/43nn-pn8j.json')
    let data = await result.json()

    //sets restaurant's value to data (only rest. that have a grade)
    restaurant.value = data.filter((rest) => rest.grade != undefined)
}

//when home is mounted, get the data
onMounted(() => {
    getRestaurantData()
})
</script>
  
<style scoped>
/* container styles */
.container__restaurant-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
  
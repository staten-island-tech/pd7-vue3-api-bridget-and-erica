<template>
  <div class="container">
    <h1>Restaurant Ratings in Relation to Cusine Type</h1>
    <!--creates a dropdown menu to sort grades by cuisine type -->
    <select id="filterSelect" @click="filterSelect">
      <option value="All">All Cuisine Types</option>
      <option value="American">American</option>
      <option value="Chinese">Chinese</option>
      <option value="Pizza">Pizza</option>
      <option value="Coffee/Tea">Coffee/Tea</option>
      <option value="Latin American">Latin American</option>
      <option value="Mexican">Mexican</option>
      <option value="Italian">Italian</option>
      <option value="Caribbean">Caribbean</option>
      <option value="Bakery Products/Desserts">Bakery Products/Desserts</option>
      <option value="Japanese">Japanese</option>
      <option value="Spanish">Spanish</option>
      <option value="Chicken">Chicken</option>
    </select>
    <div class="barChart">
      <BarChart v-if="loaded" :chartData="chartData" :chartOptions="chartOptions" />
    </div>
  </div>
</template>

<script>
import BarChart from '../components/BarChart.vue';

export default {
  name: 'BarView',
  components: { BarChart },
  data() {
    return {
      loaded: false, //make it unloaded by default so chart does not try to mount before receiving data
      chartData: { //in the data for the chart, there is a labels and datasets array
        labels: [],
        datasets: []
      },
      chartOptions: {}
    }
  },
  async mounted() {
    try {
      //get api json, this endpoint makes it so that it grabs the grades and limits the entries to 200k
      const response = await fetch(
        'https://data.cityofnewyork.us/resource/43nn-pn8j.json?$select=grade&$limit=200000'
      )
      const gradeData = await response.json() //gradesData is the json's response
      let labels = ['A', 'B', 'C', 'Z', 'N']; //label for the grades descriptions
      let grade = [] //make an array to house how many of each grades type exists

      labels.forEach((label) => {
        //for each label, push it into labels array that is in chartData 
        this.chartData.labels.push(label)
        //for the grades array, filter the descriptions to match the label and finds the length of that array, giving us a numerical value (quantity)
        //of many of each grades type exists
        grade.push(gradeData.filter((rest) => rest.grade === label).length)
      })
      console.log(grade); //console logs for clarity

      //push the data into datasets; this gives us what goes into the chart!
      this.chartData.datasets.push({
        data: grade,
        backgroundColor: '#8e4d4d',
        label: '# of restaurants',
      })

      this.loaded = true
    }
    //if error then display error (tell me what I did wrong!!)
    catch (error) {
      console.log(error);
    }
    console.log(this.chartData) //console log the chart data, just for clarity
  },
}
</script>

<style scoped>
.container{
display: flex;
flex-direction: column;
justify-items: center;
align-items: center;
}
.barChart {
  width: 80rem;
}
h1 {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    color:#8e4d4d;
    font-size: 4rem;
    text-align: center;
}
select option {
  background-color: #f2f2f2;
  color: black;
  font-size: 1rem;
  padding: 0.5rem 0.8rem;
}

</style>
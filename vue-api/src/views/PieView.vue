<template>
  <div>
    <h1>pie view</h1>
    <div class="pieChart">
      <PieChart v-if="loaded" :chartData="chartData" :chartOptions="chartOptions" />
    </div>
  </div>
</template>

<script>
import PieChart from '../components/PieChart.vue';

export default {
  name: 'PieView',
  components: { PieChart },
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
      //get api json, this endpoint makes it so that it grabs the cuisine description and limits the entries to 200k
      const response = await fetch(
        'https://data.cityofnewyork.us/resource/43nn-pn8j.json?$select=cuisine_description&$limit=200000'
      )
      const cuisineData = await response.json() //cusineData is the json's response
      let labels = ['American', 'Chinese', 'Pizza', 'Coffee/Tea', 'Latin American', 'Mexican', 'Italian', 'Caribbean',
        'Bakery Products/Desserts', 'Japanese', 'Spanish', 'Chicken']; //label for the cuisine descriptions
      let cuisine = [] //make an array to house how many of each cuisine type exists
      let backgroundColor = [ //array for the colours of each section of the pie chart
        "#5B1F14",
        "#78281F",
        "#943126",
        "#B03A2E",
        "#CB4335",
        "#EC7063",
        "#F1948A",
        "#F5B7B1",
        "#DDB0B1",
        "#E9C0C0",
        "#F9EBEA",
        "#F6E8E8"
      ]
      labels.forEach((label) => {
        //for each label, push it into labels array that is in chartData (ref to PieChart.vue)
        this.chartData.labels.push(label)
        //for the cuisine array, filter the descriptions to match the label and finds the length of that array, giving us a numerical value (quantity)
        //of many of each cuisine type exists
        cuisine.push(cuisineData.filter((rest) => rest.cuisine_description == label).length)
      })
      console.log(cuisine); //console logs for clarity

      //push the data into datasets; this gives us what goes into the chart!
      this.chartData.datasets.push({
        data: cuisine,
        backgroundColor: backgroundColor
      })

      //if data is loaded, make it true so graph will display (async and sync!); boolean
      //"The problem with this approach is that Chart.js tries to render your chart and access the chart data synchronously, 
      //so your chart mounts before the API data arrives.
      //To prevent this, a simple v-if is the best solution."—vue-chartjs docs
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
.pieChart {
  width: 40rem;
}
</style>

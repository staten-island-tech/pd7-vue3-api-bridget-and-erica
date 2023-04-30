<template>
  <div>
    <h1>Cuisines by the Boroughs</h1>
    <!--creates a dropdown menu to sort cuisines by boroughs -->
    <select id="filterSelect" @click="filterSelect">
      <option value="All">All Boroughs</option>
      <option value="Manhattan">Manhattan</option>
      <option value="Bronx">Bronx</option>
      <option value="Brooklyn">Brooklyn</option>
      <option value="Queens">Queens</option>
      <option value="Staten Island">Staten Island</option>
    </select>
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
  methods: {
    // if option is selected, filter the data by borough
    async filterSelect() {
      const selection = document.getElementById("filterSelect").value;
      console.log(selection); //console log for clarity
      if (selection !== 'All') {
        const boroughCuisineResponse = await fetch(`https://data.cityofnewyork.us/resource/43nn-pn8j.json?$select=cuisine_description,boro&$limit=200000&$where=cuisine_description IS NOT NULL AND boro='${selection}'`);
        const boroughCuisineData = await boroughCuisineResponse.json()
        console.log(boroughCuisineData);
        let labels = ['American', 'Chinese', 'Pizza', 'Coffee/Tea', 'Latin American', 'Mexican', 'Italian', 'Caribbean', 'Bakery Products/Desserts', 'Japanese', 'Spanish', 'Chicken'];
        let backgroundColor = ["#713f47", "#764040", "#8e4d4d","#a2585a", "#b76466", "#c76e70", "#d08081","#d69090", "#e3a3a4", "#f5c1c1", "#ffdedf","#ffefef"];
        let filteredBoroughs = [];
        labels.forEach((label) => {
          filteredBoroughs.push(boroughCuisineData.filter((rest) => rest.cuisine_description == label).length);
        });
        console.log(filteredBoroughs);
        this.chartData = {
          labels: labels,
          datasets: [{
            data: filteredBoroughs,
            backgroundColor: backgroundColor
          }]
        };
        this.loaded = true;
      } else { //if the selection is all, then proceed with the async mounted function
        this.mounted();
      }
    },
    async mounted() {
      try {
        //get api json, this endpoint makes it so that it grabs the cuisine description and limits the entries to 200k
        const response = await fetch(
          'https://data.cityofnewyork.us/resource/43nn-pn8j.json?$select=cuisine_description,boro&$limit=200000&$where=cuisine_description%20IS%20NOT%20NULL%20AND%20boro%20IS%20NOT%20NULL'
        )
        const cuisineData = await response.json() //cusineData is the json's response
        let labels = ['American', 'Chinese', 'Pizza', 'Coffee/Tea', 'Latin American', 'Mexican', 'Italian', 'Caribbean',
          'Bakery Products/Desserts', 'Japanese', 'Spanish', 'Chicken']; //label for the cuisine descriptions
        let cuisine = [] //make an array to house how many of each cuisine type exists
        let backgroundColor = [ //array for the colours of each section of the pie chart
          "#713f47", //12
          "#764040", //11
          "#8e4d4d", //10
          "#a2585a", //9
          "#b76466", //8
          "#c76e70", //7
          "#d08081", //6
          "#d69090", //5
          "#e3a3a4", //4
          "#f5c1c1", //3
          "#ffdedf", //2
          "#ffefef" //1
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
}
</script>

<style scoped>
.pieChart {
  width: 40rem;
}

h1 {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #8e4d4d;
  font-size: 4rem;
  text-align: center;
}
</style>
<template>
  <div class="container">
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
    async allSelect() { //async function handles the selection of all boroughs
      try {
        //get api json
        const response = await fetch(
          'https://data.cityofnewyork.us/resource/43nn-pn8j.json?$select=cuisine_description,boro&$limit=200000&$where=cuisine_description%20IS%20NOT%20NULL%20AND%20boro%20IS%20NOT%20NULL'
        )
        const cuisineData = await response.json() //cusineData is the json's response
        let labels = [ //label for the cuisine descriptions
          'American',
          'Chinese',
          'Pizza',
          'Coffee/Tea',
          'Latin American',
          'Mexican',
          'Italian',
          'Caribbean',
          'Bakery Products/Desserts',
          'Japanese',
          'Spanish',
          'Chicken'
        ]
        let cuisine = [] //make an array to house how many of each cuisine type exists
        let backgroundColor = [
          //array for the colours of each section of the pie chart
          '#713f47', //12
          '#764040', //11
          '#8e4d4d', //10
          '#a2585a', //9
          '#b76466', //8
          '#c76e70', //7
          '#d08081', //6
          '#d69090', //5
          '#e3a3a4', //4
          '#f5c1c1', //3
          '#ffdedf', //2
          '#ffefef' //1
        ]
        labels.forEach((label) => {
          //for the cuisine array, filter the descriptions to match the label and finds the length of that array, giving us a numerical value (quantity)
          //of many of each cuisine type exists
          cuisine.push(cuisineData.filter((rest) => rest.cuisine_description == label).length)
        })
        this.chartData = {
          labels: labels,
          datasets: [
            {
              data: cuisine,
              backgroundColor: backgroundColor
            }
          ]
        }
        //if data is loaded, make it true so graph will display (async and sync!); boolean
        //"The problem with this approach is that Chart.js tries to render your chart and access the chart data synchronously,
        //so your chart mounts before the API data arrives.
        //To prevent this, a simple v-if is the best solution."—vue-chartjs docs
        this.loaded = true
      } catch (error) {
        //if error then display error (tell me what I did wrong!!)
        console.log(error)
      }
    },
    // if option is selected, filter the data by borough
    async filterSelect() {
      try {
        const selection = document.getElementById('filterSelect').value //pulls the value of the user input
        if (selection == 'All') { //parse data from all cusines if the selection is all
          this.allSelect()
        }
        console.log(selection)
        const boroughCuisineResponse = await fetch( //grabbing new url that houses boroughs and cusine types
          `https://data.cityofnewyork.us/resource/43nn-pn8j.json?$select=cuisine_description,boro&$limit=200000&$where=cuisine_description IS NOT NULL AND boro='${selection}'`
        )
        const boroughCuisineData = await boroughCuisineResponse.json()
        let labels = [
          'American',
          'Chinese',
          'Pizza',
          'Coffee/Tea',
          'Latin American',
          'Mexican',
          'Italian',
          'Caribbean',
          'Bakery Products/Desserts',
          'Japanese',
          'Spanish',
          'Chicken'
        ]
        let backgroundColor = [
          '#713f47',
          '#764040',
          '#8e4d4d',
          '#a2585a',
          '#b76466',
          '#c76e70',
          '#d08081',
          '#d69090',
          '#e3a3a4',
          '#f5c1c1',
          '#ffdedf',
          '#ffefef'
        ]
        let filteredBoroughs = []
        labels.forEach((label) => { //finding cusisines that match the label
          filteredBoroughs.push(
            boroughCuisineData.filter((rest) => rest.cuisine_description == label).length
          )
        })
        this.chartData = { //data passing in
          labels: labels,
          datasets: [
            {
              data: filteredBoroughs,
              backgroundColor: backgroundColor
            }
          ]
        }
        this.loaded = true
      } catch (error) {
        console.error(error)
      }
    },
  },
  async mounted() {
      this.allSelect()
    }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}

.pieChart {
  width: 40rem;
}

h1 {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #8e4d4d;
  font-size: 4rem;
  text-align: center;
  margin-bottom: 1rem;
}
</style>
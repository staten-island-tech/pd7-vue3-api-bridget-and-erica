<template>
  <div class="container">
    <h1>Restaurant Ratings in Relation to Cusine Type</h1>
    <!--creates a dropdown menu to sort grades by cuisine type -->
    <select id="filterSelect" @click="filterSelect()">
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
import BarChart from '../components/BarChart.vue'

export default {
  name: 'BarView',
  components: { BarChart },
  data() {
    return {
      loaded: false, //make it unloaded by default so chart does not try to mount before receiving data
      chartData: {
        //in the data for the chart, there is a labels and datasets array
        labels: [],
        datasets: []
      },
      chartOptions: {}
    }
  },

  methods: {
    allSelect: async function () {
      try {
        //get api json, this endpoint makes it so that it grabs the grades and limits the entries to 200k
        const response = await fetch(
          'https://data.cityofnewyork.us/resource/43nn-pn8j.json?$select=grade&$limit=200000'
        )
        const gradeData = await response.json() //gradesData is the json's response
        let labels = ['A', 'B', 'C', 'Z', 'N'] //label for the grades descriptions
        let grade = [] //make an array to house how many of each grades type exists

        labels.forEach((label) => {
          //for the grades array, filter the descriptions to match the label and finds the length of that array, giving us a numerical value (quantity)
          //of many of each grades type exists
          grade.push(gradeData.filter((rest) => rest.grade === label).length)
        })

        this.chartData = {
          labels: labels,
          datasets: [
            {
              data: grade,
              backgroundColor: '#8e4d4d',
              label: '# of restaurants'
            }
          ]
        }

        this.loaded = true
      } catch (error) {
        //if error then display error (tell me what I did wrong!!)
        console.log(error)
      }
    },
    filterSelect: async function () {
      try {
        const selection = document.getElementById('filterSelect').value
        if (selection == 'All') {
          this.allSelect()
        } else {
          const gradeCuisineResponse = await fetch(
            `https://data.cityofnewyork.us/resource/43nn-pn8j.json?$select=grade,cuisine_description&$limit=200000&$where=grade%20IS%20NOT%20NULL%20AND%20cuisine_description%20IS%20NOT%20NULL%20AND%20cuisine_description=%27${selection}%27`
          )
          const gradeCuisineData = await gradeCuisineResponse.json()
          let labels = ['A', 'B', 'C', 'Z', 'N']

          let filteredGrades = []

          labels.forEach((label) => {
            filteredGrades.push(gradeCuisineData.filter((rest) => rest.grade == label).length)
          })

          this.chartData = {
            labels: labels,
            datasets: [
              {
                data: filteredGrades,
                backgroundColor: '#8e4d4d',
                label: '# of restaurants'
              }
            ]
          }

          this.loaded = true
        }
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

.barChart {
  width: 80rem;
}

h1 {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  color: #8e4d4d;
  font-size: 4rem;
  text-align: center;
}

select option {
  background-color: #f2f2f2;
  color: black;
  font-size: 1rem;
  padding: 0.5rem 0.8rem;
}</style>

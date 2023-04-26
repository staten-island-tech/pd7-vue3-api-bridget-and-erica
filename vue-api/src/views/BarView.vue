<template>
  <div>
    <h1>bar view</h1>
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
.barChart {
  width: 40rem;
}
</style>
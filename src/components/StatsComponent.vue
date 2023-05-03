<template>
  <div id="stats-container">
    <div id="stats">

      <v-card class="stats-card">
        <v-toolbar color="teal">
          <v-toolbar-title>Personal yearly amount ({{ personalChosenYear }})</v-toolbar-title>
          <v-menu>
            <template v-slot:activator="{props}">
              <v-btn icon variant="tonal" v-bind="props">
                <v-icon>mdi-calendar-today</v-icon>
                <v-tooltip activator="parent" location="start">Change current year</v-tooltip>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(year, index) in years" :key="index" :value="year" @click="getPersonalAmount(year)">
                <v-list-item-title>{{year}}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
        <v-card-text class="text-pre-wrap">You have thrown {{personalYearAmount}}kg so far in {{personalChosenYear}}</v-card-text>
      </v-card>

      <v-card class="stats-card">
        <v-toolbar color="teal">
          <v-toolbar-title>Average all users ({{averageChosenYear}})</v-toolbar-title>
          <v-menu>
            <template v-slot:activator="{props}">
              <v-btn icon variant="tonal" v-bind="props">
                <v-icon>mdi-calendar-today</v-icon>
                <v-tooltip activator="parent" location="start">Change current year</v-tooltip>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(year, index) in years" :key="index" :value="year" @click="getAverageAmount(year)">
                <v-list-item-title>{{year}}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
        <v-card-text class="text-pre-wrap">Average amount of garbage thrown in {{averageChosenYear}} is {{averageYearAmount}}kg</v-card-text>
      </v-card>
    </div>
    <div id="button-and-chart">
      <div>
        <v-menu>
          <template v-slot:activator="{props}">
            <v-btn icon variant="tonal" v-bind="props" id="change-graph-year">
              <v-icon>mdi-chart-line</v-icon>
              <v-tooltip activator="parent" location="start">Change year</v-tooltip>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(year, index) in years" :key="index" :value="year" @click="changeData(year)">
              <v-list-item-title>{{year}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <Bar
        v-if="loaded"
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
    />
    </div>
  </div>
</template>

<script>
import statsService from "@/services/statsService";
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: { Bar },
  data(){
    return {
      loaded:  false,
      personalChosenYear: new Date().getFullYear(),
      averageChosenYear: new Date().getFullYear(),
      personalYearAmount: null,
      averageYearAmount: null,
      years: ["2023", "2022", "2021","2020"],
      personalData: [1,2,3,4,5,6,7,8,9,5,2,8],
      averageData: [1,2,3,4,5,6,7,8,9,9,3,4],
      chartData: null,
      chartOptions: {
        responsive: true
      }
    }
  },
  methods: {
    changeData(year){
      this.createChart(year)
    },
    async getYearAmount(year){
      this.personalYearAmount = await statsService.getGarbageYear(localStorage.getItem("fridgeId"), year)
      this.personalChosenYear = year
    },
    async getPersonalAmount(year){
      await this.getYearAmount(year)
    },
    async getAverageAmount(year){
      // TODO: legg til annen liste fra annen backend metode
    },
    async createChart(year){
      this.loaded = false

      try {
        const userList = await statsService.getGarbageMonth(localStorage.getItem("fridgeId"), year)
        const data = {
          labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
          datasets: [
            { label: "Your waste",
              data: userList,
              backgroundColor: "teal"
            }, { label: "Average waste",
              data: userList, // TODO: legg til annen liste fra annen backend metode
              backgroundColor: "purple"
            } ]
        }
        console.log(data)
        this.chartData = data

        this.loaded = true
      } catch (err){
        console.log(err)
      }

    }
  },
  beforeMount(){
    this.getYearAmount(this.personalChosenYear)
    this.createChart(this.personalChosenYear)
  }
}
</script>

<style scoped>
#stats-container{
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  overflow: hidden;
}
#stats-graph{
  width: 800px;
  min-width: 500px;
}

#stats {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.stats-card {
  width: 375px;
  margin: 20px;
}

#change-graph-year{
  float: right;
}
</style>

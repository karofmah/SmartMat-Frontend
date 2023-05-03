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
    <div id="stats-graph"><canvas id="myChart"></canvas></div>
  </div>
</template>

<script>
import statsService from "@/services/statsService";
import {Chart} from "chart.js/auto";

export default {
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
    }
  },
  methods: {
    async getYearAmount(year){
      this.personalYearAmount = await statsService.getGarbageYear(localStorage.getItem("fridgeId"), year)
      this.personalChosenYear = year
    },
    async getPersonalAmount(year){
      await this.getYearAmount(year)
    },
    async getAverageAmount(year){
      await this.getYearAmount(year)
    },
    async getPersonalEachMonth(year){
      this.personalData = await statsService.getGarbageMonth(localStorage.getItem("fridgeId"), year)
      this.loaded = true
    },
  },
  mounted(){
    this.getYearAmount(this.personalChosenYear)
    //this.getPersonalEachMonth(2023)
    const ctx = document.getElementById("myChart");
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: 'Personal waste',
          data: this.personalData,
          borderWidth: 1,
          backgroundColor: "teal"
        },{
          label: 'Average waste all users',
          data: this.averageData,
          borderWidth: 1,
          backgroundColor: "#6200EA"
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    myChart;
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
</style>

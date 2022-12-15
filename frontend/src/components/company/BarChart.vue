<template>
    <div>
    <Line
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
    </div>
  </template>
  
  <script>
  import http from "../../http-common";
  import { Line } from 'vue-chartjs'
  import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement)
  
  export default {
    name: 'BarChart',
    components: { Line },
    data() {
      return {
        chartData: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                label: 'Прибыль',
                backgroundColor: '#f87979',
                data: [150]
                }
            ]
        },
        chartOptions: {
            responsive: true,
            maintainAspectRatio: false
        },
        casesForGraphic: []
      }
    },
    computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
        },
    methods: {
      getData(){
                    http
                        .get("/comCases/" + this.currentUser.id)
                        .then(response => {
                            this.casesForGraphic = response.data;
                        })
                        .catch(e => {
                            console.log(e);
                        });
          
          
            },
      fillIncomeData(){ 
      console.log(this.casesForGraphic);
      console.log(this.$data);
      console.log(this.$data.casesForGraphic);
        console.log(this.casesForGraphic);
        for (let key in this.$data.casesForGraphic){
            this.$data.chartData.datasets.at(0).data.push(this.$data.casesForGraphic.at(key).income);
            console.log(this.$data.chartData.datasets.at(0).data);
        }
      }
    },
    async mounted(){
      await this.getData();
      await this.fillIncomeData();
    }
  }
  </script>
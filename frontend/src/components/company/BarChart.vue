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
            labels: ['December','January', 'February'],
            datasets: [
                {
                label: 'Прибыль',
                backgroundColor: '#f87979',
                data: [987, 36878]
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
          async getData(){
            await http
                .get("/comCases/" + this.currentUser.id)
                .then(response => {
                    this.casesForGraphic = response.data;
                    this.fillIncomeData();
                })
                .catch(e => {
                    console.log(e);
                });
  
          
            },
     fillIncomeData(){ 
        for (let key in this.casesForGraphic){
            this.chartData.datasets.at(0).data[key]=this.casesForGraphic.at(key).income;
        }
        console.log(this.chartData.datasets.at(0).data);
      }
    },
    async created(){
      await this.getData();
    }
  }
  </script>
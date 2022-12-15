<template>
<div class="container row">
    <div class="col-md-auto container-fluid">
        <h3 class="mx-auto mt-4 text-black-65">Сведенья</h3>
        <div v-for="company in companies" :key="company" class="text-black-65">
            <div class="form-group mb-3">
                <label class="label label-default text-black-65">Наименование:</label>
                {{ company.name }}
            </div>
            <div class="form-group mb-3">
                <label class="label label-default text-black-65">Количество работников:</label>
                {{ quant }}
            </div>
        </div>
        <router-link class="item btn btn-success" role="button" to="/barChart">График прибыли за квартал</router-link>
    </div>
    <div class="col-md-auto container-fluid">
        <div class="container ">
            <h3 class="mx-auto mt-4 text-black-65">Топ работников</h3>
        </div>
        <div class="container item">
            <ul class="list-group list-group-flush">
                <li class="list-group-item list-group-item-secondary" v-for="employee in employees" :key="employee">
                    {{ employee.name }} |
                    {{ employee.position }} |
                    {{ employee.rating }}
                </li>
            </ul>
        </div>
    </div>
    
</div>
</template>

<script>
import http from "../../http-common";
export default {
        name: "company-data",
        data() { 
            return {
                companies: {},
                companyId: 0,
                employees: {},
                quant: 0,
                displayContent: false 
            };
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
        },
        methods: {
            getCompanyEmployeeTop(data){
                http
                    .get("employeesRat/" + data)
                    .then(response => {
                            this.employees = response.data;
                        })
                        .catch(e => {
                            console.log(e);
                        });
            },
            getCompanyData() {
                    http
                        .get("/companies/" + this.currentUser.id)
                        .then(response => {
                            this.companies = response.data;
                            this.companyId = this.companies[0].id;
                            this.getCompanyEmployeeTop(this.companyId);
                        })
                        .catch(e => {
                            console.log(e);
                        });
            },
            getCount(){
                    http
                        .get("/getCountEmp/" + this.currentUser.id)
                        .then(response => {
                            console.log(response.data)
                            this.quant = response.data.count[0].count;
                        })
                        .catch(e => {
                            console.log(e);
                        });
            }
            
        },
        mounted() {
            this.getCompanyData();
            this.getCount();
        }
    }
</script>

<style>
    .item {
        margin-top: 10px;
    }
</style>
<template>
    <div class="container-md">
        <h3 class="mx-auto mt-4 text-black-65">Список работников</h3>
        <div class="col-sm-5">
        <ul class="list-group">
            <li class="list-group-item" v-for="(employee, index) in employees" :key="index">
                <router-link :to="{
                        name: 'employee-details',
                        params: { id: employee.id }
                    }">
                    {{ employee.name }} 
                </router-link>
                |
                {{ employee.position }} |
                {{ employee.rating }}
            </li>
        </ul>
        </div>
        <div class="col-sm-5">
            <router-link class="item btn btn-primary" to="/addEmployee" role="button">Нанять работника</router-link>
        </div>
    </div>
    </template>
    
    <script>
    import http from "../../http-common";
    export default {
            name: "employee-list",
            data() { 
                return {
                    companies: {},
                    employees: [],
                    companyId: 0,
                    displayContent: false 
                };
            },
            computed: {
                currentUser() {
                    return this.$store.state.auth.user;
                }
            },
            methods: {
                getCompanyEmployee(data){
                    http
                        .get("employees/" + data)
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
                                this.getCompanyEmployee(this.companyId);
                            })
                            .catch(e => {
                                console.log(e);
                            });
                },
            },
            mounted() {
                this.getCompanyData();
            }
        }
    </script>
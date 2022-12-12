<template>
    <div class="container-fluid">
        <h3 class="mx-auto mt-4 text-black-65">Задачи</h3>
        <div class="col-sm-6">
        <ul class="list-group">
            <li class="list-group-item" v-for="case_ in cases" :key="case_">
                <router-link :to="{
                        name: 'case-details',
                        params: { id: case_.id }
                    }">
                    {{ case_.description }} 
                </router-link>
                | {{ case_.income }} |
                {{ case_.begin_date }} |
                {{ case_.end_date }} |
                {{ case_.real_end_date }} |
                {{ case_.employee_id }}
            </li>
        </ul>
        </div>
        <div class="col-sm-5">
            <router-link class="item btn btn-primary" to="/addCase" role="button">Взять новый контракт</router-link>
        </div>
    </div>
    </template>
    
    <script>
    import http from "../../http-common";
    export default {
            name: "case-list",
            data() { 
                return {
                    companies: {},
                    employees: [],
                    cases: {},
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
                getCaseList(){
                    http
                        .get("/cases/" + this.currentUser.id)
                        .then(response => {
                            this.cases = response.data;
                            console.log(this.cases);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            },
            mounted() {
                this.getCaseList();
            }
        }
    </script>
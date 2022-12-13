<template>
<div class="container row">
    <div class="col-md-auto container-fluid">
        <h3 class="mx-auto mt-4 text-black-65">Задачи</h3>
        <div class="col-sm-9">
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
    <div class="col-md-auto container-fluid">
        <h3 class="mx-auto mt-4 text-black-65">Статус задач</h3>
    </div>
</div>
</template>
    
    <script>
    import http from "../../http-common";
    export default {
            name: "case-list",
            data() { 
                return {
                    cases: {},
                    states: {},
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
                        })
                        .catch(e => {
                            console.log(e);
                        });
                },
                getStatusList(){
                    http
                        .get("/states/" + this.currentUser.id)
                        .then(response => {
                            this.states = response.data;
                            console.log(this.states);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            },
            mounted() {
                this.getCaseList();
                this.getStatusList();
            }
        }
    </script>
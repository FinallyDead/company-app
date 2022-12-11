<template>
    <div class="container-md">
        <h3 class="mx-auto mt-4 text-black-65" >Найм сотрудника</h3>
        <form @submit="addEmployee" class="row g-2">
            <div class="form-group col-auto">
                <label class="label label-default text-black-65">Имя</label>
                <input type="text" id=" name" name="name" class="form-control" required v-model="employee.name">
            </div>
            <div class="form-group col-auto">    
                <label class="label label-default text-black-65">Должность</label>
                <input type="text" class="form-control" required v-model="employee.position">
            </div>
            <div class="form-group col-auto">    
                <label class="label label-default text-black-65">Рейтинг</label>
                <input type="text" class="form-control" required v-model="employee.rating">
            </div>
            <div class="form-group col-auto" > 
                <label class="label label-default text-black-65">Компания</label>
                <select class="form-select" v-model="employee.company_id">
                    <option v-for="(ident,index) in employee.ids" :key="index">
                      {{ ident.id }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-success" value="Нанять">
            </div>
        </form>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "add-employee",
        data() {
            return {
                employee: {
                    name: "",
                    position: "",
                    rating: "",
                    company_id: "",
                    ids: []
                },
                employees_quant: []
            };
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            getCompanyId(){
                http
                    .get("/getComByName/" + this.employee.company_id)
                    .then(response => {
                        this.employee.company_id = response.data;
                        console.log(this.employee.company_id);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            addEmployee(e) {
                e.preventDefault(); 
                this.getCompanyId();
                var data = {
                    name: this.employee.name,
                    position: this.employee.position,
                    company_id: this.employee.company_id,
                    rating: this.employee.rating
                };
                http
                    .post("/addEmployee", data)
                    .then(() => { // запрос выполнился успешно
                        this.$router.push('/EmployeeList'); // переходим к списку категорий
                    })
                    .catch(e => {
                        console.log(e.response);
                    });
            },
            getCompaniesIds() {
                if (this.currentUser) {
                    http
                        .get("/getComIds/" + this.currentUser.id)
                        .then(response => {
                            this.employee.ids = response.data;
                            console.log(this.employee.ids);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            },
        },
        mounted(){
            this.getCompaniesIds();
        }
    }
</script>

<template>
    <div class="container-md">
        <h3 class="mx-auto mt-4 text-black-65" >Взять новый контракт</h3>
        <form @submit="addCase" class="row g-2">
            <div class="form-group col-auto">
                <label class="label label-default text-black-65">Описание</label>
                <textarea class="form-control" id="frm" rows="5" required v-model="case_.description"></textarea>
            </div>
            <div class="form-group col-auto">    
                <label class="label label-default text-black-65">Доход</label>    
                    <input type="text" name="value" id="value" class="form-control" required v-model="case_.income">
            </div>
            <div class="form-group col-auto">    
                <label class="label label-default text-black-65">Дата начала работы</label>
                    <input type="date" id="rating" name="rating" class="form-control" required v-model="case_.begin_date">
            </div>
            <div class="form-group col-auto">    
                <label class="label label-default text-black-65">Предполагаемая дата окончания работы</label>
                <input type="date" id="date" name="date" class="form-control" required v-model="case_.end_date">
            </div>
            <div class="form-group col-auto">    
                <label class="label label-default text-black-65">Дата окончания работы</label>
                <input type="date" id="date" name="date" class="form-control" v-model="case_.real_end_date">
            </div>
            <div class="form-group col-auto" > 
                <label class="label label-default text-black-65">Ответственный работник</label>
                <select class="form-select" v-model="case_.employee_id">
                    <option v-for="(ident,index) in ids" :key="index" :value="ident.id">
                      {{ ident.name }}
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
        name: "add-case",
        data() {
            return {
                case_: {
                    description: "",
                    income: "",
                    begin_date: "",
                    end_date: "",
                    real_end_date: null,
                    employee_id: ""
                },
                ids: []
            };
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods: {
            getEmployeesId(){
                http
                    .get("/employeesId/" + this.currentUser.id)
                    .then(response => {
                        this.ids = response.data;
                        console.log(this.ids);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            addCase(e) {
                e.preventDefault(); 
                var data = {
                    description: this.case_.description,
                    income: this.case_.income,
                    begin_date: this.case_.begin_date,
                    end_date: this.case_.end_date,
                    real_end_date: this.case_.real_end_date,
                    employee_id: this.case_.employee_id
                };
                http
                    .post("/addCase", data)
                    .then(() => { // запрос выполнился успешно
                        this.$router.push('/CaseList'); // переходим к списку категорий
                    })
                    .catch(e => {
                        console.log(e.response);
                    });
            },
        },
        mounted(){
            this.getEmployeesId();
        }
    }
</script>

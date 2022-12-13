<template>
    <div class="container-md" >
    <h3 class="mx-auto mt-4 text-black-65" >Задача</h3>
    <div v-if="case_">
        <form @submit="updateCase" class="row g-2">
                <div class="col-auto">
                    <label class="label label-default text-black-65">Описание</label>
                    <textarea class="form-control" id="frm" rows="5" required v-model="case_.description"></textarea>
                </div>
                <div class="col-auto">
                    <label class="label label-default text-black-65">Доход</label>    
                    <input type="text" name="value" id="value" class="form-control" placeholder="Сумма расхода" required v-model="case_.income">
                </div>
                <div class="col-auto">    
                    <label class="label label-default text-black-65">Дата начала работы</label>
                    <input type="date" id="rating" name="rating" class="form-control" required v-model="case_.begin_date">
                </div>
                <div class="col-auto">    
                    <label class="label label-default text-black-65">Предполагаемая дата окончания работы</label>
                    <input type="date" id="date" name="date" class="form-control" required v-model="case_.end_date">
                </div>
                <div class="col-auto">    
                    <label class="label label-default text-black-65">Дата окончания работы</label>
                    <input type="date" id="date" name="date" class="form-control" required v-model="case_.real_end_date">
                </div>
            <div class="mt-3">    
                <input class="btn btn-primary" type="submit" value="Изменить данные">
            </div>
            <div class="mt-3">  
                <button class="btn btn-danger" v-on:click="deleteEmployee()">Удалить задачу</button>
            </div>
        </form>
    </div>
    <div v-else>
        <br>
        <p>Выберите задачу</p>
    </div>
</div>
</template>

<script>
import http from "../../http-common";
export default {
name: "case-details",
props: ['id'],
data() {
    return {
        case_: null
    };
},
methods: {
    getCase(){
        http
            .get("/case/"+ this.id)
            .then(response => {
                this.case_ = response.data;
            })
            .catch(e => {
                console.log(e);
            });
    },
    updateCase(e) {
        e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
        var data = {
            description: this.case_.description,
            income: this.case_.income,
            begin_date: this.case_.begin_date,
            end_date: this.case_.end_date,
            real_end_date: this.case_.real_end_date,
            employee_id: this.case_.employee_id
        };
        http
            .post("/updateCase/" + this.case_.id, data)
            .then(() => {
                this.$router.push('/caseList'); // переходим к списку пользователей
            })
            .catch(e => {
                console.log(e);
            });
    },
    deleteCase() {
        http
            .post("/deleteCase/" + this.case_.id)
            .then(() => {
                // переходим к списку пользователей (переход по ссылкам программно)
                this.$router.push('/caseList');
            })
            .catch(e => {
                console.log(e);
            });
    }
},
mounted(){
    this.getCase();
}
}
</script>
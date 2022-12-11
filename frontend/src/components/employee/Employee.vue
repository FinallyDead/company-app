<template>
    <div class="container-md" >
    <h3 class="mx-auto mt-4 text-black-65" >Сотрудник</h3>
    <div v-if="employee">
        <form @submit="updateEmployee" class="row g-2">
                <div class="col-auto">
                    <label class="label label-default text-black-65">Имя</label>
                    <input type="text" name="description" id="description" class="form-control" placeholder="Описание расхода" required v-model="employee.name">
                </div>
                <div class="col-auto">
                    <label class="label label-default text-black-65">Должность</label>    
                    <input type="text" name="value" id="value" class="form-control" placeholder="Сумма расхода" required v-model="employee.position">
                </div>
                <div class="col-auto">    
                    <label class="label label-default text-black-65">Рейтинг</label>
                    <input type="text" id="rating" name="rating" class="form-control" required v-model="employee.rating">
                </div>
            <div class="mt-3">    
                <input class="btn btn-primary" type="submit" value="Изменить данные">
            </div>
            <div class="mt-3">  
                <button class="btn btn-danger" v-on:click="deleteEmployee()">Уволить сотрудника</button>
            </div>
        </form>
    </div>
    <div v-else>
        <br>
        <p>Выберите сотрудника</p>
    </div>
</div>
</template>

<script>
import http from "../../http-common";
export default {
name: "employee-details",
props: ['id'],
data() {
    return {
        employee: null
    };
},
methods: {
    getEmployee(){
        http
            .get("/employee/"+ this.id)
            .then(response => {
                this.employee = response.data;
            })
            .catch(e => {
                console.log(e);
            });
    },
    updateEmployee(e) {
        e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
        var data = {
            name: this.employee.name,
            position: this.employee.position,
            rating: this.employee.rating,
        };
        http
            .post("/updateEmployee/" + this.employee.id, data)
            .then(() => {
                this.$router.push('/employeeList'); // переходим к списку пользователей
            })
            .catch(e => {
                console.log(e);
            });
    },
    deleteEmployee() {
        http
            .post("/deleteEmployee/" + this.employee.id)
            .then(() => {
                // переходим к списку пользователей (переход по ссылкам программно)
                this.$router.push('/employeeList');
            })
            .catch(e => {
                console.log(e);
            });
    }
},
mounted(){
    this.getEmployee();
}
}
</script>
<template>
    <div class="container">
        <header>
            <h3>
                Профиль <strong>{{currentUser.name}}</strong>
            </h3>
        </header>
        <p>
            <strong>Количество компаний во владение:</strong>
            <!--вообще токен нельзя выводить на веб-странице, но для ознакомления он будет отображён на странице профиля пользователя-->
            {{quant}}
        </p>
        <p>
            <strong>Id:</strong>
            {{currentUser.id}}
        </p>
        <p>
            <strong>Логин:</strong>
            {{currentUser.username}}
        </p>
        <p>
            <strong>ФИО:</strong>
            {{currentUser.name}}
        </p>
    </div>
</template>

<script>
import http from "../../http-common";
    export default {
        name: 'ProfileUser',
        data() { 
            return {
                quant: 0
            };
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        methods:{
            getCount(){
                    http
                        .get("/getCount/" + this.currentUser.id)
                        .then(response => {
                            console.log(response.data)
                            this.quant = response.data.count;
                        })
                        .catch(e => {
                            console.log(e);
                        });
            }
        },
        mounted() {
            if (!this.currentUser) {
                this.$router.push('/login');
            }
            this.getCount();
        }
    };
</script>
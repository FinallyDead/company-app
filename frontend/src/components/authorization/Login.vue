<template>
    <div class="col-md-5 container-lg">
        <h4 class="mx-auto mt-4 text-black-65">Вход в систему</h4>
        <form name="form" @submit="handleLogin">
            <div class="form-group mb-3">
                <label class="form-label text-black-65">Login</label>
                <input type="text" class="form-control" name="username" v-model="user.username" required/>
            </div>
            <div class="form-group mb-3">
                <label class="form-label text-black-65">Password</label>
                <input type="password" class="form-control" name="password" v-model="user.password" required/>
            </div>
            <div class="form-group mb-3">
                <button class="btn btn-primary" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Войти</span>
                </button>
            </div>
            <div class="form-group mb-3">
                <router-link to="/register" class="btn btn-secondary">
                    Зарегистрироваться
                </router-link>
            </div>
            <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        name: 'LoginUser',
        data() {
            return {
                user: {
                    name: "",
                    username: "",
                    password: ""
                },
                loading: false,
                message: '',
            };
        },
        computed: { // вычисляемые свойства
            loggedIn() {
                return this.$store.state.auth.status.loggedIn; // $store - локальное хранилище
            }
        },
        created() {
            if (this.loggedIn) {
                // Авторизация прошла успешно, переходим к главной странице.
                // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
                window.location.href = '/';
            }
        },
        methods: {
            handleLogin(e) {
                e.preventDefault();
                this.loading = true;
                this.$store.dispatch("auth/login", this.user) // обращаемся к методу login, который определён в auth.service.js
                    .then(() => {
                        window.location.href = '/company'; // авторизация прошла успешно, переходим к главной странице. Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
                    })
                    .catch(e => {
                            this.loading = false;
                            this.message = e.response.data.message;
                        }
                    );
            }
        }
    };
</script>
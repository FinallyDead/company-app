<template>
    <div id="app">
      <nav class="navbar navbar-expand-lg" style="background-color: #8E8D8A">
        <div v-if="currentUser">
            <ul class="navbar-nav flex-row flex-wrap bd-navbar-nav">
                <li class="nav-item col-6 col-lg-auto">
                    <router-link to="/profile" class="nav-link py-2 px-0 px-lg-2 active navbar-brand text-light" >
                        <div class="enter-font" size="4" >
                            {{ currentUser.name }}
                        </div>
                    </router-link>
                </li>
                <li class="nav-item col-6 col-lg-auto">
                    <router-link to="/company" class="nav-link py-2 px-0 px-lg-2 active navbar-brand text-light">
                        <div class="enter-font" size="4">
                            Данные о компании
                        </div>
                    </router-link>
                </li>
                <li class="nav-item col-6 col-lg-auto">
                    <router-link to="/employeeList" class="nav-link py-2 px-0 px-lg-2 active navbar-brand text-light">
                        <div class="enter-font" size="4">
                            Список сотрудников
                        </div>
                    </router-link>
                </li>
                <li class="nav-item col-6 col-lg-auto">
                    <router-link to="/caseList" class="nav-link py-2 px-0 px-lg-2 active navbar-brand text-light">
                        <div class="enter-font" size="4">
                            Список задач
                        </div>
                    </router-link>
                </li>
                <li class="nav-item col-6 col-lg-auto">
                    <a href @click.prevent="logOut" class="nav-link py-2 px-0 px-lg-2 active navbar-brand text-light">
                        Выйти
                    </a>
                </li>
              </ul>
            </div>
        <div v-else>
            <ul class="navbar-nav flex-row flex-wrap bd-navbar-nav">
                <li class="nav-item col-6 col-lg-auto">
                    <router-link to="/login" class="navbar-brand text-light item">
                        Войти
                    </router-link>
                </li>
            </ul>
        </div>
      </nav>
    </div>
  </template>
  
  <script>
      export default {
    name: "NavBar",
    data() {
        return {};

    },
    computed: { 
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout'); 
            window.location.href = '/login'; 
        }
    }
};
  </script>
  
  <style>
    .item {
      margin-right: 5px;
    }
  </style>
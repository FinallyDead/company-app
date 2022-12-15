import { createWebHistory, createRouter } from "vue-router";
import store from "./store/index";

import Login from "./components/authorization/Login";
import Profile from "./components/authorization/Profile";
import Register from "./components/authorization/Register";

import Company from "./components/company/Company";
import BarChart from "./components/company/BarChart";

import EmployeeList from "./components/employee/EmployeeList";
import Employee from "./components/employee/Employee";
import AddEmployee from "./components/employee/AddEmployee";

import CaseList from "./components/case/CaseList";
import Case from "./components/case/Case";
import AddCase from "./components/case/AddCase";

const routes = [
    {
        path: "/company", 
        name: "company-data", 
        component: Company, 
        meta: {
            title: "Данные компании",
            requiredAuth: true
        }
    },
    {
        path: "/login",
        name: "login-user",
        component: Login,
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/register",
        name: "register-user",
        component: Register,
        meta: {
            title: "Регистрация"
        }
    },
    {
        path: "/profile",
        name: "profile-user",
        component: Profile,
        meta: {
            title: "Профиль пользователя",
            requiredAuth: true
        }
    },
    {
        path: "/employeeList", 
        name: "employee-list", 
        component: EmployeeList, 
        meta: {
            title: "Список работников",
            requiredAuth: true
        }
    },
    {
        path: "/employee/:id", 
        name: "employee-details", 
        component: Employee, 
        props: true,
        meta: {
            title: "Данные сотрудника",
            requiredAuth: true
        }
    },
    {
        path: "/addEmployee", 
        name: "add-employee", 
        component: AddEmployee, 
        meta: {
            title: "Нанять сотрудника",
            requiredAuth: true
        }
    },
    {
        path: "/caseList", 
        name: "case-list", 
        component: CaseList, 
        meta: {
            title: "Список задач",
            requiredAuth: true
        }
    },
    {
        path: "/cases/:id", 
        name: "case-details", 
        component: Case, 
        props: true,
        meta: {
            title: "Описание задачи",
            requiredAuth: true
        }
    },
    {
        path: "/addCase", 
        name: "add-case", 
        component: AddCase, 
        meta: {
            title: "Новый контракт",
            requiredAuth: true
        }
    },
    {
        path: "/barChart", 
        name: "bar-chart", 
        component: BarChart, 
        meta: {
            title: "График за квартал",
            requiredAuth: true
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes, 
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach(async (to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';

    // проверяем наличие токена и срок его действия
    const auth = await store.getters["auth/isTokenActive"];
    if (auth) {
        return next();
    }

    // если токена нет или его срок действия истёк, а страница доступна только авторизованному пользователю,
    // то переходим на страницу входа в систему (ссылка на /login)
    else if (!auth && to.meta.requiredAuth) {
        const user = JSON.parse(localStorage.getItem("user"));
        await store.dispatch("auth/refreshToken", user)
            .then(() => {
                return next();
            })
            .catch(() => {
                return next({path: "/login"});
            });
        return next({ path: "/login" });
    }
    return next();
});
export default router;
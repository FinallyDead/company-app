import { createWebHistory, createRouter } from "vue-router";

import Login from "./components/authorization/Login";
import Profile from "./components/authorization/Profile";
import Register from "./components/authorization/Register";

import Company from "./components/company/Company";

import EmployeeList from "./components/employee/EmployeeList";
import Employee from "./components/employee/Employee";
import AddEmployee from "./components/employee/AddEmployee";

import CaseList from "./components/case/CaseList";
import Case from "./components/case/Case";


const routes = [
    {
        path: "/company", 
        name: "company-data", 
        component: Company, 
        meta: {
            title: "Данные компании"
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
            title: "Профиль пользователя"
        }
    },
    {
        path: "/employeeList", 
        name: "employee-list", 
        component: EmployeeList, 
        meta: {
            title: "Список работников"
        }
    },
    {
        path: "/employee/:id", 
        name: "employee-details", 
        component: Employee, 
        props: true,
        meta: {
            title: "Данные сотрудника"
        }
    },
    {
        path: "/addEmployee", 
        name: "add-employee", 
        component: AddEmployee, 
        meta: {
            title: "Нанять сотрудника"
        }
    },
    {
        path: "/caseList", 
        name: "case-list", 
        component: CaseList, 
        meta: {
            title: "Список задач"
        }
    },
    {
        path: "/cases/:id", 
        name: "case-details", 
        component: Case, 
        props: true,
        meta: {
            title: "Описание задачи"
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes, 
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Главная страница';
    next();
});

export default router;
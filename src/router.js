import { createRouter, createWebHashHistory } from "vue-router";
import loginComponent from "@/components/login/login-component.vue";


const routes = [
    { path: '/', redirect: '/login'},
    { path: '/login', name: 'Login' , component: loginComponent},
    { path: '/:pathMatch(.*)*', redirect: '/login' },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;

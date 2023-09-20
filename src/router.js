import { createRouter, createWebHashHistory } from "vue-router";
import loginComponent from "@/components/login/login-component.vue";


const routes = [
    { path: '/',component: loginComponent },
    {path:'/login', component: loginComponent}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;

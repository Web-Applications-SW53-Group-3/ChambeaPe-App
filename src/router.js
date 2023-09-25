import { createRouter, createWebHashHistory } from "vue-router";
import loginComponent from "@/components/login/login-component.vue";
import employerPostComponent from "@/components/employer-post/employer-post-component.vue";


const routes = [
    {path:'/login', component: loginComponent},
    {path:'/post/:id', component: employerPostComponent},
    {path: '/post', redirect: '/post/1'},
    { path: '/',component: loginComponent },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;

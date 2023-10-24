import { createRouter, createWebHashHistory } from "vue-router";
import loginComponent from "@/components/login/login-component.vue";
import employerPostComponent from "@/components/employer-post/employer-post-component.vue";
import employerMypostsComponent from "@/components/employer-myposts/employer-myposts.component.vue";
import workerProfile from "@/components/worker-profile/worker-profile.vue";
import registerComponent from "@/components/register/form-register.component.vue";
import chatComponent from "@/components/chat/chat.component.vue";
// import jobPostComponent from "@/components/job-post/job-post.component.vue";
import HomeComponent from "@/components/home/home-component.vue";
import jobPostComponent from "@/components/job-post/job-post.component.vue";

const routes = [
    {path:'/login', component: loginComponent},
    {path:'/worker/:id',component: workerProfile},
    {path:'/posts/:id', component: employerPostComponent},
    {path: '/posts', component: employerMypostsComponent},
    {path: '/register', component: registerComponent},
    {path: '/job-post', component: jobPostComponent},
    { path: '/',component: loginComponent },
    { path: '/home', component: HomeComponent },
    { path: '/:pathMatch(.*)*', redirect: '/login' },
    { path: '/chat', component: chatComponent }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;

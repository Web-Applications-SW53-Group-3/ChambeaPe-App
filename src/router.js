import { createRouter, createWebHashHistory } from "vue-router";
import loginComponent from "@/components/login/login-component.vue";
import employerPostComponent from "@/components/employer-post/employer-post-component.vue";
import employerMypostsComponent from "@/components/employer-myposts/employer-myposts.component.vue";
import workerProfile from "@/components/worker-profile/worker-profile.vue";
import registerComponent from "@/components/register/form-register.component.vue";
import chatComponent from "@/components/chat/chat.component.vue";
import supportChatComponent from "@/components/chat/support-chat.component.vue";
import reviewComponent from "@/components/reviews/review.component.vue";
import HomeComponent from "@/components/home/home-component.vue";
import jobPostComponent from "@/components/job-post/job-post.component.vue";
import PostComponent from "@/components/job-post/post.component.vue";
import JwtService from "@/services/jwt.service.js";

const routes = [
    { path: '/login', component: loginComponent, meta: { requiresAuth: false } },
    { path: '/register', component: registerComponent },

    { path: '/profile/:id', component: workerProfile, meta: { requiresAuth: true } },
    { path: '/posts', component: employerMypostsComponent, meta: { requiresAuth: true } },
    { path: '/posts/:id', component: employerPostComponent, meta: { requiresAuth: true } },
    { path: '/job-post', component: PostComponent, meta: { requiresAuth: true } },
    { path: '/home', component: HomeComponent, meta: { requiresAuth: true } },
    { path: '/chat', component: chatComponent },
    { path: '/support-chat', component: supportChatComponent },
    { path: '/reviews', component: reviewComponent },
    { path: '/:pathMatch(.*)*', redirect: '/' },
    { path: '/', redirect: '/login' },
    { fullPath: '/login', redirect: '/login' },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const jwtService = new JwtService();
    const userToken = jwtService.getToken();

    if (to.path === '/') {
        if (userToken) {
            next({ path: '/home' });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!userToken) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;

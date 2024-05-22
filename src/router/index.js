import {createRouter, createWebHistory} from 'vue-router'
import Gallery from '../components/Gallery.vue'
import Intro from "@/components/Intro.vue";
import ErrorPanel from "@/components/ErrorPanel.vue";
import WelcomeView from "@/views/WelcomeView.vue";
import AppView from "@/views/AppView.vue";
import ProfileView from "@/views/ProfileView.vue";
import RegisterView from "@/views/RegisterView.vue";

const router = createRouter({
    // history: createWebHashHistory(import.meta.env.BASE_URL),
    history: createWebHistory("/"),

    routes: [
        {
            path: '/',
            name: 'default',
            component: WelcomeView,
        },
        {
            path: '/page',
            name: 'welcome',
            component: WelcomeView,
        },
        {
            path: '/app/:id',
            name: 'app',
            component: AppView,
            children: [
                {
                    path: '',
                    name: 'app',
                    component: Gallery
                }, {
                    path: 'another',
                    name: 'intro',
                    component: Intro
                },
                {
                    path: 'box',
                    name: 'box',
                    // route level code-splitting
                    // this generates a separate chunk (About.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import('../components/Box.vue')
                },
                {
                    path: 'gallery',
                    name: 'gallery',
                    component: Gallery
                },
            ],
        },
        {
            path: "/profile",
            name: "profile",
            component: ProfileView,
        },
        {
            path: "/register",
            name: "register",
            component: RegisterView,
        },
    ]
})

export default router

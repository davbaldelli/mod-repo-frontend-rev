import HelloWorld from "@/components/HelloWorld";
import TrackInput from "@/components/tracks/TrackInput";
import TrackList from "@/components/tracks/TracksList";
import TrackDetail from "@/components/tracks/TrackDetail";
import CarList from "@/components/cars/CarsList";
import CarInput from "@/components/cars/CarInput";
import CarDetail from "@/components/cars/CarDetail";
import NotFound from "@/components/404"
import {createRouter, createWebHistory} from "vue-router";
import CarEdit from "@/components/cars/CarEdit";
import TrackEdit from "@/components/tracks/TrackEdit";
import LogList from "@/components/logs/LogList";

const routes = [
    {
        path: '/', component: HelloWorld,
    },
    {
        path: '/tracks', name: "Tracks", component: TrackList, meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/cars', name: "Cars", component: CarList, meta: {
            requiresAuth: true,
        }
    },
    {
      path: '/logs', name: "Logs", component: LogList, meta: {
          requiresAuth: true,
        }
    },
    {
        path: '/track/new', component: TrackInput, meta: {
            requiresAuth: true,
            is_admin: true
        }
    },
    {
        path: '/track/edit/:id', name: 'TrackEdit', component: TrackEdit, meta: {
            requiresAuth: true,
            is_admin: true
        }
    },
    {
        path: '/car/new', component: CarInput, meta: {
            requiresAuth: true,
            is_admin: true,
        }
    },
    {
        path: '/car/edit/:id',
        name: 'CarEdit',
        component: CarEdit,
        meta: {
            requiresAuth: true,
            is_admin: true,
        }
    },
    {
        path: '/car/:id', name: 'car', component: CarDetail, meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/track/:id', name: 'track', component: TrackDetail, meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/404', component: NotFound
    },
]

export const router = new createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            if (to.matched.some(record => record.meta.is_admin)) {
                if (user.role === "admin") {
                    next()
                    console.log("ciao admin!")
                } else {
                    console.log("questa pagina non fa per te!")
                    next('/')
                }
            }
            next()
        } else {
            next('/')
        }
    } else {
        next()
    }
})
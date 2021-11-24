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

const initialCar = r => {return {initialCar : JSON.parse(r.params.initialCar)}}

const initialTrack = r => {return {initialTrack : JSON.parse(r.params.initialCar)}}

const routes = [
    {
        path: '/', component: HelloWorld,
    },
    {
        path: '/tracks', name:"Tracks" ,component: TrackList, meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/cars',name:"Cars", component: CarList, meta: {
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
        path: '/track/update',name : 'TrackEdit', component: TrackEdit, props : initialTrack,meta: {
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
        path: '/car/edit',
        name: 'CarEdit',
        component: CarEdit,
        props : initialCar,
        meta: {
            requiresAuth: true,
            is_admin: true,
        }
    },
    {
        path: '/car', name:'car', component: CarDetail, props: true, meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/track',name : 'track', component: TrackDetail, props: true, meta: {
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
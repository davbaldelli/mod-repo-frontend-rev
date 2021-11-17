import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import {router} from "@/_helpers";
import {store} from "@/_store";
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';


const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueAxios, axios)
app.use(PrimeVue)

if (!store.getters["authentication/isLogged"]) {
    store.dispatch('authentication/login', {'username': 'base', 'password': 'dumbass'})
}

app.mount('#app')

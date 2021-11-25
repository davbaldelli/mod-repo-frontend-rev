import {createApp} from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import {router} from "@/_helpers";
import {store} from "@/_store";
import PrimeVue from 'primevue/config';
import {createHead} from '@vueuse/head'
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const app = createApp(App)
const head = createHead()
app.use(ConfirmationService)
app.use(ToastService)
app.use(router)
app.use(store)
app.use(head)
app.use(VueAxios, axios)
app.use(PrimeVue)

let user = JSON.parse(localStorage.getItem('user'));
if (!user) {
    store.dispatch('authentication/login', {'username': 'base', 'password': 'dumbass'})
}

app.mount('#app')

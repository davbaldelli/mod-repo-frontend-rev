<template class="p-grid p-m-0">
  <div class="p-grid p-m-0">
    <nav class="p-col-12 p-p-0 sticky-top">
      <Menubar :model="menuItems"/>
    </nav>
    <main class="p-col-12">
      <router-view :key="routerViewKey" v-slot="{Component}">
        <keep-alive :include="['CarList','TracksList']">
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
      <Dialog v-model:visible="display" :modal="true" header="Login" @hide="resetModal">
        <div class="p-py-2">
          <form class="p-fluid" v-on:keyup.enter="handleSubmit(!v$.$invalid)"
                @submit.prevent="handleSubmit(!v$.$invalid)">
            <div class="p-field">
              <InputText id="username-1" v-model="v$.username.$model"
                         :class="{'p-invalid':v$.username.$invalid && submitted}"/>
            </div>
            <div class="p-field">
              <Password id="password" v-model="v$.password.$model"
                        :class="{'p-invalid':v$.password.$invalid && submitted}" :feedback="false"
                        toggleMask></Password>
            </div>
            <Button class="p-mt-2" label="Submit" type="submit"/>
          </form>
        </div>
      </Dialog>
    </main>
  </div>
</template>

<script>
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from "primevue/button";
import useVuelidate from "@vuelidate/core";
import required from "vuelidate/lib/validators/required";
import {useHead} from "@vueuse/head";
import {computed, reactive} from "vue";


export default {
  name: 'App',
  components: {
    Menubar,
    Dialog,
    InputText,
    Password,
    Button,
  },
  emits: ['loggedOut', 'loggedIn'],
  setup() {
    const siteData = reactive({
      title: `AC Mod Repository`,
      description: `A repository of high quality ac mods`,
    })

    useHead({
      // Can be static or computed
      title: computed(() => siteData.title),
      meta: [
        {
          name: `description`,
          content: computed(() => siteData.description),
        },
      ],
    })

    return {v$: useVuelidate()}
  },
  data() {
    return {
      routerViewKey: 0,
      username: "",
      password: "",
      menuItems: [
        {
          label: 'Home', icon: 'fas fa-home', to: '/',
        },
        {
          label: 'Cars', to: '/cars', icon: 'fas fa-car'
        },
        {
          label: 'Tracks', to: '/tracks', icon: 'fas fa-road'
        },
        {
          label: 'Logs', to: '/logs', icon: 'fas fa-clipboard-list'
        },
        {
          separator: true, style: 'width = 100%'
        },
        {
          label: 'Login', icon: 'fas fa-user', command: this.toggleDialog, visible: () => !this.logged,
        },
        {
          label: this.loggedUsername, icon: 'fas fa-user', visible: () => this.logged,
          items: [
            {
              label: 'Add Car',
              to: '/car/new',
              visible: () => this.loggedUsername === "admin",
              icon: 'fas fa-plus'
            },
            {
              label: 'Add Track',
              to: '/track/new',
              visible: () => this.loggedUsername === "admin",
              icon: 'fas fa-plus'
            },
            {
              label: 'Logout', command: this.logOut, icon: 'fas fa-sign-out-alt'
            },
          ]
        },
      ],
      display: false,
      submitted: false,
    }
  },
  mounted() {
    this.menuItems[5].label = this.loggedUsername
  },
  validations() {
    return {
      username: {
        required
      },
      password: {
        required
      },
    }
  },
  computed: {
    logged() {
      return this.$store.getters['authentication/isLogged']
    },
    adminLogged() {
      return this.$store.getters["authentication/isAdmin"]
    },
    alert() {
      return this.$store.getters["alert/alert"]
    },
    loggedUsername() {
      return this.$store.getters['authentication/user'].username
    }
  },
  watch: {
    $route() {
      // clear alert on location change
      this.$store.dispatch('alert/clear');
    },
    loggedUsername() {
      console.log(this.loggedUsername)
      this.menuItems[5].label = this.loggedUsername
    },
    alert: {
      async handler(value) {
        if (value.message && value.message.status === 401) {
          if (this.$store.getters['authentication/user'].username === 'base') {
            await this.$store.dispatch('authentication/login', {'username': 'base', 'password': 'dumbass'})
                .then(() => this.$store.dispatch('alert/clear'))
            this.$emit('loggedOut')
          } else {
            this.toggleDialog()
            this.username = this.$store.getters['authentication/user'].username
          }
        }
      }, deep: true
    },
  },
  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        return;
      }

      this.$store.dispatch('authentication/login', {username: this.username, password: this.password})
          .then(() => {
            this.$store.dispatch('alert/clear')
            this.$emit("logged");
            this.closeDialog();
          })
          .catch(() => {
            alert("wrong username or password!")
          })

    },
    toggleDialog() {
      this.display = true
    },
    closeDialog() {
      this.display = false
    },
    resetModal() {
      if (!this.submitted && this.alert.message && this.alert.message.status === 401) {
        this.logOut()
      }
      this.username = ""
      this.password = ""
      this.submitted = false
    },
    async logOut() {
      this.closeDialog()
      await this.$store.dispatch('authentication/login', {'username': 'base', 'password': 'dumbass'}).then(() =>
          this.$store.dispatch('alert/clear')
      )
      this.$emit('loggedOut')
    }
  }
}
</script>
<style>
.p-menu-separator {
  width: 100%;
}

.p-menubar-root-list {
  width: 99%;
}

.p-menubar .p-submenu-list {
  width: 100% !important;
}

.responsive-image {
  max-width: 100%;
}

.sticky-top {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1020;
}

body {
  margin: 0 !important;
}

.badge-warning {
  color: #212529 !important;
  background-color: #ffc107;
}

.badge-secondary {
  color: #fff;
  background-color: #6c757d;
}

.p-tree {
  border: none !important;
  padding: 0 !important;
}


</style>

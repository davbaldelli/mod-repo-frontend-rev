<template>
  <div class="p-grid p-m-0">
    <div class="p-col-12 p-p-0 sticky-top" >
      <Menubar  :model="menuItems" :end="menuItems"/>
    </div>
    <div class="p-col-12">
      <router-view :key="routerViewKey"></router-view>
      <Dialog header="Login" v-model:visible="display" @hide="resetModal" :modal="true">
        <div class="card p-py-2">
          <form v-on:keyup.enter="handleSubmit(!v$.$invalid)" @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
            <div class="p-field">
              <InputText id="username-1" v-model="v$.username.$model"
                         :class="{'p-invalid':v$.username.$invalid && submitted}"/>
            </div>
            <div class="p-field">
              <Password id="password" v-model="v$.password.$model"
                        :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask></Password>
            </div>
            <Button type="submit" label="Submit" class="p-mt-2"/>
          </form>
        </div>
      </Dialog>
    </div>
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


export default {
  name: 'App',
  components: {
    Menubar,
    Dialog,
    InputText,
    Password,
    Button,
  },
  setup: () => ({v$: useVuelidate()}),
  data() {
    return {
      routerViewKey: 0,
      username: "",
      password: "",
      menuItems: [
        {
          label: 'Home', icon: 'pi pi-fw pi-home', to: '/',
        },
        {
          label: 'Cars', to: '/cars',
        },
        {
          label: 'Tracks', to: '/tracks',
        },
        {
          separator: true, style:'width = 100%'
        },
        {
          label: 'Login', icon: 'pi pi-fw pi-user', command : this.toggleDialog, visible : () => !this.logged,
        },
        {
          label: 'User', icon: 'pi pi-fw pi-user', visible : () => this.logged,
          items : [
            {
              label: 'Add Car',to : '/car/new', visible : () => this.loggedUsername === "admin"
            },
            {
              label: 'Add Track',to : '/track/new', visible : () => this.loggedUsername === "admin"
            },
            {
              label: 'Logout', command : this.logOut
            },
          ]
        },
      ],
      display: false,
      submitted: false,
    }
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
            this.$emit("loggedIn");
            this.toggleDialog();
          })
          .catch(() => {
            alert("wrong username or password!")
          })

    },
    toggleDialog() {
      this.display = !this.display
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

  .p-menubar-root-list{
    width: 99%;
  }
  .p-menubar .p-submenu-list{
    width: 100% !important;
  }

  .responsive-image{
    max-width:100%;
  }

  .sticky-top{
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1020;
  }

  body{
    margin: 0!important;
  }

</style>

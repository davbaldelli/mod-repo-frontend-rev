<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-lg-4"></div>
      <div class="col-12 col-lg-4">
        <CarForm v-if="car" :initial-value="car" @submit="onSubmit"></CarForm>
      </div>
      <div class="col-12 col-lg-4"></div>
    </div>
  </div>
  <Dialog header="Success!" v-model:visible="success" @hide="closeSuccess" :modal="true">
    {{successMessage}}
    <template #footer>
      <Button label="OK" icon="pi pi-check" @click="closeSuccess" autofocus></Button>
    </template>
  </Dialog>
  <Dialog header="Failure :(" v-model:visible="fail" :modal="true">{{failMessage}}
    <template #footer>
      <Button label="OK" icon="pi pi-check" @click="this.fail = false" autofocus></Button>
    </template>
  </Dialog>
</template>

<script>
import CarForm from "@/components/cars/CarForm";
import Dialog from 'primevue/dialog'
import Button from "primevue/button";
export default {
  props: ['initialCar'],
  name: "CarEdit",
  components: {
    CarForm,
    Dialog,
    Button
  },
  data(){
    return{
      id : this.$route.params.id,
      success : false,
      successMessage : "",
      fail : false,
      failMessage : "",
    }
  },
  computed :{
    car() {
      return this.$store.getters['cars/getCarById'](this.id)
    },
  },
  mounted() {
    this.$store.dispatch('cars/getAll')
  },
  methods: {
    onSubmit(car) {
      this.$store.dispatch('cars/updateCar', car)
          .then(() => {
            this.success = true
            this.successMessage = "Car edited successfully"
          })
          .catch((e) => {
            this.fail = true
            this.failMessage = e.data.error
          })
    },
    closeSuccess(){
      this.$router.back()
    },
  },
}
</script>

<style scoped>

</style>
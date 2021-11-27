<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-lg-4"></div>
      <div class="col-12 col-lg-4">
        <CarForm :initial-value="car" @submit="onSubmit"></CarForm>
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
      emptyCar : {
        Torque: 0,
        BHP: 0,
        Weight: 0,
        TopSpeed: 0,
        DownloadLink: "",
        Image: "",
        ModelName: "",
        Author: {
          Name: "",
          Link: "",
        },
        Brand: {
          Name: "",
          Nation: {
            Name: "",
            Code: "",
          },
        },
        Year: 0,
        Drivetrain: "",
        Transmission: "",
        Categories: [],
        Premium: false,
      },
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
      this.$router.push("/cars")
    },
  },
}
</script>

<style scoped>

</style>
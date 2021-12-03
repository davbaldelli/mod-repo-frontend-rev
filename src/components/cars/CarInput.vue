<template>
  <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-lg-4"></div>
        <div class="col-12 col-lg-4">
          <CarForm @submit="onSubmit" :initial-value="form"></CarForm>
        </div>
        <div class="col-12 col-lg-4"></div>
      </div>
    <Toast position="center"/>
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
import CarForm from '@/components/cars/CarForm'
import Dialog from "primevue/dialog";
import Button from "primevue/button";

export default {
  name: "CarInput",
  components : {
    CarForm,
    Dialog,
    Button,
  },
  data() {
    return {
      form: {
        torque: 0,
        bhp: 0,
        weight: 0,
        topSpeed: 0,
        downloadLink: "",
        image: "",
        modelName: "",
        author: {
          name: "",
          link: "",
        },
        brand: {
          name: "",
          nation: {
            name: "",
            code: "",
          },
        },
        year: 0,
        drivetrain: "",
        transmission: "",
        categories: [],
        premium: false,
        rating: 0,
        version : "",
      },
      success : false,
      successMessage : "",
      fail : false,
      failMessage : "",
    }
  },
  methods: {
    onSubmit(car){
      this.$store.dispatch('cars/addCar', car)
          .then(() => {
            this.success = true
            this.successMessage = "Car created successfully"
          })
          .catch((e) => {
            this.fail = true
            this.failMessage = e.data.error
          })
    },
    closeSuccess(){
      this.$router.back()
    },
  }
}
</script>

<style scoped>

</style>
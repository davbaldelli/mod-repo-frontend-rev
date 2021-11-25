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
</template>

<script>
import CarForm from '@/components/cars/CarForm'
import Toast from 'primevue/toast';

export default {
  name: "CarInput",
  components : {
    CarForm,
    Toast,
  },
  data() {
    return {
      form: {
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
    }
  },
  methods: {
    onSubmit(car){
      this.$store.dispatch('cars/addCar', car)
          .then(() => this.$toast.add({severity:'success', summary: 'Car created successfully', detail:'Car created', life: 3000}))
          .catch((e) => this.$toast.add({severity:'error', summary: 'Error crating the car', detail:e.data.error, life: 7000}))
    }
  }
}
</script>

<style scoped>

</style>
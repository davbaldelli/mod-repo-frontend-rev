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
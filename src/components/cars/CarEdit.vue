<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-lg-4"></div>
      <div class="col-12 col-lg-4">
        <CarForm :initial-value="initialCar" @submit="onSubmit"></CarForm>
      </div>
      <div class="col-12 col-lg-4"></div>
    </div>
  </div>
  <Toast position="center"/>
</template>

<script>

import CarForm from "@/components/cars/CarForm";
import Toast from "primevue/toast";

export default {
  props: ['initialCar'],
  name: "CarEdit",
  components: {
    CarForm,
    Toast
  },
  methods: {
    onSubmit(car) {
      this.$store.dispatch('cars/updateCar', car)
          .then(() => this.$toast.add({severity:'success', summary: 'Car edited successfully', detail:'Car created', life: 3000}))
          .catch((e) => this.$toast.add({severity:'error', summary: 'Error editing the car', detail:e.data.error, life: 7000}))
    }
  },
}
</script>

<style scoped>

</style>
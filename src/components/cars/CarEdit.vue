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
</template>

<script>

import CarForm from "@/components/cars/CarForm";

export default {
  props: ['initialCar'],
  name: "CarEdit",
  components: {
    CarForm
  },
  methods: {
    onSubmit(car) {
      this.$store.dispatch('cars/updateCar', car)
          .then(() => alert(`Macchina inserita correttamente: ${JSON.stringify(this.$store.getters["alert/alert"].message.data)}`))
          .catch(() => alert(`Errore nell'inserimento dell'auto : ${JSON.stringify(this.$store.getters["alert/alert"].message.data)}`))
    }
  },
}
</script>

<style scoped>

</style>
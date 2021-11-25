<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-lg-4"></div>
      <div class="col-12 col-lg-4">
        <CarForm :initial-value="form" @submit="onSubmit"></CarForm>
      </div>
      <div class="col-12 col-lg-4"></div>
    </div>
  </div>
</template>

<script>
import CarForm from '@/components/cars/CarForm'

export default {
  name: "CarInput",
  components: {
    CarForm
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
    onSubmit(car) {
      this.$store.dispatch('cars/addCar', car)
          .then(() => alert(`Macchina inserita correttamente: ${JSON.stringify(this.$store.getters["alert/alert"].message.data)}`))
          .catch(() => alert(`Errore nell'inserimento dell'auto : ${JSON.stringify(this.$store.getters["alert/alert"].message.data)}`))
    }
  }
}
</script>

<style scoped>

</style>
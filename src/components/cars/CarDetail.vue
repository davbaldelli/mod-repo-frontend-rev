<template>
  <div class="p-grid">
    <div class="p-col-12 p-lg-2 p-xl-4"></div>
    <div class="p-col-12 p-lg-8 p-xl-4 text-center">
      <div v-if="this.car" class="p-col-12">
        <div class="p-col-12">
          <img :src="car.Image" alt="Fluid image" class="rounded-3 card-img">
        </div>
        <div class="p-col-12 p-grid p-text-left p-p-3">
          <div class="p-col-12"><h4><strong>Technical Specs</strong></h4></div>
          <div class="p-col-12 p-sm-6 p-pb-0 p-p-sm-2">
            <strong>Model Name</strong> {{car.ModelName}}<hr>
            <strong>Brand</strong> {{car.Brand.Name}}<hr>
            <strong>Nation</strong> {{car.Brand.Nation.Name}}<hr>
            <strong>Year</strong> {{car.Year}}<hr>
            <strong>Author</strong> <a :href="car.Author.Link">{{car.Author.Name}}</a><hr>
          </div>
          <div class="p-col-12 p-sm-6 p-pt-0 p-p-sm-2">
            <strong>Power</strong> {{car.BHP}} BHP<hr>
            <strong>Torque</strong> {{car.Torque}} Nm<hr>
            <strong>Max Speed</strong> {{car.TopSpeed}} Km/h<hr>
            <strong>Drivetrain</strong> {{car.Drivetrain}}<hr>
            <strong>Transmission</strong> {{car.Transmission}}<hr>
          </div>
          <div class="p-col-12"><Button style="width: 100%" label="Download" @click="openInNewTab(car.DownloadLink)"></Button></div>
        </div>
      </div>
    </div>
    <div class="p-col-12 p-lg-2 p-xl-4"></div>
  </div>
</template>

<script>

import Button from "primevue/button";

export default {
  name: "CarDetail",
  components:{
    Button,
  },
  data(){
    return{
      model : this.$route.params.model,
      brand : this.$route.params.brand,
      year : this.$route.params.year
    }
  },
  computed :{
    car(){
      return this.$store.getters['cars/getCarByModel'](this.model, this.year, this.brand)
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$store.dispatch('cars/getAll')
    },
    openInNewTab(url) {
      window.open(url, '_blank').focus();
    },
  },
}
</script>

<style scoped>

</style>
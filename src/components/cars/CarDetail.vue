<template>
  <div class="p-grid">
    <div class="p-col-12 p-lg-2 p-xl-4"></div>
    <div class="p-col-12 p-lg-8 p-xl-4">
      <div v-if="this.car" class="p-grid">
        <div class="p-col-12">
          <img :src="car.Image" alt="car thumbnail" class="rounded-3 card-img">
        </div>
        <div class="p-col-12">
          <div class="p-grid">
            <div class="p-col-12 ">
              <h1 class="display-4">{{`${car.Brand.Name} ${car.ModelName}`}}</h1>
            </div>
            <div class="p-col-12 p-p-3">
              <div class="p-grid p-card">
                <div class="p-col-12 p-sm-6 p-p-sm-3 p-pt-3 p-pb-0">
                  <strong>Model Name</strong> {{car.ModelName}}<hr>
                  <strong>Brand</strong> {{car.Brand.Name}}<hr>
                  <strong>Nation</strong> {{car.Brand.Nation.Name}}<hr>
                  <strong>Year</strong> {{car.Year}}<hr>
                  <strong>Author</strong> <a :href="car.Author.Link">{{car.Author.Name}}</a><hr>
                </div>
                <div class="p-col-12 p-sm-6 p-p-sm-3 p-pt-0">
                  <strong>Power</strong> {{car.BHP}} BHP<hr>
                  <strong>Torque</strong> {{car.Torque}} Nm<hr>
                  <strong>Max Speed</strong> {{car.TopSpeed}} Km/h<hr>
                  <strong>Drivetrain</strong> {{car.Drivetrain}}<hr>
                  <strong>Transmission</strong> {{car.Transmission}}<hr>
                </div>
              </div>
            </div>
            <div class="p-col-12"><Button style="width: 100%" label="Download" @click="openInNewTab(car.DownloadLink)"></Button></div>
          </div>
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
      id : this.$route.params.id,
    }
  },
  computed :{
    car(){
      return this.$store.getters['cars/getCarById'](this.id)
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
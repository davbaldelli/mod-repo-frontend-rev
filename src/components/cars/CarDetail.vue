<template>
  <div class="p-grid">
    <div class="p-col-12 p-lg-2 p-xl-4"></div>
    <div class="p-col-12 p-lg-8 p-xl-4">
      <div class="p-grid">
        <div v-if="!car && !carLoading" class="p-col-12">
          <h3 class="p-mt-4">I'm sorry, but I can't find the car that you are looking for. You can turn back to the <router-link to="/cars/">cars list</router-link> and see if that exits.</h3>
        </div>
        <div v-if="carLoading" class="p-col-12">
          <div class="p-grid">
            <div class="p-col-12">
              <Skeleton height="450px" width="100%"></Skeleton>
            </div>
            <div class="p-col-12">
              <div class="p-grid">
                <div class="p-col-12">
                  <Skeleton height="60px" width="70%"></Skeleton>
                </div>
                <div class="p-col-12 p-p-3">
                  <div class="p-grid p-card">
                    <div class="p-col-12 p-sm-6 p-p-sm-3 p-pt-3 p-pb-0">
                      <Skeleton class="p-m-2" height="30px" width="auto"></Skeleton>
                      <Skeleton class="p-m-2" height="30px" width="auto"></Skeleton>
                      <Skeleton class="p-m-2" height="30px" width="auto"></Skeleton>
                      <Skeleton class="p-m-2" height="30px" width="auto"></Skeleton>
                      <Skeleton class="p-m-2" height="30px" width="auto"></Skeleton>
                    </div>
                    <div class="p-col-12 p-sm-6 p-p-sm-3 p-pt-0">
                      <Skeleton class="p-m-2" height="30px" width="auto"></Skeleton>
                      <Skeleton class="p-m-2" height="30px" width="auto"></Skeleton>
                      <Skeleton class="p-m-2" height="30px" width="auto"></Skeleton>
                      <Skeleton class="p-m-2" height="30px" width="auto"></Skeleton>
                      <Skeleton class="p-m-2" height="30px" width="auto"></Skeleton>
                    </div>
                  </div>
                </div>
                <div class="p-col-12"><Skeleton class="p-p-2" height="40px"></Skeleton></div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="car" class="p-col-12">
          <div class="p-grid">
            <div class="p-col-12">
              <img :src="car.image" alt="car thumbnail" class="rounded-3 card-img">
            </div>
            <div class="p-col-12">
              <div class="p-grid">
                <div class="p-col-12">
                  <h1 class="display-4">{{`${car.brand.name} ${car.modelName}`}}</h1>
                </div>
                <div class="p-col-12 p-p-3">
                  <div class="p-grid p-card">
                    <div class="p-col-12 p-sm-6 p-p-sm-3 p-pt-3 p-pb-0">
                      <strong>Model Name</strong> {{car.modelName}}<hr>
                      <strong>Brand</strong> {{car.brand.name}}<hr>
                      <strong>Nation</strong> {{car.brand.nation.name}}<hr>
                      <strong>Year</strong> {{car.year}}<hr>
                      <strong>Author</strong> <a :href="car.author.link">{{car.author.name}}</a><hr>
                    </div>
                    <div class="p-col-12 p-sm-6 p-p-sm-3 p-pt-0">
                      <strong>Power</strong> {{car.bhp}} BHP<hr>
                      <strong>Torque</strong> {{car.torque}} Nm<hr>
                      <strong>Max Speed</strong> {{car.topSpeed}} Km/h<hr>
                      <strong>Drivetrain</strong> {{car.drivetrain}}<hr>
                      <strong>Transmission</strong> {{car.transmission}}<hr>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="p-col-12"><Button style="width: 100%" label="Download" @click="openInNewTab(car.downloadLink)"></Button></div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-col-12 p-lg-2 p-xl-4"></div>
  </div>
</template>

<script>

import Button from "primevue/button";
import Skeleton from "primevue/skeleton";

export default {
  name: "CarDetail",
  components:{
    Button,
    Skeleton,
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
    carLoading(){
      return this.$store.getters['cars/loadingCars']
    }
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
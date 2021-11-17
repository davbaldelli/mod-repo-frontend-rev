<template>
  <div class="p-grid p-p-2">
    <div class="p-col-0 p-md-2 p-lg-4">
    </div>
    <div class="p-col-12 p-md-8 p-lg-4">
      <Card v-for="car in this.cars" :key="car.ModelName" class="p-my-2">
        <template #content class="p-py-1">
          <div class="p-grid p-m-0">
            <div class="p-col-12 p-md-4 p-d-flex p-ai-center">
              <img :src="car.Image" alt="car thumbnail" class="responsive-image"/>
            </div>
            <div class="p-col-12 p-md-8">

            </div>
          </div>
        </template>
      </Card>
    </div>
    <div class="p-col-0 p-md-2 p-lg-4"></div>
  </div>
</template>

<script>
import Card from "primevue/card"
export default {
  name: "CarList",
  components: {
    Card,
  },
  computed : {
    cars() {
      return this.$store.getters['cars/cars']
    }
  },
  mounted() {
    this.initiate()
  },
  methods: {
    initiate(){
     this.$store.dispatch('cars/getAll')
    }
  }
}
</script>

<style>
  .p-card .p-card-content{
    padding: 0 !important;
  }
  .p-card .p-card-body {
    padding: 0.25rem !important;
  }
</style>
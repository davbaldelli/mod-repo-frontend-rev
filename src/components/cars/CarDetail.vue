<template>
  <div class="p-grid">
    <div class="p-col-12 p-md-12 p-lg-3"></div>
    <div class="p-col-12 p-md-12 p-lg-6 text-center">
      <h1 class="display-6 p-mt-6">Per questo contenuto ti tocca aspettare ancora un po'...</h1>
      <h1 class="display-6">
        Nel frattempo fatti un giro sul mio profilo <a target="_blank" href="https://www.instagram.com/driving.sim.pic/">instagram</a>
      </h1>
      <h1 class="display-6">Ci vediamo presto!</h1>
    </div>
    <div class="p-col-12 p-md-12 p-lg-3"></div>
  </div>
</template>

<script>
export default {
  name: "CarDetail",
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
  },
}
</script>

<style scoped>

</style>
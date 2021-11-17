<template>
  <div class="p-grid p-p-2">
    <div class="p-col-0 p-md-2 p-lg-3">
      <TreeSelect v-model="selectedBrand" :options="filterOpts" display="chip" selection-mode="checkbox" placeholder="Select Items"></TreeSelect>
    </div>
    <div class="p-col-12 p-md-8 p-lg-6">
      <div class="col-12">
        <Paginator :rows="pageRows" v-model:first="offset" :total-records="cars.length"></Paginator>
      </div>
      <div class="p-col-12">
        <div v-for="car in pageCars" :key="car.ModelName" class="card mb-2">
          <div class="row no-gutters">
            <div class="d-flex align-items-center col">
              <img :src="car.Image" alt="Fluid image " class="rounded-4 m-1 card-img">
            </div>
            <div class="mh-100 col-md-8">
              <div class="card-body p-3 h-100">
                <h4 class="card-title mb-2">
                  <router-link :to="{name : 'car', query:{}}">{{ `${car.Brand.Name} ${car.ModelName}` }}</router-link>
                </h4>
                <h6 class="card-subtitle mb-3 mt-1 text-muted"></h6>
                <p class="card-text ml-2 mb-1">
                  <strong>Year: </strong>{{ car.Year }}
                  <br>
                  <strong>Author: </strong><a :href="car.Author.Link" rel="noopener" target="_blank">{{
                    car.Author.Name
                  }}</a>
                  <br>
                  <strong>{{ car.Transmission }}</strong>,
                  <strong>{{ car.Drivetrain }}</strong>,
                  <strong>BHP:</strong>{{ car.BHP }},
                  <strong>Nm: </strong>{{ car.Torque }},
                  <strong>Kg:</strong>{{ car.Weight }},
                  <strong>Top Speed:</strong>{{ car.TopSpeed }},
                </p>
              </div>
            </div>
          </div>
          <div class="card-footer p-1 text-center">
            <a :href="car.DownloadLink" class="btn btn-primary"
               rel="noopener" target="_blank">Download</a>
          </div>
        </div>
      </div>
    </div>
    <div class="p-col-0 p-md-2 p-lg-3"></div>
  </div>
</template>

<script>
import TreeSelect from 'primevue/treeselect'
import Paginator from 'primevue/paginator';
export default {

  name: "CarList",
  components: {
    TreeSelect,
    Paginator
  },
  data() {
    return {
      selector: cars => cars,
      selectedBrand : "",
      pageRows : 20,
      offset : 0,
    }
  },
  computed: {
    filteredCars() {
      return this.selector(this.cars)
    },
    pageCars() {
      return this.filteredCars.slice(this.offset, this.offset + this.pageRows)
    },
    cars() {
      return this.$store.getters['cars/cars']
    },
    brandGrouped() {
      return this.$store.getters['cars/brands'].reduce((r,a) => {
        r.set(a.Nation.Name, [...r.get(a.Nation.Name) || [], a.Name])
        return r
      }, new Map())
    },
    filterOpts() {
      let items = []
      this.brandGrouped.forEach((value, key) => {
        let opt = {label : key, children : []}
        value.forEach(brand => opt.children.push({label: brand, data: brand}))
        items.push(opt)
      })
      return items
    },
    authors() {
      return this.$store.getters['cars/authors']
    },
    categories() {
      return this.$store.getters['cars/types']
    }
  },
  mounted() {

  },
  created() {
    this.initiate()
    //this.$parent.$on('loggedIn', this.initiate)
    //this.$parent.$on('loggedOut', this.initiate)
  },
  methods: {
    initiate() {
      this.getAllCars()
      this.$store.dispatch('cars/getCarAuthors')
      this.$store.dispatch('cars/getCarBrands')
      this.$store.dispatch('cars/getCarTypes')
    },
    getAllCars(){
      this.$store.dispatch('cars/getAll')
    }

  }
}
</script>

<style>
.p-card .p-card-content {
  padding: 0 !important;
}

.p-card .p-card-body {
  padding: 0.25rem !important;
}
</style>
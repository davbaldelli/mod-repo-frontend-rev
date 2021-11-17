<template>
  <div class="p-grid p-p-2">
    <div class="p-col-12 text-center">
      <h1>Cars</h1>
    </div>
    <div class="p-col-12">
      <Paginator :rows="pageRows" v-model:first="offset" :total-records="cars.length"></Paginator>
    </div>
    <div class="p-col-0 p-md-2 p-lg-3">
      <Tree @node-select="nodeSelected" @node-unselect="nodeUnSelected" v-model:selection-keys="selectedNodes" :value="filterOpts" selection-mode="checkbox" placeholder="Select Items" :loading = "this.$store.getters['cars/loadingBrands']"></Tree></div>
    <div class="p-col-12 p-md-8 p-lg-6">
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
import Tree from 'primevue/tree'
import Paginator from 'primevue/paginator';
import {carsFilters} from "@/_helpers";
//import {carsFilters} from "@/_helpers";
export default {

  name: "CarList",
  components: {
    Tree,
    Paginator
  },
  data() {
    return {
      selectedBrands : [],
      selectedNodes : "",
      selector: cars => cars,
      pageRows : 20,
      offset : 0,
    }
  },
  watch: {
    selectedNodes(){
      this.updateSelectedNodes()
    },

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
      let i = 0;
      this.brandGrouped.forEach((value, key) => {
        let opt = {label : key, children : [] , key : i.toString(), data : key, nation : true}
        let j = 0;
        value.forEach(brand => {
          opt.children.push({label: brand, data: brand, key : `${i}-${j}`})
          j++
        })
        items.push(opt)
        i++
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
    this.initiate()
  },
  created() {
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
    getAllCars() {
      this.$store.dispatch('cars/getAll')
    },
    nodeSelected(){
    },
    nodeUnSelected(){
    },
    async updateSelectedNodes(){
      this.selectedBrands = []
      this.filterOpts.forEach(e => {
        e.children.forEach(c => {
          if (this.selectedNodes[c.key] && this.selectedNodes[c.key].checked){
            this.selectedBrands.push(c.data)
          }
        })
      })
      if(this.selectedBrands.length !== 0)
        this.selector = carsFilters.filterByBrands(this.selectedBrands)
      else
        this.selector = c => c
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
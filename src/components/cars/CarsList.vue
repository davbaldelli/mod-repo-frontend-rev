<template>
  <div class="p-grid p-p-2">
    <div class="p-col-12 text-center">
      <h1>Cars</h1>
    </div>
    <div class="p-col-12">
      <Paginator :rows="pageRows" v-model:first="offset" :total-records="filteredCars.length"></Paginator>
    </div>
    <div class="p-col-12 p-md-2 p-lg-3">
      <div @click="resetFilters" class="btn btn-primary p-mb-2 d-block">Remove All Filters</div>
      <Panel class="p-mb-2" header="Filter By Manufacturer" :toggleable="true" :collapsed="true">
        <Tree v-model:selection-keys="selectedBrandsNodes" selectionMode="single"
              :value="brandsFilterOpts" placeholder="Select Brand"
              :loading="this.$store.getters['cars/loadingBrands']" @nodeSelect="brandSelected"></Tree>
      </Panel>
      <Panel header="Filter By Category" :toggleable="true" :collapsed="true">
        <ListBox :filter="true" v-model="selectedCategory" :options="categories" option-label="name" list-style="max-height:500px"></ListBox>
      </Panel>
    </div>
    <div class="p-col-12 p-md-8 p-lg-6">
      <div class="p-col-12">
        <div class="p-col-12 p-p-0 text-end">
          <Dropdown @change="sort" class="p-mr-5 p-mb-2" :options="sortOpts" placeholder="Sort By" option-label="label" option-value="value" ></Dropdown>
        </div>
        <div v-for="car in pageCars" :key="car.ModelName" class="card mb-2">
          <div class="row no-gutters">
            <div class="d-flex align-items-center col">
              <img :src="car.Image" alt="Fluid image " class="rounded-4 m-1 card-img">
            </div>
            <div class="mh-100 col-md-8">
              <div class="card-body p-p-3 h-100">
                <h3 class="card-title p-mb-2">
                  <router-link :to="{name : 'car', query:{}}">{{ `${car.Brand.Name} ${car.ModelName}` }}</router-link>
                </h3>
                <div class="card-subtitle p-ml-1 p-mb-3 p-mt-1 text-muted">
                  <span class="badge badge-secondary p-mr-1" v-for="category in car.Categories"
                        :key="category.Name">{{ category.Name }}</span>
                  <span class="badge badge-warning" v-if="car.Premium">Premium</span>
                </div>
                <p class="card-text p-ml-2 p-mb-1">
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
import Panel from 'primevue/panel';
import ListBox from 'primevue/listbox';
import Dropdown from 'primevue/dropdown';
import {carsFilters, carSort} from "@/_helpers";


export default {

  name: "CarList",
  components: {
    Tree,
    Paginator,
    Panel,
    ListBox,
    Dropdown,
  },
  data() {
    return {
      sortOpts : [
        {label : 'Name', value : 'name'},
        {label : 'Submission Date', value: 'submission'}
      ],
      selectedBrandsNodes: Object(),
      selector: cars => cars,
      pageRows: 20,
      offset: 0,
      selectedCategory : null,
    }
  },
  watch: {
    userRole() {
      if (this.userRole) {
        this.initiate()
      }
    },
    selectedCategory() {
      if(this.selectedCategory !== "") {
        this.selectedBrandsNodes = Object()
        this.selector = carsFilters.filterByCategory(this.selectedCategory.name)
      }
    }
  },
  computed: {
    userRole() {
      return this.$store.getters['authentication/user'].role
    },
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
      return this.$store.getters['cars/brands'].reduce((r, a) => {
        r.set(a.Nation.Name, [...r.get(a.Nation.Name) || [], a.Name])
        return r
      }, new Map())
    },
    brandsFilterOpts() {
      let items = []
      let i = 0;
      this.brandGrouped.forEach((value, key) => {
        let opt = {label: key, children: [], key: i.toString(), data: key, nation: true}
        let j = 0;
        value.forEach(brand => {
          opt.children.push({label: brand, data: brand, key: `${i}-${j}`})
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
      return this.$store.getters['cars/types'].map(v => { return {name : v.Name} })
    }
  },
  mounted() {
    this.initiate()
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
    brandSelected(node) {
      if(!node.nation){
        this.selector = carsFilters.filterByBrand(node.data)
      } else {
        this.selector = carsFilters.filterByNation(node.data)
      }
      this.selectedCategory = ""
    },
    resetFilters(){
      this.selector = c => c
    },
    sort(e){
      if(e.value === "submission"){
        carSort.sortByDate(this.cars)
      }
      if(e.value === "name"){
        carSort.sortByName(this.cars)
      }
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

.p-panel-content{
  padding: 0 !important;
}

.p-listbox{
  border: none;
}
</style>
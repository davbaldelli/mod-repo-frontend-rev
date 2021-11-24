<template>
  <div class="p-grid p-p-2">
    <div class="p-col-12 text-center">
      <h1 class="display-4">AC Cars Repository</h1>
      <p class="lead"><em>A collection of quality cars</em></p>
    </div>
    <div class="p-col-12 p-md-12 p-lg-3">
    </div>
    <div class="p-md-12 p-lg-6">
      <div class="p-col-12">
        <div class="p-grid">
          <div class="p-col-12">
            <div class="p-inputgroup p-mb-2">
              <InputText v-on:keyup.enter="nameFilterClick" v-model="nameFilter" placeholder="Type Car Name"/>
              <Button @click="nameFilterClick" icon="pi pi-search"/>
            </div>
          </div>
          <div ref="paginatorTop" class="p-col-12">
            <Paginator :rows="pageRows" v-model:first="offset" :total-records="filteredCars.length"></Paginator>
          </div>
          <div class="p-col-12 p-formgroup-inline">
            <div class="p-field">
              <CascadeSelect v-model="selectedBrand" @change="e => onBrandSelected(e.value.name)" placeholder="Brand"
                             :options="brandOpts" option-label="name" option-group-label="nation"
                             :option-group-children="['brands']" :loading="this.$store.getters['cars/loadingBrands']"/>
            </div>
            <div class="p-field">
              <Dropdown v-model="selectedCategory" :options="categories" option-label="Name"
                        @change="e => onSelectedCategory(e.value.Name)" placeholder="Category"/>
            </div>
            <div class="p-field">
              <Dropdown v-model="selectedAuthor" :options="authors" option-label="Name"
                        @change="e => onAuthorSelected(e.value.Name)" placeholder="Author"/>
            </div>
            <div class="p-field">
              <Dropdown @change="e => sort(e.value)" class="p-mb-2" v-model="selectedSort" :options="sortOpts"
                        placeholder="Sort By" option-label="label" option-value="value"></Dropdown>
            </div>
          </div>
          <div class="p-col-12 d-flex align-items-center">
            <Chip class="p-ml-2" :label="`Category: ${selectedCategory}`" v-if="selectedCategory"
                  @remove="clearCategoryFilter" removable/>
            <Chip class="p-ml-2" :label="`Name: ${activeNameFilter}`" v-if="activeNameFilter" @remove="clearNameFilter"
                  removable/>
            <Chip class="p-ml-2" :label="`Brand: ${selectedBrand.name}`" v-if="selectedBrand" @remove="clearBrandFilter"
                  removable/>
            <Chip class="p-ml-2" :label="`Author: ${selectedAuthor.Name}`" v-if="selectedAuthor"
                  @remove="clearAuthorFilter" removable/>
          </div>
          <div class="p-col-12">
            <div class="p-mb-2" v-for="(car,index) in pageCars" :key="index">
              <div class="p-card container-fluid p-py-2">
                <div class="row">
                  <div class="col-lg-12 col-xl-4">
                    <div class="d-flex align-items-center" style="height: 100%">
                      <img :src="car.Image" alt="Fluid image " class="rounded-4 card-img">
                    </div>
                  </div>
                  <div class="col-lg-12 col-xl-8 mt-2 d-flex flex-column">
                    <div class="p-card-title">
                      <h3>
                        <router-link :to="{name : 'car', query:{}}">{{
                            `${car.Brand.Name} ${car.ModelName}`
                          }}
                        </router-link>
                      </h3>
                    </div>
                    <div class="p-card-subtitle">
                      <span class="badge badge-secondary p-mr-1" v-for="category in car.Categories"
                            :key="category.Name">{{ category.Name }}</span>
                      <span class="badge badge-warning" v-if="car.Premium">Premium</span>
                    </div>
                    <div class="p-card-body">
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
                    </div>
                    <div class="p-card-footer p-text-right mt-auto">
                      <Button v-if="userRole === 'admin'" @click="openEditTab(car)" icon="pi pi-pencil"
                              class="p-mr-2"></Button>
                      <Button @click="openInNewTab(car.DownloadLink)" icon="pi pi-download"></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-col-12">
            <Paginator :rows="pageRows" v-model:first="offset" :total-records="filteredCars.length"></Paginator>
          </div>
        </div>
      </div>
    </div>
    <div class="p-md-0 p-lg-3"></div>
  </div>
</template>

<script>
import Paginator from 'primevue/paginator';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button'
import InputText from "primevue/inputtext";
import Chip from 'primevue/chip'
import CascadeSelect from 'primevue/cascadeselect';
//import AutoComplete from 'primevue/autocomplete';

import {carsFilters, carSort} from "@/_helpers";


export default {
  name: "CarList",
  components: {
    Paginator,
    Dropdown,
    Button,
    InputText,
    Chip,
    CascadeSelect,
    //AutoComplete,
  },
  data() {
    return {
      sortOpts: [
        {label: 'Name (A-Z)', value: carSort.sortByName(true)},
        {label: 'Name (Z-A)', value: carSort.sortByName(false)},
        {label: 'Latest Submitted', value: carSort.sortByDate()},
        {label: "Production Year (Newer)", value: carSort.sortByYear(true)},
        {label: "Production Year (Older)", value: carSort.sortByYear(false)}
      ],
      categoryOpts: [],
      brandOpts: [],
      nameFilter: "",
      activeNameFilter: "",
      categorySelector: c => c,
      brandSelector: c => c,
      authorSelector: c => c,
      nameSelector: c => c,
      categories : [
        {Name : "Endurance"},
        {Name : "Formula"},
        {Name : "GT"},
        {Name : "Prototype"},
        {Name : "Rally"},
        {Name : "Stock Car"},
        {Name : "Street"},
        {Name : "Tuned"},
        {Name : "Touring"},
        {Name : "Vintage"},
      ],
      sorter: carSort.sortByName(true),
      pageRows: 20,
      offset: 0,
      categorySearch: "",
      selectedCategory: "",
      selectedAuthor: "",
      selectedBrand: ""
    }
  },
  computed: {
    selector() {
      return c => this.categorySelector(this.authorSelector(this.brandSelector(this.nameSelector(c))))
    },
    userRole() {
      return this.$store.getters['authentication/user'].role
    },
    filteredCars() {
      return this.selector(this.cars).sort(this.sorter)
    },
    pageCars() {
      return this.filteredCars.slice(this.offset, this.offset + this.pageRows)
    },
    cars() {
      return this.$store.getters['cars/cars']
    },
    brandGrouped() {
      return this.$store.getters['cars/brands'].reduce((r, a) => {
        r.set(a.Nation.Name, [...r.get(a.Nation.Name) || [], {name: a.Name}])
        return r
      }, new Map())
    },
    authors() {
      return this.$store.getters['cars/authors']
    },
  },
  watch: {
    brandGrouped() {
      this.brandGrouped.forEach((value, key) => {
        this.brandOpts.push({nation: key, brands: value})
      })
    },
  },
  mounted() {
    this.initiate()
  },
  methods: {
    initiate() {
      this.getAllCars()
      this.$store.dispatch('cars/getCarAuthors')
      this.$store.dispatch('cars/getCarBrands')
      /*
      if(this.$route.query.brandFilter){
        this.onBrandSelected(this.$route.query.brandFilter)
      }
      if(this.$route.query.nameFilter){
        this.nameFilter = this.$route.query.nameFilter
        this.onNameSelected(this.$route.query.nameFilter)
      }
      if(this.$route.query.authorFilter){
        this.onAuthorSelected(this.$route.query.authorFilter)
      }
      if(this.$route.query.categoryFilter){
        this.onSelectedCategory(this.$route.query.categoryFilter)
      }
       */
    },
    getAllCars() {
      this.$store.dispatch('cars/getAll')
    },
    searchCategory(e) {
      this.categoryOpts = this.categories.filter(v => v.Name.toLowerCase().includes(e.query.toLowerCase()))
    },
    sort(value) {
      this.sorter = value
    },
    scrollToTop() {
      console.log("change")
      const element = this.$refs["paginatorTop"];
      const top = element.offsetTop;
      window.scrollTo(0, top)
    },
    nameFilterClick() {
      this.onNameSelected(this.nameFilter)
    },
    onNameSelected(name) {
      this.activeNameFilter = name
      this.$router.replace({query: {...this.$route.query, nameFilter: name}})
      this.nameSelector = carsFilters.filterByName(name)
    },
    onBrandSelected(name) {
      this.$router.replace({query: {...this.$route.query, brandFilter: name}})
      this.brandSelector = carsFilters.filterByBrand(name)
    },
    onAuthorSelected(name) {
      this.$router.replace({query: {...this.$route.query, authorFilter: name}})
      this.authorSelector = carsFilters.filterByAuthor(name)
    },
    onSelectedCategory(name) {
      this.selectedCategory = name
      this.$router.replace({query: {...this.$route.query, categoryFilter: name}})
      this.categorySelector = carsFilters.filterByCategory(name)
    },
    clearNameFilter() {
      this.activeNameFilter = ""
      this.$router.replace({query: {...this.$route.query, nameFilter: this.activeNameFilter}})
      this.nameSelector = c => c
    },
    clearCategoryFilter() {
      this.selectedCategory = ""
      this.$router.replace({query: {...this.$route.query, categoryFilter: this.selectedCategory.Name}})
      this.categorySelector = c => c
    },
    clearBrandFilter() {
      this.selectedBrand = ""
      this.$router.replace({query: {...this.$route.query, brandFilter: this.selectedBrand.Name}})
      this.brandSelector = c => c
    },
    clearAuthorFilter() {
      this.selectedAuthor = ""
      this.$router.replace({query: {...this.$route.query, authorFilter: this.selectedAuthor.Name}})
      this.authorSelector = c => c
    },
    resetFilters() {
      this.clearNameFilter()
      this.clearCategoryFilter()
      this.clearBrandFilter()
      this.clearAuthorFilter()
    },
    openInNewTab(url) {
      window.open(url, '_blank').focus();
    },
    openEditTab(car) {
      const car_copy = JSON.stringify(car)
      this.$router.push({name: 'CarEdit', params: {initialCar: car_copy}})
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

.p-panel-content {
  padding: 0 !important;
}

.p-listbox {
  border: none !important;
}

.p-listbox .p-listbox-header {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}

.p-accordion .p-accordion-content {
  padding: 0 !important;
}

.p-dropdown > span {
  padding: 0.5rem;
}
</style>
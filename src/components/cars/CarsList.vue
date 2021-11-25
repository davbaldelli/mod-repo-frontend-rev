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
        <div class="p-inputgroup p-mb-2">
          <InputText v-model="nameFilter" placeholder="Type Car Name" v-on:keyup.enter="nameFilterClick"/>
          <Button icon="pi pi-search" @click="nameFilterClick"/>
        </div>
      </div>
      <div ref="paginatorTop" class="p-col-12">
        <Paginator v-model:first="offset" :rows="pageRows" :total-records="filteredCars.length"></Paginator>
      </div>
      <div class="p-col-12 p-d-flex">
        <Dropdown v-model="selectedBrand" :filter="true" :loading="this.$store.getters['cars/loadingBrands']" :options="brandOpts"
                  class="p-mr-2" optionGroupChildren="brands"
                  optionGroupLabel="nation" optionLabel="name" placeholder="Brand"
                  @change="e => onBrandSelected(e.value.name)">
        </Dropdown>
        <Dropdown v-model="selectedCategory" :options="categories" class="p-mr-2" option-label="Name"
                  placeholder="Category" @change="e => onSelectedCategory(e.value.Name)"/>
        <Dropdown v-model="selectedAuthor" :filter="true" :options="authors" class="p-mr-2" option-label="Name"
                  placeholder="Author" @change="e => onAuthorSelected(e.value.Name)"/>
        <Dropdown v-model="selectedSort" :options="sortOpts" class="p-mr-2" option-label="label"
                  option-value="value" placeholder="Sort By" @change="e => sort(e.value)"></Dropdown>
      </div>
      <div class="p-col-12 d-flex align-items-center">
        <Chip v-if="selectedCategory" :label="`Category: ${selectedCategory.Name}`" class="p-mr-2"
              removable @remove="clearCategoryFilter"/>
        <Chip v-if="activeNameFilter" :label="`Name: ${activeNameFilter}`" class="p-mr-2" removable
              @remove="clearNameFilter"/>
        <Chip v-if="selectedBrand" :label="`Brand: ${selectedBrand.name}`" class="p-mr-2" removable
              @remove="clearBrandFilter"/>
        <Chip v-if="selectedAuthor" :label="`Author: ${selectedAuthor.Name}`" class="p-mr-2"
              removable @remove="clearAuthorFilter"/>
      </div>
      <div v-if="this.$store.getters['cars/loadingCars']" class="p-col-12">
        <div v-for="i in 5" :key="i" class="p-mb-2">
          <div class="custom-skeleton p-card container-fluid p-py-2">
            <div class="row">
              <div class="col-lg-12 col-xl-4">
                <Skeleton height="200px" shape="rectangle" width="100%"></Skeleton>
              </div>
              <div class="col-lg-12 col-xl-8 mt-2 d-flex flex-column">
                <div class="p-card-title">
                  <Skeleton height="40px" width="100%"></Skeleton>
                </div>
                <div class="p-card-subtitle">
                  <Skeleton height="20px" width="20%"></Skeleton>
                </div>
                <div class="p-card-body p-my-2">
                  <Skeleton class="p-mb-1" height="15px" width="10%"></Skeleton>
                  <Skeleton class="p-mb-1" height="15px" width="30%"></Skeleton>
                  <Skeleton height="15px" width="80%"></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="filteredCars.length === 0 && !this.$store.getters['cars/loadingCars']"
           class="p-mt-3 text-center p-col-12">
        <h3 class="display-6">I'm sorry, no car match your request</h3>
      </div>
      <div v-else class="p-col-12">
        <div v-for="(car,index) in pageCars" :key="index" class="p-mb-2">
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
                  <span v-for="category in car.Categories" :key="category.Name"
                        class="badge badge-secondary p-mr-1">{{ category.Name }}</span>
                  <span v-if="car.Premium" class="badge badge-warning">Premium</span>
                </div>
                <div class="p-card-body">
                  <p>
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
                <div class="p-card-footer p-text-right mt-auto">
                  <Button v-if="userRole === 'admin'" class="p-mr-2" icon="pi pi-pencil"
                          @click="openEditTab(car)"></Button>
                  <Button icon="pi pi-download" @click="openInNewTab(car.DownloadLink)"></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-col-12">
        <Paginator v-model:first="offset" :rows="pageRows" :total-records="filteredCars.length"></Paginator>
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
import Skeleton from 'primevue/skeleton'

import {carsFilters, carSort} from "@/_helpers";


export default {
  name: "CarList",
  components: {
    Paginator,
    Dropdown,
    Button,
    InputText,
    Chip,
    Skeleton,
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
      categories: [
        {Name: "Endurance"},
        {Name: "Formula"},
        {Name: "GT"},
        {Name: "Prototype"},
        {Name: "Rally"},
        {Name: "Stock Car"},
        {Name: "Street"},
        {Name: "Tuned"},
        {Name: "Touring"},
        {Name: "Vintage"},
      ],
      sorter: carSort.sortByName(true),
      pageRows: 20,
      offset: 0,
      categorySearch: "",
      selectedCategory: "",
      selectedAuthor: "",
      selectedBrand: "",
      selectedSort: "",
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters['authentication/loggedIn']
    },
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
    loggedIn() {
      if (this.loggedIn) {
        this.initiate()
      }
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
      //this.$router.replace({query: {...this.$route.query, nameFilter: name}})
      this.nameSelector = carsFilters.filterByName(name)
    },
    onBrandSelected(name) {
      //this.$router.replace({query: {...this.$route.query, brandFilter: name}})
      this.brandSelector = carsFilters.filterByBrand(name)
    },
    onAuthorSelected(name) {
      //this.$router.replace({query: {...this.$route.query, authorFilter: name}})
      this.authorSelector = carsFilters.filterByAuthor(name)
    },
    onSelectedCategory(name) {
      //this.$router.replace({query: {...this.$route.query, categoryFilter: name}})
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

.custom-skeleton {
  border: 1px solid var(--surface-d);
  border-radius: 4px;
}

.custom-skeleton ul {
  list-style: none;
}
</style>
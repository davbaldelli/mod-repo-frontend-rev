<template>
  <div class="p-grid">
    <div class="p-col-12 text-center p-mt-4">
      <h1 class="display-4">Cars Repository</h1>
      <h2 class="lead"><em>A collection of quality cars</em></h2>
    </div>
    <div class="p-col-12 p-lg-3"></div>
    <div class="p-col-12 p-lg-6">
      <div class="p-grid">
        <div class="p-col-12">
          <div class="p-inputgroup p-mb-2">
            <InputText v-on:keyup.enter="nameFilterClick" v-model="nameFilter" placeholder="Type Car Name"/>
            <Button @click="nameFilterClick" icon="pi pi-search" aria-label="search"/>
          </div>
        </div>
        <div class="p-col-12">
          <Paginator :rows="pageRows" v-model:first="offset" :total-records="filteredCars.length"></Paginator>
        </div>
        <div class="p-col-12">
          <Dropdown class="p-mr-2 p-mb-2 p-mb-sm-0" v-model="selectedBrand" :options="brandOpts" :filter="true"
                    @change="e => onBrandSelected(e.value.name)" placeholder="Brand"
                    optionLabel="name" optionGroupLabel="nation" optionGroupChildren="brands"
                    :loading="this.$store.getters['cars/loadingBrands']" aria-label="car brand selection">
          </Dropdown>
          <Dropdown class="p-mr-2 p-mb-2 p-mb-sm-0" v-model="selectedCategory" :options="categories" option-label="name"
                    @change="e => onSelectedCategory(e.value.name)" placeholder="Category" aria-label="car category selection"/>
          <Dropdown class="p-mr-2 p-mb-2 p-mb-sm-0" v-model="selectedAuthor" :options="authors" option-label="name"
                    :filter="true" :loading="this.$store.getters['cars/loadingAuthors']"
                    @change="e => onAuthorSelected(e.value.name)" placeholder="Author" aria-label="mod author selection"/>
          <Dropdown class="p-mr-2 p-mb-2 p-mb-sm-0" @change="e => sort(e.value)" v-model="selectedSort"
                    :options="sortOpts"
                    placeholder="Sort By" option-label="label" option-value="value" aria-label="sort type selection"></Dropdown>
        </div>
        <div class="p-col-12">
          <Chip class="p-mr-2" :label="`Category: ${selectedCategory.name}`" v-if="selectedCategory"
                @remove="clearCategoryFilter" removable/>
          <Chip class="p-mr-2" :label="`Name: ${activeNameFilter}`" v-if="activeNameFilter" @remove="clearNameFilter"
                removable/>
          <Chip class="p-mr-2" :label="`Brand: ${selectedBrand.name}`" v-if="selectedBrand" @remove="clearBrandFilter"
                removable/>
          <Chip class="p-mr-2" :label="`Author: ${selectedAuthor.name}`" v-if="selectedAuthor"
                @remove="clearAuthorFilter" removable/>
        </div>
        <div v-if="this.$store.getters['cars/loadingCars']" class="p-col-12">
          <div v-for="i in 25" :key="i" class="p-mb-2">
            <div class="custom-skeleton p-card container-fluid p-py-2">
              <div class="row">
                <div class="col-lg-12 col-xl-4">
                  <Skeleton width="100%" height="200px" shape="rectangle"></Skeleton>
                </div>
                <div class="col-lg-12 col-xl-8 mt-2 d-flex flex-column">
                  <div class="p-card-title">
                    <Skeleton width="100%" height="40px"></Skeleton>
                  </div>
                  <div class="p-card-subtitle">
                    <Skeleton width="20%" height="20px"></Skeleton>
                  </div>
                  <div class="p-card-body p-my-2">
                    <Skeleton class="p-mb-1" width="10%" height="15px"></Skeleton>
                    <Skeleton class="p-mb-1" width="30%" height="15px"></Skeleton>
                    <Skeleton width="80%" height="15px"></Skeleton>
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
          <div class="p-grid p-p-2">
            <div v-for="(car,index) in pageCars" :key="index" class="p-col-12">
              <div class="p-grid p-card p-p-2">
                <div class="p-col-12 p-xl-4 p-p-2">
                  <div class="d-flex align-items-center" style="height: 100%">
                    <img :src="car.image" alt="car thumbnail" class="rounded-4 card-img">
                  </div>
                </div>
                <div class="p-col-12 p-xl-8 p-p-3 d-flex flex-column">
                  <div class="p-card-title p-mb-0">
                    <h3>
                      <router-link
                          :to="{name : 'car', params:{id: car.id}}">{{
                          `${car.brand.name} ${car.modelName}`
                        }}
                      </router-link>
                    </h3>
                  </div>
                  <div class="p-card-subtitle">
                <span class="badge badge-secondary p-mr-1" v-for="category in car.categories"
                      :key="category.name">{{ category.name }}</span>
                    <span class="badge badge-warning" v-if="car.premium">Premium</span>
                  </div>
                  <div class="p-card-body">
                    <Rating class="p-mb-1" :model-value="car.rating/2" :readonly="true" :cancel="false" />
                    <strong>Year: </strong>{{ car.year }}
                    <br>
                    <strong>Mod Version: </strong>{{ car.version }}
                    <br>
                    <strong>Author: </strong><a :href="car.author.link" rel="noopener" target="_blank">{{
                      car.author.name
                    }}</a>
                    <br>
                  </div>
                  <div class="p-card-footer p-pt-0  p-text-right mt-auto">
                    <router-link  aria-label="mod edit link" :to="`/car/edit/${car.id}`" tag="button">
                      <Button aria-label="edit button" v-if="userRole === 'admin'" icon="far fa-edit"
                              class="p-mr-2 p-button-warning"></Button>
                    </router-link>
                    <a aria-label="mod download link" :href="car.downloadLink" target="_blank" rel="noopener">
                      <Button aria-label="download button" icon="pi pi-download"></Button>
                    </a>
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
    <div class="p-col-0 p-lg-3"></div>
  </div>
</template>

<script>
import Paginator from 'primevue/paginator';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button'
import InputText from "primevue/inputtext";
import Chip from 'primevue/chip'
import Skeleton from 'primevue/skeleton'
import Rating from "primevue/rating";

import {carsFilters, carSort} from "@/_helpers";
import {computed, reactive} from "vue";
import {useHead} from "@vueuse/head";


export default {
  name: "CarList",
  components: {
    Paginator,
    Dropdown,
    Button,
    InputText,
    Chip,
    Skeleton,
    Rating,
  },
  setup() {
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
        {name: "Endurance"},
        {name: "Formula"},
        {name: "GT"},
        {name: "Prototype"},
        {name: "Rally"},
        {name: "Stock Car"},
        {name: "Street"},
        {name: "Tuned"},
        {name: "Touring"},
        {name: "Vintage"},
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
        r.set(a.nation.name, [...r.get(a.nation.name) || [], {name: a.name}])
        return r
      }, new Map())
    },
    authors() {
      return this.$store.getters['cars/authors']
    },
  },
  watch: {
    brandGrouped() {
      this.brandOpts = []
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
      this.categoryOpts = this.categories.filter(v => v.name.toLowerCase().includes(e.query.toLowerCase()))
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
      this.nameSelector = carsFilters.filterByName(name)
    },
    onBrandSelected(name) {
      this.brandSelector = carsFilters.filterByBrand(name)
    },
    onAuthorSelected(name) {
      this.authorSelector = carsFilters.filterByAuthor(name)
    },
    onSelectedCategory(name) {
      this.categorySelector = carsFilters.filterByCategory(name)
    },
    clearNameFilter() {
      this.activeNameFilter = ""
      this.nameSelector = c => c
    },
    clearCategoryFilter() {
      this.selectedCategory = ""
      this.categorySelector = c => c
    },
    clearBrandFilter() {
      this.selectedBrand = ""
      this.brandSelector = c => c
    },
    clearAuthorFilter() {
      this.selectedAuthor = ""
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
      this.$router.push({name: 'CarEdit', params: {id: car.id}})
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
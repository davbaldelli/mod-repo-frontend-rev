<template>
  <div class="p-grid p-p-2">
    <div class="p-col-12 text-center">
      <h1>Cars</h1>
    </div>
    <div class="p-col-12">
      <Paginator :rows="pageRows" v-model:first="offset" :total-records="filteredCars.length"></Paginator>
    </div>
    <div class="p-col-12 p-md-12 p-lg-3">
      <div class="p-inputgroup p-mb-2">
        <InputText v-on:keyup.enter="nameFilterClick" v-model="nameFilter" placeholder="Type Car Name"/>
        <Button @click="nameFilterClick" label="Search"/>
      </div>
      <div class="p-mb-2">
        <Chip :label="selectedCategory.name" v-if="selectedCategory" @remove="resetFilters" removable/>
        <Chip :label="activeNameFilter" v-if="activeNameFilter" @remove="resetFilters" removable/>
        <Chip :label="selectedBrand" v-if="selectedBrand" @remove="resetFilters" removable/>
      </div>
      <Accordion>
        <AccordionTab header="Filter By Brand">
          <Tree v-model:selection-keys="selectedBrandsNodes" selectionMode="single"
                :value="FilterOpts" placeholder="Select Brand"
                :loading="this.$store.getters['cars/loadingBrands']" @nodeSelect="brandSelected"></Tree>
        </AccordionTab>
        <AccordionTab header="Filter By Category">
          <ListBox :filter="true" v-model="selectedCategory" :options="categories" option-label="name" list-style="max-height:500px"></ListBox>
        </AccordionTab>
      </Accordion>
    </div>
    <div class="p-md-12 p-lg-6">
      <div class="p-col-12">
        <div class="p-col-12 p-p-0 text-end">
          <Dropdown @change="e => sort(e.value)" class="p-mr-5 p-mb-2" v-model="selectedSort" :options="sortOpts" placeholder="Sort By" option-label="label" option-value="value" ></Dropdown>
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
    <div class="p-md-0 p-lg-3"></div>
  </div>
</template>

<script>
import Tree from 'primevue/tree'
import Paginator from 'primevue/paginator';
import ListBox from 'primevue/listbox';
import Dropdown from 'primevue/dropdown';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Button from 'primevue/button'
import InputText from "primevue/inputtext";
import Chip from 'primevue/chip'
import {carsFilters, carSort} from "@/_helpers";


export default {
  name: "CarList",
  components: {
    Tree,
    Paginator,
    ListBox,
    Dropdown,
    Accordion,
    AccordionTab,
    Button,
    InputText,
    Chip,
  },
  data() {
    return {
      sortOpts : [
        {label : 'Name', value : 'name'},
        {label : 'Submission Date', value: 'submission'},
        {label: "Year", value : "year"}
      ],
      nameFilter : "",
      activeNameFilter : "",
      selectedBrandsNodes: Object(),
      selector: cars => cars,
      sorter: carSort.sortByName(),
      pageRows: 20,
      offset: 0,
      selectedCategory : null,
      selectedBrand : ""
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
        this.clearNameFilter()
        this.clearBrandFilter()
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
        r.set(a.Nation.Name, [...r.get(a.Nation.Name) || [], a.Name])
        return r
      }, new Map())
    },
    FilterOpts() {
      let items = []
      let i = 0;
      this.brandGrouped.forEach((value, key) => {
        let opt = {label: key, children: [], key: `${i}`, data: key, nation: true, selectable : false}
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
      this.selectedBrand = node.data
      if(!node.nation){
        this.selector = carsFilters.filterByBrand(node.data)
      } else {
        this.selector = carsFilters.filterByNation(node.data)
      }
      this.clearCategoryFilter()
      this.clearNameFilter()
    },
    resetFilters(){
      this.clearNameFilter()
      this.clearCategoryFilter()
      this.clearBrandFilter()
      this.selector = c => c
    },
    clearNameFilter(){
      this.activeNameFilter = ""
    },
    clearCategoryFilter(){
      this.selectedCategory = ""
    },
    clearBrandFilter(){
      this.selectedBrand = ""
    },
    sort(value){
      if(value === "submission"){
        this.sorter = carSort.sortByDate()
      }
      if(value === "name"){
        this.sorter = carSort.sortByName()
      }
      if(value === "year"){
        this.sorter = carSort.sortByYear()
      }
    },
    nameFilterClick(){
      this.activeNameFilter = this.nameFilter
      this.selector = carsFilters.filterByName(this.nameFilter)
      this.clearCategoryFilter()
      this.clearBrandFilter()
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
  border: none !important;
}

.p-listbox .p-listbox-header{
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
.p-accordion .p-accordion-content{
  padding: 0 !important;
}
</style>
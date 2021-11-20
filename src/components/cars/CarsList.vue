<template>
  <div class="p-grid p-p-2">
    <div class="p-col-12 text-center">
      <h1 class="display-4">AC Cars Repository</h1>
      <p class="lead"><em>A collection of quality cars</em></p>
    </div>
    <div class="p-col-12 p-md-12 p-lg-3">
      <Accordion>
        <AccordionTab header="Filter By Brand">
          <Tree v-model:selection-keys="selectedBrandsNodes" selectionMode="single"
                :value="FilterOpts" placeholder="Select Brand"
                :loading="this.$store.getters['cars/loadingBrands']" @nodeSelect="brandSelected"></Tree>
        </AccordionTab>
        <AccordionTab header="Filter By Category">
          <ListBox :filter="true" v-model="selectedCategory" @change="onSelectedCategory" :options="categories"
                   option-label="Name" list-style="max-height:500px"></ListBox>
        </AccordionTab>
        <AccordionTab header="Filter By Author">
          <ListBox :filter="true" v-model="selectedAuthor" @change="onSelectedAuthor" :options="authors"
                   option-label="Name" list-style="max-height:500px"></ListBox>
        </AccordionTab>
      </Accordion>
    </div>
    <div class="p-md-12 p-lg-6">
      <div class="p-col-12">
        <div class="p-grid">
          <div class="p-col-12">
            <div class="p-inputgroup p-mb-2">
              <InputText v-on:keyup.enter="nameFilterClick" v-model="nameFilter" placeholder="Type Car Name"/>
              <Button @click="nameFilterClick" label="Search"/>
            </div>
          </div>
          <div class="p-col-12">
            <Paginator :rows="pageRows" v-model:first="offset" :total-records="filteredCars.length"></Paginator>
          </div>
          <div class="p-col-6 d-flex align-items-center">
            <Chip :label="selectedCategory.Name" v-if="selectedCategory" @remove="resetFilters" removable/>
            <Chip :label="activeNameFilter" v-if="activeNameFilter" @remove="resetFilters" removable/>
            <Chip :label="selectedBrand" v-if="selectedBrand" @remove="resetFilters" removable/>
            <Chip :label="selectedAuthor.Name" v-if="selectedAuthor" @remove="resetFilters" removable/>
          </div>
          <div class="p-col-6 text-end">
            <Dropdown @change="e => sort(e.value)" class="p-mb-2" v-model="selectedSort" :options="sortOpts"
                      placeholder="Sort By" option-label="label" option-value="value"></Dropdown>
          </div>
          <div class="p-col-12">
            <div class="p-mb-2" v-for="car in pageCars" :key="car.ModelName">
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
                        <router-link :to="{name : 'car', query:{}}">{{ `${car.Brand.Name} ${car.ModelName}` }}</router-link>
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
                      <Button @click="openInNewTab(car.DownloadLink)" icon="pi pi-download"
                              iconPos="right"></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      sortOpts: [
        {label: 'Name', value: 'name'},
        {label: 'Submission Date', value: 'submission'},
        {label: "Year", value: "year"}
      ],
      nameFilter: "",
      activeNameFilter: "",
      selectedBrandsNodes: Object(),
      selector: cars => cars,
      sorter: carSort.sortByName(),
      pageRows: 20,
      offset: 0,
      selectedCategory: "",
      selectedAuthor: "",
      selectedBrand: ""
    }
  },
  watch: {
    userRole() {
      if (this.userRole) {
        this.initiate()
      }
    },
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
        let opt = {label: key, children: [], key: `${i}`, data: key, nation: true, selectable: false}
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
      return this.$store.getters['cars/types']
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
    sort(value) {
      if (value === "submission") {
        this.sorter = carSort.sortByDate()
      }
      if (value === "name") {
        this.sorter = carSort.sortByName()
      }
      if (value === "year") {
        this.sorter = carSort.sortByYear()
      }
    },
    nameFilterClick() {
      this.activeNameFilter = this.nameFilter
      this.selector = carsFilters.filterByName(this.nameFilter)
      this.clearCategoryFilter()
      this.clearBrandFilter()
      this.clearAuthorFilter()
    },
    brandSelected(node) {
      this.selectedBrand = node.data
      this.selector = carsFilters.filterByBrand(node.data)
      this.clearCategoryFilter()
      this.clearNameFilter()
      this.clearAuthorFilter()
    },
    onSelectedAuthor(e) {
      this.clearNameFilter()
      this.clearBrandFilter()
      this.clearCategoryFilter()
      this.selector = carsFilters.filterByAuthor(e.value.Name)
    },
    onSelectedCategory(e) {
      this.clearNameFilter()
      this.clearBrandFilter()
      this.clearAuthorFilter()
      this.selector = carsFilters.filterByCategory(e.value.Name)
    },
    clearNameFilter() {
      this.activeNameFilter = ""
    },
    clearCategoryFilter() {
      this.selectedCategory = ""
    },
    clearBrandFilter() {
      this.selectedBrand = ""
      this.selectedBrandsNodes = Object()
    },
    clearAuthorFilter() {
      this.selectedAuthor = ""
    },
    resetFilters() {
      this.clearNameFilter()
      this.clearCategoryFilter()
      this.clearBrandFilter()
      this.clearAuthorFilter()
      this.selector = c => c
    },
    openInNewTab(url) {
      window.open(url, '_blank').focus();
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
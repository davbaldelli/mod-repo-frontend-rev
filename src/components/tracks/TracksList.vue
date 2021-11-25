<template>
  <div class="p-grid">
    <div class="p-col-12 text-center">
      <h1 class="display-4">AC Tracks Repository</h1>
      <p class="lead"><em>A collection of quality tracks</em></p>
    </div>
    <div class="p-col-12 p-lg-3"></div>
    <div class="p-col-12 p-lg-6">
      <div class="p-col-12">
        <div class="p-inputgroup p-mb-2">
          <InputText v-model="nameFilter" placeholder="Type Track Name" v-on:keyup.enter="nameFilterClick"/>
          <Button label="Search" @click="nameFilterClick"/>
        </div>
      </div>
      <div class="p-col-12">
        <Paginator v-model:first="offset" :rows="pageRows" :total-records="filteredTracks.length"></Paginator>
      </div>
      <div class="p-col-12">
        <div class="p-formgroup-inline p-d-flex">
          <Dropdown v-model="selectedNation" :filter="true" :options="nations" class="p-mr-2"
                    option-label="Name" option-value="Name" placeholder="Nation" @change="e => onNationSelected(e.value)"></Dropdown>
          <Dropdown v-model="selectedLayoutType" :options="categoryOpts" class="p-mr-2"
                    option-label="text" option-value="value" placeholder="Layout Category"
                    @change="e => onLayoutCategorySelected(e.value)"></Dropdown>
          <Dropdown v-model="selectedTag" :options="tagsOpts" class="p-mr-2" option-label="text"
                    option-value="value" placeholder="Tag" @change="e => onTagSelected(e.value)"></Dropdown>
        </div>
      </div>
      <div class="p-col-12 p-my-2">
        <Chip v-if="selectedNameFilter" :label="`Name: ${selectedNameFilter}`" class="p-ml-2" removable
              @remove="clearNameFilter"/>
        <Chip v-if="selectedNation" :label="`Nation: ${selectedNation}`" class="p-ml-2" removable
              @remove="clearNationFilter"/>
        <Chip v-if="selectedLayoutType" :label="`Category: ${selectedLayoutType}`" class="p-ml-2"
              removable @remove="clearLayoutFilter"/>
        <Chip v-if="selectedTag" :label="`Tag: ${selectedTag}`" class="p-ml-2" removable @remove="clearTagFilter"/>
      </div>
      <div v-if="this.$store.getters['tracks/loadingTracks']" class="p-col-12">
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
                  <Skeleton class="p-mb-1" height="15px" width="30%"></Skeleton>
                  <Skeleton class="p-mb-1" height="15px" width="30%"></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="filteredTracks.length === 0 && !this.$store.getters['tracks/loadingTracks']"
           class="text-center p-col-12 p-my-3">
        <h3 class="display-6">I'm sorry, no track match your request</h3>
      </div>
      <div class="p-col-12">
        <div v-for="track in pageTracks" :key="track.Name" class="p-mb-2">
          <div class="p-card container-fluid p-py-2">
            <div class="row">
              <div class="col-lg-12 col-xl-4">
                <div class="d-flex align-items-center" style="height: 100%">
                  <img :src="track.Image" alt="Fluid image " class="rounded-4 card-img">
                </div>
              </div>
              <div class="col-lg-12 col-xl-8 p-mt-2 d-flex flex-column">
                <div class="p-card-title">
                  <h3>
                    <router-link :to="{name : 'track', query:{}}">{{ track.Name }}</router-link>
                  </h3>
                </div>
                <div class="p-card-subtitle">
                        <span v-for="tag in track.Tags" :key="tag"
                              class="badge badge-secondary p-mr-1">{{ tag }}</span>
                  <span v-if="track.Premium" class="badge badge-warning">Premium</span>
                </div>
                <div class="p-card-body">
                  <strong>Location: </strong>{{ track.Location }}, {{ track.Nation.Name }}<br/>
                  <strong>Author: </strong>
                  <a :href="track.Author.Link" target="_blank">{{ track.Author.Name }}</a>
                </div>
                <div class="p-card-footer p-text-right mt-auto">
                  <Button v-if="userRole === 'admin'" class="p-mr-2" icon="pi pi-pencil"
                          @click="openEditTab(track)"></Button>
                  <Button icon="pi pi-download" iconPos="right"
                          @click="openInNewTab(track.DownloadLink)"></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <Paginator v-model:first="offset" :rows="pageRows" :total-records="filteredTracks.length"></Paginator>
      </div>
    </div>
    <div class="col-0 col-lg-3"></div>
  </div>
</template>

<script>

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Paginator from "primevue/paginator";
import Chip from "primevue/chip";
import Dropdown from "primevue/dropdown";
import Skeleton from "primevue/skeleton";
import {tracksFilters} from "@/_helpers/tracks-filters";

export default {
  name: "TracksList",
  components: {
    InputText,
    Button,
    Paginator,
    Chip,
    Dropdown,
    Skeleton,
  },
  data() {
    return {
      nameFilter: "",
      selectedNameFilter: "",
      pageRows: 25,
      offset: 0,
      tagsOpts: [{text: "F1", value: "F1"},
        {text: "NASCAR", value: "NASCAR"},
        {text: "Historic", value: "Historic"},
        {text: "Rally", value: "Rally"},
        {text: "Drift", value: "Drift"},
        {text: "Open World", value: "Open World"},
        {text: "City Track", value: "City Track"},
        {text: "Touge", value: "Touge"},
        {text: "Endurance", value: "Endurance"},
        {text: "Street Circuit", value: "Street Track"},
        {text: "Fictional", value: "Fictional"},
        {text: "Karting", value: "Karting"},],
      categoryOpts: [
        {text: "Oval", value: "Oval"},
        {text: "Road Course", value: "Road Course"},
        {text: "A to B", value: "A to B"},
      ],
      nameSelector: t => t,
      layoutTypeSelector: t => t,
      selectedLayoutType: "",
      nationSelector: t => t,
      selectedNation: "",
      trackTagsSelector: t => t,
      selectedTag: "",
    }
  },
  mounted() {
    this.initiate()
  },
  computed: {
    filter() {
      return t => this.nameSelector(this.layoutTypeSelector(this.trackTagsSelector(this.nationSelector(t))))
    },
    loggedIn() {
      return this.$store.getters['authentication/loggedIn']
    },
    userRole() {
      return this.$store.getters['authentication/user'].role
    },
    tracks() {
      return this.$store.getters['tracks/tracks']
    },
    nations() {
      return this.$store.getters['tracks/nations']
    },
    filteredTracks() {
      return this.filter(this.tracks)
    },
    pageTracks() {
      return this.filteredTracks.slice(this.offset, this.offset + this.pageRows)
    },
  },
  watch: {
    loggedIn() {
      if (this.loggedIn) {
        this.initiate()
      }
    }
  },
  methods: {
    nameFilterClick() {
      this.onNameSelected(this.nameFilter)
    },
    initiate() {
      this.getAllTracks()
      this.$store.dispatch('tracks/getTracksAuthors')
      this.$store.dispatch('tracks/getAllNations')
    },
    getAllTracks() {
      this.$store.dispatch('tracks/getAllTracks')
    },
    onNameSelected(name) {
      this.selectedNameFilter = name
      this.nameSelector = tracksFilters.filterByName(name)
    },
    clearNameFilter() {
      this.selectedNameFilter = ""
      this.nameSelector = t => t
    },
    onLayoutCategorySelected(name) {
      this.layoutTypeSelector = tracksFilters.filterByLayoutCategory(name)
    },
    clearLayoutFilter() {
      this.selectedLayoutType = ""
      this.layoutTypeSelector = t => t
    },
    onTagSelected(name) {
      this.trackTagsSelector = tracksFilters.filterByTag(name)
    },
    clearTagFilter() {
      this.selectedTag = ""
      this.trackTagsSelector = t => t
    },
    onNationSelected(name) {
      this.nationSelector = tracksFilters.filterByNation(name)
    },
    clearNationFilter() {
      this.selectedNation = ""
      this.nationSelector = t => t
    },
    clearAllFilters() {
      this.selectedNameFilter = ""
      this.filter = t => t
    },
    openInNewTab(url) {
      window.open(url, '_blank').focus();
    },
    openEditTab(track) {
      this.$router.push({name: 'TrackEdit', params: {initialCar: JSON.stringify(track)}})
    }
  }
}
</script>

<style scoped>

</style>
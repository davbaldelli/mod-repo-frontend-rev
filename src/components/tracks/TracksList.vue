<template>
  <div class="p-grid">
    <div class="p-col-12 p-mt-4 text-center">
      <h1 class="display-4">AC Tracks Repository</h1>
      <p class="lead"><em>A collection of quality tracks</em></p>
    </div>
    <div class="p-col-12 p-lg-3"></div>
    <div class="p-col-12 p-lg-6">
      <div class="p-col-12">
        <div class="p-inputgroup p-mb-2">
          <InputText v-on:keyup.enter="nameFilterClick" v-model="nameFilter" placeholder="Type Track Name"/>
          <Button @click="nameFilterClick" label="Search"/>
        </div>
      </div>
      <div class="p-col-12">
        <Paginator :rows="pageRows" v-model:first="offset" :total-records="filteredTracks.length"></Paginator>
      </div>
      <div class="p-col-12">
            <Dropdown class="p-mr-2 p-mb-2 p-mb-sm-0" v-model="selectedNation" @change="e => onNationSelected(e.value)" :options="nations" :filter="true" option-label="Name" option-value="Name" placeholder="Nation"></Dropdown>
            <Dropdown class="p-mr-2 p-mb-2 p-mb-sm-0" v-model="selectedLayoutType" @change="e => onLayoutCategorySelected(e.value)" :options="categoryOpts" option-label="text" option-value="value" placeholder="Layout Category"></Dropdown>
            <Dropdown class="p-mr-2 p-mb-2 p-mb-sm-0" v-model="selectedTag" @change="e => onTagSelected(e.value)" :options="tagsOpts" option-label="text" option-value="value" placeholder="Tag"></Dropdown>
      </div>
      <div class="p-col-12">
        <Chip :label="`Name: ${selectedNameFilter}`" v-if="selectedNameFilter" @remove="clearNameFilter" class="p-ml-2" removable/>
        <Chip :label="`Nation: ${selectedNation}`" v-if="selectedNation" @remove="clearNationFilter" class="p-ml-2" removable/>
        <Chip :label="`Category: ${selectedLayoutType}`" v-if="selectedLayoutType" @remove="clearLayoutFilter" class="p-ml-2" removable/>
        <Chip :label="`Tag: ${selectedTag}`" v-if="selectedTag" @remove="clearTagFilter" class="p-ml-2" removable/>
      </div>
      <div v-if="this.$store.getters['tracks/loadingTracks']"  class="p-col-12">
        <div v-for="i in 5" :key="i" class="p-mb-2">
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
                  <Skeleton class="p-mb-1" width="30%" height="15px"></Skeleton>
                  <Skeleton class="p-mb-1" width="30%" height="15px"></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="filteredTracks.length === 0 && !this.$store.getters['tracks/loadingTracks']" class="text-center p-col-12 p-my-3">
        <h3 class="display-6">I'm sorry, no track match your request</h3>
      </div>
      <div v-else class="p-col-12">
        <div v-for="track in pageTracks" :key="track.Name" class="p-card container-fluid p-py-2 p-mb-2">
          <div class="row">
            <div class="col-lg-12 col-xl-4">
              <div class="d-flex align-items-center" style="height: 100%">
                <img :src="track.Image" alt="Fluid image " class="rounded-4 card-img">
              </div>
            </div>
            <div class="col-lg-12 col-xl-8 p-mt-2 d-flex flex-column">
              <div class="p-card-title p-mt-2 p-mb-0">
                <h3>
                  <router-link :to="{name : 'track', params:{name : track.Name}}">{{ track.Name }}</router-link>
                </h3>
              </div>
              <div class="p-card-subtitle">
                      <span class="badge badge-secondary p-mr-1" v-for="tag in track.Tags"
                            :key="tag">{{ tag }}</span>
                <span class="badge badge-warning" v-if="track.Premium">Premium</span>
              </div>
              <div class="p-card-body">
                <strong>Location: </strong>{{ track.Location }}, {{ track.Nation.Name }}<br/>
                <strong>Author: </strong>
                <a target="_blank" :href="track.Author.Link">{{ track.Author.Name }}</a>
              </div>
              <div class="p-card-footer p-text-right mt-auto">
                <Button v-if="userRole === 'admin'" @click="openEditTab(track)" icon="pi pi-pencil"
                        class="p-mr-2"></Button>
                <Button @click="openInNewTab(track.DownloadLink)" icon="pi pi-download"
                        iconPos="right"></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <Paginator :rows="pageRows" v-model:first="offset" :total-records="filteredTracks.length"></Paginator>
      </div>
    </div>
    <div class="p-col-0 p-lg-3"></div>
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
      selectedLayoutType : "",
      nationSelector: t => t,
      selectedNation : "",
      trackTagsSelector: t => t,
      selectedTag: "",
    }
  },
  mounted() {
    this.initiate()
  },
  computed: {
    filter(){
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
    clearNameFilter(){
      this.selectedNameFilter = ""
      this.nameSelector = t =>t
    },
    onLayoutCategorySelected(name) {
      this.layoutTypeSelector = tracksFilters.filterByLayoutCategory(name)
    },
    clearLayoutFilter(){
      this.selectedLayoutType = ""
      this.layoutTypeSelector = t =>t
    },
    onTagSelected(name) {
      this.trackTagsSelector = tracksFilters.filterByTag(name)
    },
    clearTagFilter(){
      this.selectedTag = ""
      this.trackTagsSelector = t =>t
    },
    onNationSelected(name) {
      this.nationSelector = tracksFilters.filterByNation(name)
    },
    clearNationFilter(){
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
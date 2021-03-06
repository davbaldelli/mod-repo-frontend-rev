<template>
  <div class="p-grid">
    <div class="p-col-12 p-mt-4 text-center">
      <h1 class="display-4">Tracks Repository</h1>
      <h2 class="lead"><em>A collection of quality tracks</em></h2>
    </div>
    <div class="p-col-12 p-lg-3"></div>
    <div class="p-col-12 p-lg-6">
      <div class="p-grid">
        <div class="p-col-12">
          <div class="p-inputgroup p-mb-2">
            <InputText v-on:keyup.enter="nameFilterClick" v-model="nameFilter" placeholder="Type Track Name"/>
            <Button @click="nameFilterClick" icon="pi pi-search" aria-label="search"/>
          </div>
        </div>
        <div class="p-col-12">
          <Paginator :rows="pageRows" v-model:first="offset" :total-records="filteredTracks.length"></Paginator>
        </div>
        <div class="p-col-12">
          <Dropdown class="p-mr-2 p-mb-2 p-mb-sm-0" v-model="selectedNation" @change="e => onNationSelected(e.value)"
                    :options="nations" :filter="true" option-label="name" option-value="name" :loading="this.$store.getters['tracks/loadingNations']"
                    placeholder="Nation" aria-label="nation filter selection"></Dropdown>
          <Dropdown class="p-mr-2 p-mb-2 p-mb-sm-0" v-model="selectedLayoutType"
                    @change="e => onLayoutCategorySelected(e.value)" :options="categoryOpts" option-label="text"
                    option-value="value" placeholder="Layout Category" aria-label="layout type selection"></Dropdown>
          <Dropdown class="p-mr-2 p-mb-2 p-mb-sm-0" v-model="selectedTag" @change="e => onTagSelected(e.value)"
                    :options="tagsOpts" option-label="text" option-value="value" placeholder="Tag"></Dropdown>
          <Dropdown class="p-mr-2 p-mb-2 p-mb-sm-0" v-model="selectedAuthor" :options="authors" option-label="name"
                    :filter="true" :loading="this.$store.getters['tracks/loadingAuthors']"
                    @change="e => onAuthorSelected(e.value.name)" placeholder="Author" aria-label="mod author selection"/>
          <Dropdown class="p-mr-2 p-mb-2 p-mb-sm-0" @change="e => sort(e.value)" v-model="selectedSort"
                    :options="sortOpts"
                    placeholder="Sort By" option-label="label" option-value="value" aria-label="sort selection"></Dropdown>
        </div>
        <div class="p-col-12">
          <Chip :label="`Name: ${selectedNameFilter}`" v-if="selectedNameFilter" @remove="clearNameFilter"
                class="p-ml-2" removable/>
          <Chip :label="`Nation: ${selectedNation}`" v-if="selectedNation" @remove="clearNationFilter" class="p-ml-2"
                removable/>
          <Chip :label="`Category: ${selectedLayoutType}`" v-if="selectedLayoutType" @remove="clearLayoutFilter"
                class="p-ml-2" removable/>
          <Chip :label="`Tag: ${selectedTag}`" v-if="selectedTag" @remove="clearTagFilter" class="p-ml-2" removable/>
          <Chip :label="`Author: ${selectedAuthor.name}`" v-if="selectedAuthor" @remove="clearAuthorFilter" class="p-ml-2" removable/>
        </div>
        <div v-if="this.$store.getters['tracks/loadingTracks']" class="p-col-12">
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
        <div v-if="filteredTracks.length === 0 && !this.$store.getters['tracks/loadingTracks']"
             class="text-center p-col-12 p-my-3">
          <h3 class="display-6">I'm sorry, no track match your request</h3>
        </div>
        <div v-else class="p-col-12">
          <div class="p-grid p-p-2">
            <div v-for="(track, index) in pageTracks" :key="index" class="p-col-12">
              <div class="p-grid p-card p-p-2">
                <div class="p-col-12 p-xl-4 p-p-2">
                  <div class="d-flex align-items-center" style="height: 100%">
                    <img loading="lazy" :src="track.image" alt="track thumbnail" class="rounded-4 card-img">
                  </div>
                </div>
                <div class="p-col-12 p-xl-8 p-p-3 d-flex flex-column">
                  <div class="p-card-title p-mb-0">
                    <h3>
                      <router-link :to="{name : 'track', params:{id : track.id}}">{{ track.name }}</router-link>
                    </h3>
                  </div>
                  <div class="p-card-subtitle">
                      <span class="badge badge-secondary p-mr-1" v-for="tag in track.tags"
                            :key="tag">{{ tag }}</span>
                    <span class="badge badge-warning" v-if="track.premium">Premium</span>
                  </div>
                  <div class="p-card-body">
                    <Rating class="p-mb-1" :model-value="track.rating/2" :readonly="true" :cancel="false" />
                    <strong>Location: </strong>{{ track.location }}, {{ track.nation.name }}<br/>
                    <strong>Author: </strong>
                    <a target="_blank" :href="track.author.link" rel="noopener">{{ track.author.name }}</a> v{{track.version}}
                  </div>
                  <div class="p-card-footer p-pt-0 p-text-right mt-auto">
                    <router-link  aria-label="edit link" :to="`/track/edit/${track.id}`" tag="button">
                      <Button aria-label="edit button" v-if="userRole === 'admin'" icon="far fa-edit"
                              class="p-mr-2 p-button-warning"></Button>
                    </router-link>
                    <a aria-label="mod download link" :href="track.downloadLink" target="_blank" rel="noopener">
                      <Button aria-label="download button" icon="pi pi-download"
                              iconPos="right"></Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-col-12">
          <Paginator :rows="pageRows" v-model:first="offset" :total-records="filteredTracks.length"></Paginator>
        </div>
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
import Rating from "primevue/rating";
import {tracksFilters, trackSort} from "@/_helpers";

export default {
  name: "TracksList",
  components: {
    InputText,
    Button,
    Paginator,
    Chip,
    Dropdown,
    Skeleton,
    Rating,
  },
  setup() {
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
      sortOpts: [
        {label: 'Name (A-Z)', value: trackSort.sortByName(true)},
        {label: 'Name (Z-A)', value: trackSort.sortByName(false)},
        {label: 'Latest Submitted', value: trackSort.sortBySubmission()},
      ],
      sorter: trackSort.sortByName(true),
      nameSelector: t => t,
      layoutTypeSelector: t => t,
      selectedLayoutType: "",
      nationSelector: t => t,
      selectedNation: "",
      trackTagsSelector: t => t,
      selectedTag: "",
      authorSelector: t => t,
      selectedAuthor : "",
      selectedSort : "",
    }
  },
  mounted() {
    this.initiate()
  },
  computed: {
    filter() {
      return t => this.authorSelector(this.nameSelector(this.layoutTypeSelector(this.trackTagsSelector(this.nationSelector(t)))))
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
      return this.filter(this.tracks).sort(this.sorter)
    },
    pageTracks() {
      return this.filteredTracks.slice(this.offset, this.offset + this.pageRows)
    },
    authors(){
      return this.$store.getters['tracks/authors']
    }
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
    sort(value) {
      this.sorter = value
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
    onAuthorSelected(name){
      this.authorSelector = tracksFilters.filterByAuthor(name)
    },
    clearAuthorFilter(){
      this.selectedAuthor = ""
      this.authorSelector = t => t
    },
    openInNewTab(url) {
      window.open(url, '_blank').focus();
    },
    openEditTab(track) {
      this.$router.push({name: 'TrackEdit', params: {id: track.id}})
    }
  }
}
</script>

<style scoped>

</style>
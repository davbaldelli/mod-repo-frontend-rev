<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 text-center">
        <h1 class="display-4">AC Tracks Repository</h1>
        <p class="lead"><em>A collection of quality tracks</em></p>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-3"></div>
      <div class="col-12 col-lg-6">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-12">
                <div class="p-inputgroup p-mb-2">
                  <InputText v-on:keyup.enter="nameFilterClick" v-model="nameFilter" placeholder="Type Car Name"/>
                  <Button @click="nameFilterClick" label="Search"/>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <Paginator :rows="pageRows" v-model:first="offset" :total-records="filteredTracks.length"></Paginator>
              </div>
            </div>
            <div class="row p-my-2">
              <div class="col-12">
                <Chip :label="selectedNameFilter" v-if="selectedNameFilter" @remove="clearAllFilters" removable/>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="p-mb-2" v-for="track in pageTracks" :key="track.Name">
                  <div class="p-card container-fluid p-py-2">
                    <div class="row p-p-0">
                      <div class="col-lg-12 col-xl-4 p-p-0">
                        <div class="d-flex align-items-center" style="height: 100%">
                          <img :src="track.Image" alt="Fluid image " class="rounded-4 card-img">
                        </div>
                      </div>
                      <div class="col-lg-12 col-xl-8 p-mt-2 p-pr-0 d-flex flex-column">
                        <div class="p-card-title">
                          <h3>
                            <router-link :to="{name : 'track', query:{}}">{{ track.Name }}</router-link>
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
                          <Button @click="openInNewTab(track.DownloadLink)" icon="pi pi-download"
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
      </div>
      <div class="col-0 col-lg-3"></div>
    </div>
  </div>
</template>

<script>

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Paginator from "primevue/paginator";
import Chip from "primevue/chip";
import {tracksFilters} from "@/_helpers/tracks-filters";

export default {
  name: "TracksList",
  components: {
    InputText,
    Button,
    Paginator,
    Chip
  },
  data() {
    return {
      nameFilter: "",
      selectedNameFilter : "",
      pageRows: 25,
      offset: 0,
      filter: t => t,
    }
  },
  mounted() {
    this.initiate()
  },
  computed: {
    tracks() {
      return this.$store.getters['tracks/tracks']
    },
    filteredTracks() {
      return this.filter(this.tracks)
    },
    pageTracks() {
      return this.filteredTracks.slice(this.offset, this.offset + this.pageRows)
    },
  },
  methods: {
    nameFilterClick() {
      this.selectedNameFilter = this.nameFilter
      this.filter = tracksFilters.filterByName(this.nameFilter)
    },
    initiate() {
      this.getAllTracks()
      this.$store.dispatch('tracks/getTracksAuthors')
      this.$store.dispatch('tracks/getAllNations')
    },
    getAllTracks() {
      this.$store.dispatch('tracks/getAllTracks')
    },
    clearAllFilters(){
      this.selectedNameFilter = ""
      this.filter = t => t
    },
    openInNewTab(url) {
      window.open(url, '_blank').focus();
    }
  }
}
</script>

<style scoped>

</style>
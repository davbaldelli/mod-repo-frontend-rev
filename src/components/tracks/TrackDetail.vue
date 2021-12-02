<template>
  <div class="p-grid">
    <div class="p-col-12 p-lg-2 p-xl-4"></div>
    <div class="p-col-12 p-lg-8 p-xl-4">
      <div v-if="!track && !trackLoading" class="p-col-12">
        <h3 class="p-mt-4">I'm sorry, but I can't find the track that you are looking for. You can turn back to the <router-link to="/tracks/">tracks list</router-link> and see if that exits.</h3>
      </div>
      <div v-if="trackLoading">
        <div class="p-grid">
          <div class="p-col-12">
            <Skeleton height="450px" width="100%"></Skeleton>
          </div>
          <div class="p-col-12">
            <div class="p-grid">
              <div class="p-col-12">
                <Skeleton height="60px" width="70%"></Skeleton>
              </div>
              <div class="p-col-12 p-p-3">
                <div class="p-grid p-card">
                  <div class="p-col-12 p-sm-6 p-p-sm-3 p-pt-3 p-pb-0">
                    <Skeleton class="p-m-2" height="30px" width="auto"></Skeleton>
                    <Skeleton class="p-m-2" height="30px" width="auto"></Skeleton>
                  </div>
                  <div class="p-col-12 p-sm-6 p-p-sm-3 p-pt-0">
                    <Skeleton class="p-m-2" height="30px" width="auto"></Skeleton>
                    <Skeleton class="p-m-2" height="30px" width="auto"></Skeleton>
                  </div>
                </div>
              </div>
              <div class="p-col-12 p-mt-2">
                <Skeleton width="30%" height="40px"></Skeleton>
              </div>
              <div class="p-col-12 p-p-3">
                <div class="p-grid p-card">
                  <div class="p-col-12 p-sm-4"><Skeleton height="30px" width="40%"/></div>
                  <div class="p-col-12 p-sm-4"><Skeleton height="30px" width="60%"/></div>
                  <div class="p-col-12 p-sm-4"><Skeleton height="30px" width="50%"/></div>
                </div>
              </div>
              <div class="p-col-12"><Skeleton class="p-p-2" height="40px"></Skeleton></div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="track" class="p-col-12">
        <div class="p-grid">
          <div class="p-col-12">
            <div class="p-grid">
              <div class="p-col-12">
                <img :src="track.image" alt="track thumbnail" class="rounded-3 card-img">
              </div>
              <div class="p-col-12 p-text-center">
                <h1 class="display-4 p-mb-0">{{track.name}}</h1>
              </div>
              <div class="p-col-12 p-text-center">
                <Rating :model-value="track.rating" :stars="10" :readonly="true" :cancel="false"></Rating>
              </div>
              <div class="p-col-12 p-p-3">
                <div class="p-grid p-card p-p-2">
                  <div class="p-col-12 p-sm-6 p-p-sm-3 p-pt-3 p-pb-0">
                    <strong>Construction Year</strong>: {{track.year}}<hr>
                    <strong>Location</strong>: {{ track.location }}, {{ track.nation.name }}<hr>
                  </div>
                  <div class="p-col-12 p-sm-6 p-p-sm-3 p-pt-0">
                    <strong>Author</strong>: <a :href="track.author.link">{{ track.author.name }}</a><hr>
                    <strong>Mod Version</strong> {{track.version}}<hr>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-col-12 p-mt-2"><h3>Layouts</h3></div>
          <div class="p-col-12">
            <div class="p-grid p-p-2">
              <div v-for="(layout, id) in track.layouts" :key="id" class="p-col-12  p-p-2">
                <div class="p-grid p-card">
                  <div class="p-col-12 p-sm-4"><strong>Name</strong>: {{ layout.name }}</div>
                  <div class="p-col-12 p-sm-4"><strong>Type</strong>: {{ layout.category }}</div>
                  <div class="p-col-12 p-sm-4"><strong>Length</strong>: {{ layout.lengthM }}m</div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-col-12"><Button style="width: 100%" label="Download" @click="openInNewTab(track.downloadLink)"></Button></div>
          <div class="p-col-12"><Button v-if="userRole === 'admin'" @click="openEditTab(car)" label="Edit"
                                        class="p-button-warning" style="width: 100%"></Button></div>
        </div>
      </div>
    </div>
    <div class="p-col-12 p-lg-2 p-xl-4"></div>
  </div>
</template>

<script>
import Skeleton from "primevue/skeleton";
import Button from "primevue/button";
import Rating from "primevue/rating";

export default {
  name: "TrackDetail",
  components:{
    Skeleton,
    Button,
    Rating,
  },
  data() {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    track() {
      return this.$store.getters['tracks/getTrackByName'](this.id)
    },
    trackLoading(){
      return this.$store.getters['tracks/loadingTracks']
    },
    userRole() {
      return this.$store.getters['authentication/user'].role
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$store.dispatch('tracks/getAllTracks')
    },
    openInNewTab(url) {
      window.open(url, '_blank').focus();
    },
    openEditTab(car) {
      this.$router.push({name: 'CarEdit', params: {id: car.id}})
    }
  },
}
</script>

<style scoped>

</style>
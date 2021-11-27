<template>
  <div class="p-grid">
    <div class="p-col-12 p-lg-2 p-xl-4"></div>
    <div class="p-col-12 p-lg-8 p-xl-4">
      <div v-if="track" class="p-grid">
        <div class="p-col-12">
          <div class="p-grid">
            <div class="p-col-12">
              <img :src="track.Image" alt="track thumbnail" class="rounded-3 card-img">
            </div>
            <div class="p-col-12">
              <h1 class="display-4">{{track.Name}}</h1>
            </div>
            <div class="p-col-12 p-p-3">
              <div class="p-grid p-card p-p-2">
                <div class="p-col-12 p-sm-6 p-p-sm-3 p-pt-3 p-pb-0">
                  <strong>Name</strong>: {{ track.Name }}<hr>
                  <strong>Year</strong>: {{track.Year}}<hr>
                </div>
                <div class="p-col-12 p-sm-6 p-p-sm-3 p-pt-0">
                  <strong>Location</strong>: {{ track.Location }}, {{ track.Nation.Name }}<hr>
                  <strong>Author</strong>: <a :href="track.Author.Link">{{ track.Author.Name }}</a><hr>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-col-12 p-mt-2"><h3>Layouts</h3></div>
        <div class="p-col-12">
          <div class="p-grid p-p-2">
            <div v-for="(layout, id) in track.Layouts" :key="id" class="p-col-12  p-p-2">
              <div class="p-grid p-card">
                <div class="p-col-12 p-sm-4"><strong>Name</strong>: {{ layout.Name }}</div>
                <div class="p-col-12 p-sm-4"><strong>Type</strong>: {{ layout.Category }}</div>
                <div class="p-col-12 p-sm-4"><strong>Length</strong>: {{ layout.LengthM }}m</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-col-12 p-lg-2 p-xl-4"></div>
  </div>
</template>

<script>
export default {
  name: "TrackDetail",
  data() {
    return {
      name: this.$route.params.name
    }
  },
  computed: {
    track() {
      return this.$store.getters['tracks/getTrackByName'](this.name)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$store.dispatch('tracks/getAllTracks')
    }
  },
}
</script>

<style scoped>

</style>
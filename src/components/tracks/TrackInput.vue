<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-lg-4"></div>
      <div class="col-12 col-lg-4">
        <TrackForm :initial-value="initialTrack" @submit="onSubmit"></TrackForm>
      </div>
      <div class="col-12 col-lg-4"></div>
    </div>
  </div>
</template>

<script>
import TrackForm from "@/components/tracks/TrackForm";

export default {
  name: "TrackInput",
  components: {
    TrackForm,
  },
  data() {
    return {
      initialTrack: {
        DownloadLink: "",
        Image: "",
        Name: "",
        Location: "",
        Tags: [],
        Year: 0,
        Nation: {
          Name: "",
        },
        Premium: false,
        Layouts: [
          {
            LengthM: 0,
            Category: "",
            Name: "",
          },
        ],
        Author: {
          Name: "",
          Link: "",
        },
      },
    }
  },
  methods:{
    onSubmit(track){
      this.$store.dispatch('tracks/addTrack', track)
          .then(() => this.$toast.add({severity:'success', summary: 'Track created successfully', detail:'Car created', life: 3000}))
          .catch((e) => this.$toast.add({severity:'error', summary: 'Error crating the track', detail:e.data.error, life: 7000}))
    }
  }
}
</script>

<style scoped>

</style>
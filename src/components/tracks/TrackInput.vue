<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-lg-4"></div>
      <div class="col-12 col-lg-4">
        <TrackForm :initial-value="initialTrack" @submit="onSubmit"></TrackForm>
      </div>
      <div class="col-12 col-lg-4"></div>
    </div>
    <Toast position="center"/>
  </div>
</template>

<script>
import TrackForm from "@/components/tracks/TrackForm";
import Toast from "primevue/toast";

export default {
  name: "TrackInput",
  components: {
    TrackForm,
    Toast
  },
  data() {
    return {
      initialTrack: {
        downloadLink: "",
        image: "",
        name: "",
        location: "",
        tags: [],
        year: 0,
        nation: {
          name: "",
        },
        premium: false,
        layouts: [
          {
            lengthM: 0,
            category: "",
            name: "",
          },
        ],
        author: {
          name: "",
          link: "",
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
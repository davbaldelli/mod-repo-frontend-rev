<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-lg-4"></div>
      <div class="col-12 col-lg-4">
        <TrackForm v-if="track" :initial-value="track" @submit="onSubmit"></TrackForm>
      </div>
      <div class="col-12 col-lg-4"></div>
    </div>
  </div>
  <Dialog header="Success!" v-model:visible="success" @hide="closeSuccess" :modal="true">
    {{successMessage}}
    <template #footer>
      <Button label="OK" icon="pi pi-check" @click="closeSuccess" autofocus></Button>
    </template>
  </Dialog>
  <Dialog header="Failure :(" v-model:visible="fail" :modal="true">{{failMessage}}
    <template #footer>
      <Button label="OK" icon="pi pi-check" @click="this.fail = false" autofocus></Button>
    </template>
  </Dialog>
</template>

<script>

import TrackForm from "@/components/tracks/TrackForm";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

export default {
  name: "TrackEdit",
  props : ["initialTrack"],
  components : {
    TrackForm,
    Dialog,
    Button,
  },
  data(){
    return{
      name: this.$route.params.name,
      success : false,
      successMessage : "",
      fail : false,
      failMessage : "",
    }
  },
  computed:{
    track(){
      return this.$store.getters['tracks/getTrackByName'](this.name)
    },
  },
  mounted() {
    this.$store.dispatch('tracks/getAllTracks')
  },
  methods:{
    onSubmit(track){
      this.$store.dispatch('tracks/updateTrack', track)
          .then(() => {
            this.success = true
            this.successMessage = "Track edited successfully"
          })
          .catch((e) => {
            this.fail = true
            this.failMessage = e.data.error
          })
    },
    closeSuccess(){
      this.$router.push("/tracks")
    },
  }
}
</script>

<style scoped>

</style>
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
  name: "TrackEdit",
  props : ["initialTrack"],
  components : {
    TrackForm,
  },
  methods:{
    onSubmit(track){
      this.$store.dispatch('tracks/updateTrack', track)
          .then(() => alert(`Pista inserita correttamente: ${JSON.stringify(this.$store.getters["alert/alert"].message.data)}`))
          .catch(() => alert(`Errore nell'inserimento della pista: ${JSON.stringify(this.$store.getters["alert/alert"].message.data)}`))
    }
  }
}
</script>

<style scoped>

</style>
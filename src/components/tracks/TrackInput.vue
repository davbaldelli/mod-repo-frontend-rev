<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-lg-4"></div>
      <div class="col-12 col-lg-4">
        <TrackForm :initial-value="initialTrack" @submit="onSubmit"></TrackForm>
      </div>
      <div class="col-12 col-lg-4"></div>
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
  </div>
</template>

<script>
import TrackForm from "@/components/tracks/TrackForm";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

export default {
  name: "TrackInput",
  components: {
    TrackForm,
    Dialog,
    Button,
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
        rating : 0,
        version : "",
      },
      success : false,
      successMessage : "",
      fail : false,
      failMessage : "",
    }
  },
  methods:{
    onSubmit(track){
      this.$store.dispatch('tracks/addTrack', track)
          .then(() => {
            this.success = true
            this.successMessage = "Track created successfully"
          })
          .catch((e) => {
            this.fail = true
            this.failMessage = e.data.error
          })
    },
    closeSuccess(){
      this.$router.back()
    },
  }
}
</script>

<style scoped>

</style>
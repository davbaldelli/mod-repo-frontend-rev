<template>
  <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-lg-4"></div>
        <div class="col-12 col-lg-4">
          <CarForm @onSubit="(e) => console.log(e)" :initial-value="form"></CarForm>
        </div>
        <div class="col-12 col-lg-4"></div>
      </div>
  </div>
</template>

<script>
import CarForm from '@/components/cars/car-form'
export default {
  name: "CarInput",
  components : {
    CarForm
  },
  data() {
    return {
      form: {
        Torque: 0,
        BHP: 0,
        Weight: 0,
        TopSpeed: 0,
        DownloadLink: "",
        Image: "",
        ModelName: "",
        Author: {
          Name: "",
          Link: "",
        },
        Brand: {
          Name: "",
          Nation: {
            Name: "",
          },
        },
        Year: 0,
        Drivetrain: "",
        Transmission: "",
        Categories: [
          {
            Name: "",
          },
        ],
        Premium: false,
      },
    }
  },
}
</script>

<style scoped>

</style>
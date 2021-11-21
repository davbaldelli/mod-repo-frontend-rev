<template>
  <div class="p-fluid p-formgrid p-grid">
    <div class="p-field col-12">
      <label for="modelTextField">Model Name</label>
      <InputText id="modelTextField" type="text" v-model="form.ModelName"></InputText>
    </div>
    <div v-if="existingBrand" class="p-field col-10">
      <label for="brandDropbox">Brand</label>
      <Dropdown filter id="brandDropbox" :options="brands" option-label="Name" v-model="form.Brand"></Dropdown>
    </div>
    <div v-if="!existingBrand" class="p-field col-10">
      <label for="brandTextField">Brand</label>
      <InputText id="brandTextField" v-model="form.Brand.Name"></InputText>
    </div>
    <div class="p-field-checkbox col-2 p-pl-5 p-pt-5">
      <CheckBox id="existingBrandCheck" v-model="existingBrand" :binary="true"></CheckBox>
      <label for="existingBrandCheck">Existing</label>
    </div>
    <div class="p-field col-12">
      <label for="yearTextField">Year</label>
      <InputNumber v-model="form.Year" show-buttons id="yearTextField" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :min="0"></InputNumber>
    </div>
    <div class="p-field-checkbox p-ml-2 col-12">
      <CheckBox id="premiumCheck" name="premiumCheck" v-model="form.Premium" :binary="true" />
      <label for="premiumCheck">Premium</label>
    </div>
    <div class="p-field col-12">
      <label for="powerTextField">Horsepower</label>
      <InputNumber v-model="form.BHP" show-buttons id="powerTextField" suffix="BHP" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :min="0"></InputNumber>
    </div>
    <div class="p-field col-12">
      <label for="torqueTextField">Torque</label>
      <InputNumber v-model="form.Torque" show-buttons id="torqueTextField" suffix="Nm" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :min="0"></InputNumber>
    </div>
    <div class="p-field col-12">
      <label for="weightTextField">Weight</label>
      <InputNumber v-model="form.Weight" show-buttons id="weightTextField" suffix="Kg" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :min="0"></InputNumber>
    </div>
    <div class="p-field col-12">
      <label for="topSpeedTextField">Top Speed</label>
      <InputNumber v-model="form.TopSpeed" show-buttons id="topSpeedTextField" suffix="Km/h" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" :min="0"></InputNumber>
    </div>
    <div class="p-field col-6 p-pr-1">
      <label for="drivetrainCheckBox">Drivetrain</label>
      <Dropdown id="drivetrainCheckBox" :options="drivetrainOptions" optionLabel="text" optionValue="value" v-model="form.Drivetrain" placeholder="Select Drivetrain"></Dropdown>
    </div>
    <div class="p-field col-6 p-pl-1">
      <label for="transmissionCheckBox">Transmission</label>
      <Dropdown id="transmissionCheckBox" :options="transmissionOptions" optionLabel="text" optionValue="value" v-model="form.Transmission" placeholder="Select Transmission Type"></Dropdown>
    </div>
    <div class="p-field col-12">
      <label for="downloadLinkTextField">Download Link</label>
      <InputText id="downloadLinkTextField" type="url" v-model="form.DownloadLink"></InputText>
    </div>
    <div class="p-field col-12">
      <label for="imageLinkTextField">Image Link</label>
      <InputText id="imageLinkTextField" type="url" v-model="form.Image"></InputText>
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import CheckBox from 'primevue/checkbox';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';

export default {
  props : ["initialValue"],
  emits : ["onSubmit"],
  name: "CarForm",
  components : {
    InputText,
    CheckBox,
    InputNumber,
    Dropdown,
  },
  data() {
    return {
      form : this.initialValue,
      transmissionOptions: [
        {value: "Sequential", text: "Sequential"},
        {value: "Manual", text: "Manual"},
      ],
      drivetrainOptions: [
        {value: "AWD", text: "AWD"},
        {value: "RWD", text: "RWD"},
        {value: "FWD", text: "FWD"},
      ],
      existingBrand : true,
      existingNation : true,
    }
  },
  computed: {
    brands() {
      return this.$store.getters['cars/brands']
    }
  },
  mounted() {
    this.$store.dispatch('cars/getCarBrands')
  }
}
</script>

<style scoped>

</style>
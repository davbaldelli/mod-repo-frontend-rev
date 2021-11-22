<template>
  <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid p-formgrid p-grid">
    <div class="p-field p-col-12 p-sm-10">
      <label for="modelTextField">Model Name</label>
      <InputText id="modelTextField" type="text" v-model="form.ModelName"
                 :class="{'p-invalid':v$.form.ModelName.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.ModelName.$invalid && submitted) || v$.form.ModelName.$pending.$response"
             class="p-error">{{ v$.form.ModelName.required.$message.replace('Value', 'Model Name') }}</small>
    </div>
    <div class="p-field-checkbox p-col-12 p-sm-2 p-pt-sm-5">
      <CheckBox id="premiumCheck" name="premiumCheck" v-model="form.Premium" :binary="true"/>
      <label for="premiumCheck">Premium</label>
    </div>
    <div v-if="existingBrand" class="p-field p-col-12 p-sm-10">
      <label for="brandDropbox">Brand</label>
      <Dropdown filter id="brandDropbox" :options="brands" option-label="Name" v-model="form.Brand"
                :class="{'p-invalid':v$.form.Brand.Name.$invalid && submitted}"></Dropdown>
      <small v-if="(v$.form.Brand.Name.$invalid && submitted) || v$.form.Brand.Name.$pending.$response" class="p-error">{{ v$.form.Brand.Name.required.$message.replace('Value', 'Brand') }}</small>
    </div>
    <div v-if="!existingBrand" class="p-field p-col-12 p-sm-10">
      <label for="brandTextField">Brand</label>
      <InputText id="brandTextField" v-model="form.Brand.Name"
                 :class="{'p-invalid':v$.form.Brand.Name.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.Brand.Name.$invalid && submitted) || v$.form.Brand.Name.$pending.$response" class="p-error">{{ v$.form.Brand.Name.required.$message.replace('Value', 'Brand Name') }}</small>
    </div>
    <div class="p-field-checkbox p-sm-2 p-col-12 p-pt-sm-5">
      <CheckBox id="existingBrandCheck" v-model="existingBrand" :binary="true"></CheckBox>
      <label for="existingBrandCheck">Existing</label>
    </div>
    <div v-if="!existingBrand && existingNation" class="p-field p-col-12 p-sm-10">
      <label for="nationDropbox">Nation</label>
      <Dropdown filter id="nationDropbox" :options="nations" option-label="Name" v-model="form.Brand.Nation"
                :class="{'p-invalid':v$.form.Brand.Nation.Name.$invalid && submitted}"></Dropdown>
      <small v-if="(v$.form.Brand.Nation.Name.$invalid && submitted) || v$.form.Brand.Nation.Name.$pending.$response"
             class="p-error">{{ v$.form.Brand.Nation.Name.required.$message.replace('Value', 'Nation') }}</small>
    </div>
    <div v-if="!existingBrand && !existingNation" class="p-field p-col-6 p-sm-5 p-px-2 p-py-0">
      <label for="nationNameTextField">Nation Name</label>
      <InputText id="nationNameTextField" v-model="form.Brand.Nation.Name"
                 :class="{'p-invalid':v$.form.Brand.Nation.Name.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.Brand.Nation.Name.$invalid && submitted) || v$.form.Brand.Nation.Name.$pending.$response"
             class="p-error">{{ v$.form.Brand.Nation.Name.required.$message.replace('Value', 'Nation Name') }}</small>
    </div>
    <div v-if="!existingBrand && !existingNation" class="p-field p-col-6 p-sm-5 p-px-2 p-py-0">
      <label for="nationCodeTextField">Nation Code</label>
      <InputText id="nationCodeTextField" v-model="form.Brand.Nation.Code"
                 :class="{'p-invalid':v$.form.Brand.Nation.Code.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.Brand.Nation.Code.$invalid && submitted) || v$.form.Brand.Nation.Code.$pending.$response"
             class="p-error">{{ v$.form.Brand.Nation.Code.required.$message.replace('Value', 'Nation Code') }}</small>
    </div>
    <div v-if="!existingBrand" class="p-field-checkbox p-col-12 p-sm-2 p-pt-sm-5">
      <CheckBox id="existingNationCheck" v-model="existingNation" :binary="true"></CheckBox>
      <label for="existingNationCheck">Existing</label>
    </div>
    <div class="p-field p-col-12">
      <label for="yearTextField">Year</label>
      <InputNumber v-model="form.Year" :use-grouping="false" show-buttons id="yearTextField" :min="0"
                   :class="{'p-invalid':v$.form.Year.$invalid && submitted}"></InputNumber>
      <small v-if="(v$.form.Year.$invalid && submitted) || v$.form.Year.$pending.$response"
             class="p-error">{{ v$.form.Year.required.$message.replace('Value', 'Year') }}</small>
    </div>
    <div class="p-field p-col-12">
      <label for="powerTextField">Horsepower</label>
      <InputNumber v-model="form.BHP" show-buttons id="powerTextField" suffix="BHP" :min="0"
                   :class="{'p-invalid':v$.form.BHP.$invalid && submitted}"></InputNumber>
      <small v-if="(v$.form.BHP.$invalid && submitted) || v$.form.BHP.$pending.$response"
             class="p-error">{{ v$.form.BHP.required.$message.replace('Value', 'Car Power') }}</small>
    </div>
    <div class="p-field p-col-12">
      <label for="torqueTextField">Torque</label>
      <InputNumber v-model="form.Torque" show-buttons id="torqueTextField" suffix="Nm" :min="0"
                   :class="{'p-invalid':v$.form.Torque.$invalid && submitted}"></InputNumber>
      <small v-if="(v$.form.Torque.$invalid && submitted) || v$.form.Torque.$pending.$response"
             class="p-error">{{ v$.form.Torque.required.$message.replace('Value', 'Torque') }}</small>
    </div>
    <div class="p-field p-col-12">
      <label for="weightTextField">Weight</label>
      <InputNumber v-model="form.Weight" show-buttons id="weightTextField" suffix="Kg" :min="0"
                   :class="{'p-invalid':v$.form.Weight.$invalid && submitted}"></InputNumber>
      <small v-if="(v$.form.Weight.$invalid && submitted) || v$.form.Weight.$pending.$response"
             class="p-error">{{ v$.form.Weight.required.$message.replace('Value', 'Weight') }}</small>
    </div>
    <div class="p-field p-col-12">
      <label for="topSpeedTextField">Top Speed</label>
      <InputNumber v-model="form.TopSpeed" show-buttons id="topSpeedTextField" suffix="Km/h" :min="0"
                   :class="{'p-invalid':v$.form.TopSpeed.$invalid && submitted}"></InputNumber>
      <small v-if="(v$.form.TopSpeed.$invalid && submitted) || v$.form.TopSpeed.$pending.$response"
             class="p-error">{{ v$.form.TopSpeed.required.$message.replace('Value', 'Top Speed') }}</small>
    </div>
    <div class="p-field p-col-6 p-pr-1">
      <label for="drivetrainDropdown">Drivetrain</label>
      <Dropdown id="drivetrainDropdown" :options="drivetrainOptions" optionLabel="text" optionValue="value"
                v-model="form.Drivetrain" placeholder="Select Drivetrain"
                :class="{'p-invalid':v$.form.Drivetrain.$invalid && submitted}"></Dropdown>
      <small v-if="(v$.form.Drivetrain.$invalid && submitted) || v$.form.Drivetrain.$pending.$response" class="p-error">{{ v$.form.Drivetrain.required.$message.replace('Value', 'Drivetrain') }}</small>
    </div>
    <div class="p-field p-col-6 p-pl-1">
      <label for="transmissionDropdown">Transmission</label>
      <Dropdown id="transmissionDropdown" :options="transmissionOptions" optionLabel="text" optionValue="value"
                v-model="form.Transmission" placeholder="Select Transmission Type"
                :class="{'p-invalid':v$.form.Transmission.$invalid && submitted}"></Dropdown>
      <small v-if="(v$.form.Transmission.$invalid && submitted) || v$.form.Transmission.$pending.$response"
             class="p-error">{{ v$.form.Transmission.required.$message.replace('Value', 'Transmission') }}</small>
    </div>
    <div class="p-field p-col-12">
      <label for="downloadLinkTextField">Download Link</label>
      <InputText id="downloadLinkTextField" type="url" v-model="form.DownloadLink" :class="{'p-invalid':v$.form.DownloadLink.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.DownloadLink.$invalid && submitted) || v$.form.DownloadLink.$pending.$response"
             class="p-error">{{ v$.form.DownloadLink.required.$message.replace('Value', 'Download Link') }}
        {{ `, ${v$.form.DownloadLink.url.$message}` }}</small>
    </div>
    <div class="p-field p-col-12">
      <label for="imageLinkTextField">Image Link</label>
      <InputText id="imageLinkTextField" type="url" v-model="form.Image" :class="{'p-invalid':v$.form.Image.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.Image.$invalid && submitted) || v$.form.Image.$pending.$response"
             class="p-error">{{ v$.form.Image.required.$message.replace('Value', 'Download Link') }}
        {{ `, ${v$.form.Image.url.$message}` }}</small>
    </div>
    <div v-if="existingAuthor" class="p-field p-col-12 p-sm-10">
      <label for="authorDropdown">Author</label>
      <Dropdown id="authorDropdown" :options="authors" filter optionLabel="Name" v-model="form.Author"
                placeholder="Select Author" :class="{'p-invalid':v$.form.Author.Name.$invalid && submitted}"></Dropdown>
      <small v-if="(v$.form.Author.Name.$invalid && submitted) || v$.form.Author.Name.$pending.$response"
             class="p-error">{{ v$.form.Author.Name.required.$message.replace('Value', 'Author') }}</small>
    </div>
    <div v-if="!existingAuthor" class="p-field p-col-6 p-sm-5 p-px-2 p-py-0">
      <label for="authorNameTextField">Author Name</label>
      <InputText id="authorNameTextField" v-model="form.Author.Name" :class="{'p-invalid':v$.form.Author.Name.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.Author.Name.$invalid && submitted) || v$.form.Author.Name.$pending.$response"
             class="p-error">{{ v$.form.Author.Name.required.$message.replace('Value', 'Author Name') }}</small>
    </div>
    <div v-if="!existingAuthor" class="p-field p-col-6 p-sm-5 p-px-2 p-py-0">
      <label for="authorLinkTextField">Author Link</label>
      <InputText id="authorLinkTextField" v-model="form.Author.Link" :class="{'p-invalid':v$.form.Author.Link.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.Author.Link.$invalid && submitted) || v$.form.Author.Link.$pending.$response"
             class="p-error">{{ v$.form.Author.Link.required.$message.replace('Value', 'Author Link') }}</small>
    </div>
    <div class="p-field-checkbox p-col-12 p-sm-2 p-pt-sm-5">
      <CheckBox id="existingAuthorCheck" v-model="existingAuthor" :binary="true"></CheckBox>
      <label for="existingAuthorCheck">Existing</label>
    </div>
    <div class="p-field p-col-12">
      <label for="categoriesChips">Categories</label>
      <Chips id="categoriesChips" @add="addCategory" @remove="removeCategory" v-model="categoryValues"
             :allow-duplicate="false"></Chips>
    </div>
    <Button type="submit" label="Submit" class="p-mt-2"/>
  </form>
</template>

<script>
import InputText from "primevue/inputtext";
import CheckBox from 'primevue/checkbox';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Button from "primevue/button";
import Chips from "primevue/chips";
import useVuelidate from "@vuelidate/core";
import {integer, minValue, required, url} from '@vuelidate/validators'

export default {
  props: ["initialValue"],
  emits: ["submit"],
  name: "CarForm",
  components: {
    InputText,
    CheckBox,
    InputNumber,
    Dropdown,
    Button,
    Chips,
  },
  setup: () => ({v$: useVuelidate()}),
  data() {
    return {
      form: this.initialValue,
      transmissionOptions: [
        {value: "SEQUENTIAL", text: "Sequential"},
        {value: "MANUAL", text: "Manual"},
      ],
      drivetrainOptions: [
        {value: "AWD", text: "AWD"},
        {value: "RWD", text: "RWD"},
        {value: "FWD", text: "FWD"},
      ],
      existingBrand: true,
      existingNation: true,
      existingAuthor: true,
      categoryValues: [],
      submitted: false,
    }
  },
  computed: {
    brands() {
      return this.$store.getters['cars/brands']
    },
    nations() {
      return this.$store.getters['cars/nations']
    },
    authors() {
      return this.$store.getters['authors/authors']
    }
  },
  mounted() {
    this.$store.dispatch('cars/getCarBrands')
    this.$store.dispatch('cars/getBrandNations')
    this.$store.dispatch('authors/getAll')
    this.categoryValues = this.form.Categories.map(v => v.Name)
  },
  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true;
      if (isFormValid) {
        this.$emit("submit", this.form)
        this.resetForm()
      }
    },
    addCategory(e) {
      this.form.Categories = e.value.map(v => {
        return {Name: v}
      })
    },
    removeCategory(e) {
      console.log(e.value)
      this.form.Categories = this.form.Categories.filter(v => v.Name !== e.value[0])
    },
    resetForm() {
      this.submitted = false
      this.form = this.initialValue
    },
  },
  validations() {
    return {
      form: {
        Torque: {required, minValueValue: minValue(0), integer},
        BHP: {required, minValueValue: minValue(0), integer},
        Weight: {required, minValueValue: minValue(0), integer},
        TopSpeed: {required, minValueValue: minValue(0), integer},
        DownloadLink: {required, url},
        Image: {required, url},
        ModelName: {required},
        Author: {
          Name: {required},
          Link: {required},
        },
        Brand: {
          Name: {required},
          Nation: {
            Name: {required},
            Code: {required},
          },
        },
        Year: {required, minValueValue: minValue(0), integer},
        Drivetrain: {required},
        Transmission: {required},
        Categories: [
          {
            Name: "",
          },
        ],
        Premium: {required},
      }
    }
  },
}
</script>

<style scoped>

</style>
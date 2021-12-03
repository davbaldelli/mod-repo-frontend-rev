<template>
  <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid p-formgrid p-grid">
    <div class="p-field p-col-12 p-sm-10">
      <label for="modelTextField">Model Name</label>
      <InputText id="modelTextField" type="text" v-model="form.modelName"
                 :class="{'p-invalid':v$.form.modelName.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.modelName.$invalid && submitted) || v$.form.modelName.$pending.$response"
             class="p-error">{{ v$.form.modelName.required.$message.replace('Value', 'Model Name') }}</small>
    </div>
    <div class="p-field-checkbox p-col-12 p-sm-2 p-pt-sm-5">
      <CheckBox id="premiumCheck" name="premiumCheck" v-model="form.premium" :binary="true"/>
      <label for="premiumCheck">Premium</label>
    </div>
    <div v-if="existingBrand" class="p-field p-col-12 p-sm-10">
      <label for="brandDropbox">Brand</label>
      <Dropdown filter id="brandDropbox" :options="brands" option-label="name" v-model="form.brand"
                :class="{'p-invalid':v$.form.brand.name.$invalid && submitted}"></Dropdown>
      <small v-if="(v$.form.brand.name.$invalid && submitted) || v$.form.brand.name.$pending.$response" class="p-error">{{ v$.form.brand.name.required.$message.replace('Value', 'Brand') }}</small>
    </div>
    <div v-if="!existingBrand" class="p-field p-col-12 p-sm-10">
      <label for="brandTextField">Brand</label>
      <InputText id="brandTextField" v-model="form.brand.name"
                 :class="{'p-invalid':v$.form.brand.name.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.brand.name.$invalid && submitted) || v$.form.brand.name.$pending.$response" class="p-error">{{ v$.form.brand.name.required.$message.replace('Value', 'Brand Name') }}</small>
    </div>
    <div class="p-field-checkbox p-sm-2 p-col-12 p-pt-sm-5">
      <CheckBox id="existingBrandCheck" v-model="existingBrand" :binary="true"></CheckBox>
      <label for="existingBrandCheck">Existing</label>
    </div>
    <div v-if="!existingBrand && existingNation" class="p-field p-col-12 p-sm-10">
      <label for="nationDropbox">Nation</label>
      <Dropdown filter id="nationDropbox" :options="nations" option-label="name" v-model="form.brand.nation"
                :class="{'p-invalid':v$.form.brand.nation.name.$invalid && submitted}"></Dropdown>
      <small v-if="(v$.form.brand.nation.name.$invalid && submitted) || v$.form.brand.nation.name.$pending.$response"
             class="p-error">{{ v$.form.brand.nation.name.required.$message.replace('Value', 'Nation') }}</small>
    </div>
    <div v-if="!existingBrand && !existingNation" class="p-field p-col-6 p-sm-5 p-px-2 p-py-0">
      <label for="nationNameTextField">Nation Name</label>
      <InputText id="nationNameTextField" v-model="form.brand.nation.name"
                 :class="{'p-invalid':v$.form.brand.nation.name.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.brand.nation.name.$invalid && submitted) || v$.form.brand.nation.name.$pending.$response"
             class="p-error">{{ v$.form.brand.nation.name.required.$message.replace('Value', 'Nation Name') }}</small>
    </div>
    <div v-if="!existingBrand && !existingNation" class="p-field p-col-6 p-sm-5 p-px-2 p-py-0">
      <label for="nationCodeTextField">Nation Code</label>
      <InputText id="nationCodeTextField" v-model="form.brand.nation.code"
                 :class="{'p-invalid':v$.form.brand.nation.code.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.brand.nation.code.$invalid && submitted) || v$.form.brand.nation.code.$pending.$response"
             class="p-error">{{ v$.form.brand.nation.code.required.$message.replace('Value', 'Nation Code') }}</small>
    </div>
    <div v-if="!existingBrand" class="p-field-checkbox p-col-12 p-sm-2 p-pt-sm-5">
      <CheckBox id="existingNationCheck" v-model="existingNation" :binary="true"></CheckBox>
      <label for="existingNationCheck">Existing</label>
    </div>
    <div class="p-field p-col-12">
      <label for="yearTextField">Year</label>
      <InputNumber v-model="form.year" :use-grouping="false" show-buttons id="yearTextField" :min="0"
                   :class="{'p-invalid':v$.form.year.$invalid && submitted}"></InputNumber>
      <small v-if="(v$.form.year.$invalid && submitted) || v$.form.year.$pending.$response"
             class="p-error">{{ v$.form.year.required.$message.replace('Value', 'Year') }}</small>
    </div>
    <div class="p-field p-col-6">
      <label for="versionInputText">Version</label>
      <InputText id="versionInputText" v-model="form.version" :class="{'p-invalid':v$.form.version.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.version.$invalid && submitted) || v$.form.version.$pending.$response"
             class="p-error">{{ v$.form.version.required.$message.replace('Value', 'Version') }}</small>
    </div>
    <div class="p-field p-col-6">
      <label for="ratingRate">Rating</label>
      <Rating id="ratingRate" v-model="form.rating" :cancel="false" :stars="10"/>
    </div>
    <div class="p-field p-col-12">
      <label for="powerTextField">Horsepower</label>
      <InputNumber v-model="form.bhp" show-buttons id="powerTextField" suffix="BHP" :min="0"
                   :class="{'p-invalid':v$.form.bhp.$invalid && submitted}"></InputNumber>
      <small v-if="(v$.form.bhp.$invalid && submitted) || v$.form.bhp.$pending.$response"
             class="p-error">{{ v$.form.bhp.required.$message.replace('Value', 'Car Power') }}</small>
    </div>
    <div class="p-field p-col-12">
      <label for="torqueTextField">Torque</label>
      <InputNumber v-model="form.torque" show-buttons id="torqueTextField" suffix="Nm" :min="0"
                   :class="{'p-invalid':v$.form.torque.$invalid && submitted}"></InputNumber>
      <small v-if="(v$.form.torque.$invalid && submitted) || v$.form.torque.$pending.$response"
             class="p-error">{{ v$.form.torque.required.$message.replace('Value', 'Torque') }}</small>
    </div>
    <div class="p-field p-col-12">
      <label for="weightTextField">Weight</label>
      <InputNumber v-model="form.weight" show-buttons id="weightTextField" suffix="Kg" :min="0"
                   :class="{'p-invalid':v$.form.weight.$invalid && submitted}"></InputNumber>
      <small v-if="(v$.form.weight.$invalid && submitted) || v$.form.weight.$pending.$response"
             class="p-error">{{ v$.form.weight.required.$message.replace('Value', 'Weight') }}</small>
    </div>
    <div class="p-field p-col-12">
      <label for="topSpeedTextField">Top Speed</label>
      <InputNumber v-model="form.topSpeed" show-buttons id="topSpeedTextField" suffix="Km/h" :min="0"
                   :class="{'p-invalid':v$.form.topSpeed.$invalid && submitted}"></InputNumber>
      <small v-if="(v$.form.topSpeed.$invalid && submitted) || v$.form.topSpeed.$pending.$response"
             class="p-error">{{ v$.form.topSpeed.required.$message.replace('Value', 'Top Speed') }}</small>
    </div>
    <div class="p-field p-col-6 p-pr-1">
      <label for="drivetrainDropdown">Drivetrain</label>
      <Dropdown id="drivetrainDropdown" :options="drivetrainOptions" optionLabel="text" optionValue="value"
                v-model="form.drivetrain" placeholder="Select Drivetrain"
                :class="{'p-invalid':v$.form.drivetrain.$invalid && submitted}"></Dropdown>
      <small v-if="(v$.form.drivetrain.$invalid && submitted) || v$.form.drivetrain.$pending.$response" class="p-error">{{ v$.form.drivetrain.required.$message.replace('Value', 'Drivetrain') }}</small>
    </div>
    <div class="p-field p-col-6 p-pl-1">
      <label for="transmissionDropdown">Transmission</label>
      <Dropdown id="transmissionDropdown" :options="transmissionOptions" optionLabel="text" optionValue="value"
                v-model="form.transmission" placeholder="Select Transmission Type"
                :class="{'p-invalid':v$.form.transmission.$invalid && submitted}"></Dropdown>
      <small v-if="(v$.form.transmission.$invalid && submitted) || v$.form.transmission.$pending.$response"
             class="p-error">{{ v$.form.transmission.required.$message.replace('Value', 'Transmission') }}</small>
    </div>
    <div class="p-field p-col-12">
      <label for="downloadLinkTextField">Download Link</label>
      <InputText id="downloadLinkTextField" type="url" v-model="form.downloadLink" :class="{'p-invalid':v$.form.downloadLink.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.downloadLink.$invalid && submitted) || v$.form.downloadLink.$pending.$response"
             class="p-error">{{ v$.form.downloadLink.required.$message.replace('Value', 'Download Link') }}
        {{ `, ${v$.form.downloadLink.url.$message}` }}</small>
    </div>
    <div class="p-field p-col-12">
      <label for="imageLinkTextField">Image Link</label>
      <InputText id="imageLinkTextField" type="url" v-model="form.image" :class="{'p-invalid':v$.form.image.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.image.$invalid && submitted) || v$.form.image.$pending.$response"
             class="p-error">{{ v$.form.image.required.$message.replace('Value', 'Download Link') }}
        {{ `, ${v$.form.image.url.$message}` }}</small>
    </div>
    <div v-if="existingAuthor" class="p-field p-col-12 p-sm-10">
      <label for="authorDropdown">Author</label>
      <Dropdown id="authorDropdown" :options="authors" filter optionLabel="name" v-model="form.author"
                placeholder="Select Author" :class="{'p-invalid':v$.form.author.name.$invalid && submitted}"></Dropdown>
      <small v-if="(v$.form.author.name.$invalid && submitted) || v$.form.author.$pending.$response"
             class="p-error">Author is required</small>
    </div>
    <div v-if="!existingAuthor" class="p-field p-col-6 p-sm-5 p-px-2 p-py-0">
      <label for="authorNameTextField">Author Name</label>
      <InputText id="authorNameTextField" v-model="form.author.name" :class="{'p-invalid':v$.form.author.name.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.author.name.$invalid && submitted) || v$.form.author.name.$pending.$response"
             class="p-error">{{ v$.form.author.name.required.$message.replace('Value', 'Author Name') }}</small>
    </div>
    <div v-if="!existingAuthor" class="p-field p-col-6 p-sm-5 p-px-2 p-py-0">
      <label for="authorLinkTextField">Author Link</label>
      <InputText id="authorLinkTextField" v-model="form.author.link" :class="{'p-invalid':v$.form.author.link.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.author.link.$invalid && submitted) || v$.form.author.link.$pending.$response"
             class="p-error">{{ v$.form.author.link.required.$message.replace('Value', 'Author Link') }}</small>
    </div>
    <div class="p-field-checkbox p-col-12 p-sm-2 p-pt-sm-5">
      <CheckBox id="existingAuthorCheck" v-model="existingAuthor" :binary="true"></CheckBox>
      <label for="existingAuthorCheck">Existing</label>
    </div>
    <div class="p-field p-col-12">
      <label :for="'categoriesChips'">Categories</label>
      <MultiSelect :id="'categoriesChips'" v-model="form.categories" :options="categories" optionLabel="name" placeholder="Select Categories" display="chip"/>
    </div>
    <div class="p-field p-col-12">
      <Button type="submit" label="Submit" class="p-mt-2"/>
    </div>
  </form>
  <ConfirmDialog/>
</template>

<script>
import ConfirmDialog from 'primevue/confirmdialog';
import InputText from "primevue/inputtext";
import CheckBox from 'primevue/checkbox';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Button from "primevue/button";
import useVuelidate from "@vuelidate/core";
import MultiSelect from "primevue/multiselect";
import {integer, minValue, required, url} from '@vuelidate/validators'
import Rating from "primevue/rating"

const emptyForm = {
  torque: 0,
  bhp: 0,
  weight: 0,
  topSpeed: 0,
  downloadLink: "",
  image: "",
  modelName: "",
  author: {
    name: "",
    link: "",
  },
  brand: {
    name: "",
    nation: {
      name: "",
      code: "",
    },
  },
  year: 0,
  drivetrain: "",
  transmission: "",
  categories: [],
  premium: false,
  rating: 0,
  version : "",
}

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
    MultiSelect,
    ConfirmDialog,
    Rating,
  },
  setup: () => ({v$: useVuelidate()}),
  data() {
    return {
      form: this.initialValue ? this.initialValue : emptyForm,
      transmissionOptions: [
        {value: "SEQUENTIAL", text: "Sequential"},
        {value: "MANUAL", text: "Manual"},
      ],
      drivetrainOptions: [
        {value: "AWD", text: "AWD"},
        {value: "RWD", text: "RWD"},
        {value: "FWD", text: "FWD"},
      ],
      categories : [
        {name : "Endurance"},
        {name : "Formula"},
        {name : "GT"},
        {name : "Prototype"},
        {name : "Rally"},
        {name : "Stock Car"},
        {name : "Street"},
        {name : "Tuned"},
        {name : "Touring"},
        {name : "Vintage"},
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
    this.categoryValues = this.form.categories.map(v => v.name)
  },
  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true;
      if (isFormValid) {
        this.$confirm.require({
          message: 'Are you sure you want to proceed?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.$emit("submit", this.form)
            this.resetForm()
          },
          reject: () => {
            //callback to execute when user rejects the action
          }
        })
      }
    },
    addCategory(e) {
      this.form.categories = e.value.map(v => {
        return {name: v}
      })
    },
    removeCategory(e) {
      console.log(e.value)
      this.form.categories = this.form.categories.filter(v => v.name !== e.value[0])
    },
    resetForm() {
      this.submitted = false
      this.form = this.initialValue
    },
  },
  validations() {
    return {
      form: {
        torque: {required, minValueValue: minValue(0), integer},
        bhp: {required, minValueValue: minValue(0), integer},
        weight: {required, minValueValue: minValue(0), integer},
        topSpeed: {required, minValueValue: minValue(0), integer},
        downloadLink: {required, url},
        image: {required, url},
        modelName: {required},
        author: {
          name: {required},
          link: {required},
        },
        brand: {
          name: {required},
          nation: {
            name: {required},
            code: {required},
          },
        },
        year: {required, minValueValue: minValue(0), integer},
        drivetrain: {required},
        transmission: {required},
        categories: [
          {
            name: "",
          },
        ],
        premium: {required},
        rating : {required, integer},
        version : {required},
      }
    }
  },
}
</script>

<style scoped>

</style>
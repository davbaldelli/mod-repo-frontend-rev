<template>
  <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid p-formgrid p-grid">
    <div class="p-field p-col-12 p-sm-10"><label for="nameTextField">Name</label>
      <InputText id="nameTextField" type="text" v-model="form.name"
                 :class="{'p-invalid':v$.form.name.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.name.$invalid && submitted) || v$.form.name.$pending.$response"
             class="p-error">{{ v$.form.name.required.$message.replace('Value', 'Name') }}</small></div>
    <div class="p-field-checkbox p-col-12 p-sm-2 p-pt-sm-5">
      <Checkbox id="premiumCheck" v-model="form.premium" :binary="true"></Checkbox>
      <label for="premiumCheck">Premium</label>
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
      <label for="tagsMultiselect">Tags</label>
      <MultiSelect id="tagsMultiselect" v-model="form.tags" :options="trackTags" option-label="text" option-value="value" display="chip" :filter="true" placeholder="Select Tags"></MultiSelect>
    </div>
    <div class="p-field p-col-12">
      <label for="yearTextField">Year</label>
      <InputNumber v-model="form.year" :use-grouping="false" show-buttons id="yearTextField" :min="0"
                   :class="{'p-invalid':v$.form.year.$invalid && submitted}"></InputNumber>
      <small v-if="(v$.form.year.$invalid && submitted) || v$.form.year.$pending.$response"
             class="p-error">{{ v$.form.year.required.$message.replace('Value', 'Year') }}</small>
    </div>
    <div v-if="existingNation" class="p-field p-col-6 p-px-2 p-py-0">
      <label for="nationDropdown">Nation</label>
      <Dropdown filter id="nationDropdown" :options="nations" option-label="name" v-model="form.nation"
                :class="{'p-invalid':v$.form.nation.name.$invalid && submitted}"></Dropdown>
      <small v-if="(v$.form.nation.name.$invalid && submitted) || v$.form.nation.name.$pending.$response"
             class="p-error">{{ v$.form.nation.name.required.$message.replace('Value', 'Nation') }}</small>
    </div>
    <div v-if="!existingNation" class="p-field p-col-6 p-sm-4 p-px-2 p-py-0">
      <label for="nationNameTextField">Nation Name</label>
      <InputText id="nationNameTextField" type="text" v-model="form.nation.name"
                 :class="{'p-invalid':v$.form.nation.name.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.nation.name.$invalid && submitted) || v$.form.nation.name.$pending.$response"
             class="p-error">{{ v$.form.nation.name.required.$message.replace('Value', 'Nation Name') }}</small>
    </div>
    <div v-if="!existingNation" class="p-field p-col-6 p-sm-2 p-px-2 p-py-0">
      <label for="nationCodeTextField">Nation Code</label>
      <InputText id="nationCodeTextField" v-model="form.nation.code"
                 :class="{'p-invalid':v$.form.nation.code.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.nation.code.$invalid && submitted) || v$.form.nation.code.$pending.$response"
             class="p-error">{{ v$.form.nation.code.required.$message.replace('Value', 'Nation Code') }}</small>
    </div>
    <div class="p-field p-col-6 p-sm-4 p-px-2 p-py-0">
      <label for="locationTextField">Location</label>
      <InputText id="locationTextField" type="text" v-model="form.location"
                 :class="{'p-invalid':v$.form.location.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.location.$invalid && submitted) || v$.form.location.$pending.$response"
             class="p-error">{{ v$.form.location.required.$message.replace('Value', 'Location') }}</small>
    </div>
    <div class="p-field-checkbox p-col-12 p-sm-2 p-pt-sm-5">
      <Checkbox id="existingNationCheck" v-model="existingNation" :binary="true"></Checkbox>
      <label for="existingNationCheck">Existing</label>
    </div>
    <div class="p-field p-col-12">
      <label for="downloadTextField">Download Link</label>
      <InputText id="downloadTextField" type="url" v-model="form.downloadLink"
                 :class="{'p-invalid':v$.form.downloadLink.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.downloadLink.$invalid && submitted) || v$.form.downloadLink.$pending.$response"
             class="p-error">{{ v$.form.downloadLink.required.$message.replace('Value', 'Download Link') }}{{ `, ${v$.form.downloadLink.url.$message}` }}</small>
    </div>
    <div class="p-field p-col-12">
      <label for="imageTextField">Image</label>
      <InputText id="imageTextField" type="url" v-model="form.image"
                 :class="{'p-invalid':v$.form.image.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.image.$invalid && submitted) || v$.form.image.$pending.$response"
             class="p-error">{{ v$.form.image.required.$message.replace('Value', 'Image') }}{{ `, ${v$.form.image.url.$message}` }}</small>
    </div>
    <div v-if="existingAuthor" class="p-field p-col-12 p-sm-10">
      <label for="authorDropdown">Author</label>
      <Dropdown id="authorDropdown" :options="authors" filter optionLabel="name" v-model="form.author"
                placeholder="Select Author" :class="{'p-invalid':v$.form.author.$invalid && submitted}"></Dropdown>
      <small v-if="(v$.form.author.$invalid && submitted) || v$.form.author.$pending.$response"
             class="p-error">Author required</small>
    </div>
    <div v-if="!existingAuthor" class="p-field p-col-6 p-sm-5 p-px-2 p-py-0">
      <label for="authorNameTextField">Author Name</label>
      <InputText id="authorNameTextField" type="text" v-model="form.author.name"
                 :class="{'p-invalid':v$.form.author.name.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.author.name.$invalid && submitted) || v$.form.author.name.$pending.$response"
             class="p-error">{{ v$.form.author.name.required.$message.replace('Value', 'Author Name') }}</small>
    </div>
    <div v-if="!existingAuthor" class="p-field p-col-6 p-sm-5 p-px-2 p-py-0">
      <label for="authorLinkTextField">Author Link</label>
      <InputText id="authorLinkTextField" type="text" v-model="form.author.link"
                 :class="{'p-invalid':v$.form.author.link.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.author.link.$invalid && submitted) || v$.form.author.link.$pending.$response"
             class="p-error">{{ v$.form.author.link.required.$message.replace('Value', 'Author Link') }}</small>
    </div>
    <div class="p-field-checkbox p-col-12 p-sm-2 p-pt-sm-5">
      <Checkbox id="existingAuthorCheck" v-model="existingAuthor" :binary="true"></Checkbox>
      <label for="existingAuthorCheck">Existing</label>
    </div>
    <div v-for="(layout, index) in form.layouts" v-bind:key="index" class="p-formgrid p-grid p-pl-2">
      <div class="p-field p-col-5">
        <label :for="`layoutNameTextField${index}`">Layout Name</label>
        <InputText :id="`layoutNameTextField${index}`" type="text" v-model="layout.name"></InputText>
      </div>
      <div class="p-field p-col-3">
        <label :for="`layoutLengthTextField${index}`">Layout Length</label>
        <InputNumber v-model="layout.lengthM" suffix="m" show-buttons :id="`layoutLengthTextField${index}`" :min="0"></InputNumber>
      </div>
      <div class="p-field p-col-3">
        <label :for="`layoutCategoryDropdown${index}`">Layout Category</label>
        <Dropdown :id="`layoutCategoryDropdown${index}`" :options="layoutTypeOptions" filter optionLabel="text" option-value="value" v-model="layout.category"
                  placeholder="Select Category"></Dropdown>
      </div>
      <div class="p-field p-col-1 p-pt-5">
        <Button @click="removeLayout(index)" icon="pi pi-minus" class="p-button-danger"></Button>
      </div>
    </div>
    <div class="p-field p-col-11"></div>
    <div class="p-field p-col-1 p-pl-3">
      <Button @click="addLayout" icon="pi pi-plus"></Button>
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
import Checkbox from "primevue/checkbox"
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import MultiSelect from "primevue/multiselect"
import Button from "primevue/button";
import useVuelidate from "@vuelidate/core";
import Rating from "primevue/rating";
import {helpers, integer, minValue, required, url} from "@vuelidate/validators";

const emptyTrack = {
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
    }

export default {
  name: "TrackForm",
  props: ["initialValue"],
  emits: ["submit"],
  components:{
    InputText,
    Checkbox,
    Dropdown,
    InputNumber,
    MultiSelect,
    Button,
    ConfirmDialog,
    Rating,
  },
  setup: () => ({v$: useVuelidate()}),
  data() {
    return {
      form : this.initialValue ? this.initialValue : emptyTrack,
      existingAuthor : true,
      existingNation : true,
      submitted : false,
      trackTags: [
        {text: "F1", value: "F1"},
        {text: "NASCAR", value: "NASCAR"},
        {text: "Historic", value: "Historic"},
        {text: "Rally", value: "Rally"},
        {text: "Drift", value: "Drift"},
        {text: "Open World", value: "Open World"},
        {text: "City Track", value: "City Track"},
        {text: "Touge", value: "Touge"},
        {text: "Endurance", value: "Endurance"},
        {text: "Street Circuit", value: "Street Track"},
        {text: "Fictional", value: "Fictional"},
        {text: "Karting", value: "Karting"},
      ],
      layoutTypeOptions: [
        {text: "Oval", value: "Oval"},
        {text: "Road Course", value: "Road Course"},
        {text: "A to B", value: "A to B"},
      ],
    }
  },
  computed:{
    nations(){
      return this.$store.getters['tracks/nations']
    },
    authors(){
      return this.$store.getters['authors/authors']
    },
  },
  mounted() {
    this.$store.dispatch('tracks/getAllNations')
    this.$store.dispatch('authors/getAll')
  },
  methods:{
    handleSubmit(isValid){
      this.submitted = true
      if(isValid){
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
      } else {
        console.log(this.v$)
      }
    },
    resetForm(){
      this.form = this.initialValue
      this.submitted = false
    },
    removeLayout(index){
      this.form.layouts.splice(index,1)
    },
    addLayout(){
      this.form.layouts.push({
        LengthM: 0,
        Category: "",
        Name: "",
      })
    }
  },
  validations(){
    return {
      form: {
        name: {required},
        premium: {required},
        year: {required, minValueValue: minValue(0), integer},
        nation: {
          name: {required},
          code: {required}
        },
        location: {required},
        downloadLink: {required, url},
        image: {required, url},
        layouts: {
          $each: helpers.forEach({
            lengthM: {required, minValueValue: minValue(0), integer},
            category: {required},
            name: {required},
          })
        },
        author: {
          name: {required},
          link: {required},
        },
        rating : {required, integer},
        version : {required},
      }
    }
  }
}
</script>

<style scoped>

</style>
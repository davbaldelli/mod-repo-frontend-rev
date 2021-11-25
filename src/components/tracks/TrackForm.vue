<template>
  <form class="p-fluid p-formgrid p-grid" @submit.prevent="handleSubmit(!v$.$invalid)">
    <div class="p-field p-col-12 p-sm-10"><label for="nameTextField">Name</label>
      <InputText id="nameTextField" v-model="form.Name" :class="{'p-invalid':v$.form.Name.$invalid && submitted}"
                 type="text"></InputText>
      <small v-if="(v$.form.Name.$invalid && submitted) || v$.form.Name.$pending.$response"
             class="p-error">{{ v$.form.Name.required.$message.replace('Value', 'Name') }}</small></div>
    <div class="p-field-checkbox p-col-12 p-sm-2 p-pt-sm-5">
      <Checkbox id="premiumCheck" v-model="form.Premium" :binary="true"></Checkbox>
      <label for="premiumCheck">Premium</label>
    </div>
    <div class="p-field p-col-12">
      <label for="tagsMultiselect">Tags</label>
      <MultiSelect id="tagsMultiselect" v-model="form.Tags" :filter="true" :options="trackTags"
                   display="chip" option-label="text" option-value="value" placeholder="Select Tags"></MultiSelect>
    </div>
    <div class="p-field p-col-12">
      <label for="yearTextField">Year</label>
      <InputNumber id="yearTextField" v-model="form.Year" :class="{'p-invalid':v$.form.Year.$invalid && submitted}" :min="0" :use-grouping="false"
                   show-buttons></InputNumber>
      <small v-if="(v$.form.Year.$invalid && submitted) || v$.form.Year.$pending.$response"
             class="p-error">{{ v$.form.Year.required.$message.replace('Value', 'Year') }}</small>
    </div>
    <div v-if="existingNation" class="p-field p-col-6 p-px-2 p-py-0">
      <label for="nationDropdown">Nation</label>
      <Dropdown id="nationDropdown" v-model="form.Nation" :class="{'p-invalid':v$.form.Nation.Name.$invalid && submitted}" :options="nations" filter
                option-label="Name"></Dropdown>
      <small v-if="(v$.form.Nation.Name.$invalid && submitted) || v$.form.Nation.Name.$pending.$response"
             class="p-error">{{ v$.form.Nation.Name.required.$message.replace('Value', 'Nation') }}</small>
    </div>
    <div v-if="!existingNation" class="p-field p-col-6 p-sm-4 p-px-2 p-py-0">
      <label for="nationNameTextField">Nation Name</label>
      <InputText id="nationNameTextField" v-model="form.Nation.Name" :class="{'p-invalid':v$.form.Nation.Name.$invalid && submitted}"
                 type="text"></InputText>
      <small v-if="(v$.form.Nation.Name.$invalid && submitted) || v$.form.Nation.Name.$pending.$response"
             class="p-error">{{ v$.form.Nation.Name.required.$message.replace('Value', 'Nation Name') }}</small>
    </div>
    <div v-if="!existingNation" class="p-field p-col-6 p-sm-2 p-px-2 p-py-0">
      <label for="nationCodeTextField">Nation Code</label>
      <InputText id="nationCodeTextField" v-model="form.Nation.Code"
                 :class="{'p-invalid':v$.form.Nation.Code.$invalid && submitted}"></InputText>
      <small v-if="(v$.form.Nation.Code.$invalid && submitted) || v$.form.Nation.Code.$pending.$response"
             class="p-error">{{ v$.form.Nation.Code.required.$message.replace('Value', 'Nation Code') }}</small>
    </div>
    <div class="p-field p-col-6 p-sm-4 p-px-2 p-py-0">
      <label for="locationTextField">Location</label>
      <InputText id="locationTextField" v-model="form.Location" :class="{'p-invalid':v$.form.Location.$invalid && submitted}"
                 type="text"></InputText>
      <small v-if="(v$.form.Location.$invalid && submitted) || v$.form.Location.$pending.$response"
             class="p-error">{{ v$.form.Location.required.$message.replace('Value', 'Location') }}</small>
    </div>
    <div class="p-field-checkbox p-col-12 p-sm-2 p-pt-sm-5">
      <Checkbox id="existingNationCheck" v-model="existingNation" :binary="true"></Checkbox>
      <label for="existingNationCheck">Existing</label>
    </div>
    <div class="p-field p-col-12">
      <label for="downloadTextField">Download Link</label>
      <InputText id="downloadTextField" v-model="form.DownloadLink" :class="{'p-invalid':v$.form.DownloadLink.$invalid && submitted}"
                 type="url"></InputText>
      <small v-if="(v$.form.DownloadLink.$invalid && submitted) || v$.form.DownloadLink.$pending.$response"
             class="p-error">{{
          v$.form.DownloadLink.required.$message.replace('Value', 'Download Link')
        }}{{ `, ${v$.form.DownloadLink.url.$message}` }}</small>
    </div>
    <div class="p-field p-col-12">
      <label for="imageTextField">Image</label>
      <InputText id="imageTextField" v-model="form.Image" :class="{'p-invalid':v$.form.Image.$invalid && submitted}"
                 type="url"></InputText>
      <small v-if="(v$.form.Image.$invalid && submitted) || v$.form.Image.$pending.$response"
             class="p-error">{{
          v$.form.Image.required.$message.replace('Value', 'Image')
        }}{{ `, ${v$.form.Image.url.$message}` }}</small>
    </div>
    <div v-if="existingAuthor" class="p-field p-col-12 p-sm-10">
      <label for="authorDropdown">Author</label>
      <Dropdown id="authorDropdown" v-model="form.Author" :class="{'p-invalid':v$.form.Author.Name.$invalid && submitted}" :options="authors" filter
                optionLabel="Name" placeholder="Select Author"></Dropdown>
      <small v-if="(v$.form.Author.Name.$invalid && submitted) || v$.form.Author.Name.$pending.$response"
             class="p-error">{{ v$.form.Author.Name.required.$message.replace('Value', 'Author') }}</small>
    </div>
    <div v-if="!existingAuthor" class="p-field p-col-6 p-sm-5 p-px-2 p-py-0">
      <label for="authorNameTextField">Author Name</label>
      <InputText id="authorNameTextField" v-model="form.Author.Name" :class="{'p-invalid':v$.form.Author.Name.$invalid && submitted}"
                 type="text"></InputText>
      <small v-if="(v$.form.Author.Name.$invalid && submitted) || v$.form.Author.Name.$pending.$response"
             class="p-error">{{ v$.form.Author.Name.required.$message.replace('Value', 'Author Name') }}</small>
    </div>
    <div v-if="!existingAuthor" class="p-field p-col-6 p-sm-5 p-px-2 p-py-0">
      <label for="authorLinkTextField">Author Link</label>
      <InputText id="authorLinkTextField" v-model="form.Author.Link" :class="{'p-invalid':v$.form.Author.Link.$invalid && submitted}"
                 type="text"></InputText>
      <small v-if="(v$.form.Author.Link.$invalid && submitted) || v$.form.Author.Link.$pending.$response"
             class="p-error">{{ v$.form.Author.Link.required.$message.replace('Value', 'Author Link') }}</small>
    </div>
    <div class="p-field-checkbox p-col-12 p-sm-2 p-pt-sm-5">
      <Checkbox id="existingAuthorCheck" v-model="existingAuthor" :binary="true"></Checkbox>
      <label for="existingAuthorCheck">Existing</label>
    </div>
    <div v-for="(layout, index) in form.Layouts" v-bind:key="index" class="p-formgrid p-grid p-pl-2">
      <div class="p-field p-col-5">
        <label :for="`layoutNameTextField${index}`">Layout Name</label>
        <InputText :id="`layoutNameTextField${index}`" v-model="layout.Name" type="text"></InputText>
      </div>
      <div class="p-field p-col-3">
        <label :for="`layoutLengthTextField${index}`">Layout Length</label>
        <InputNumber :id="`layoutLengthTextField${index}`" v-model="layout.LengthM" :min="0" show-buttons
                     suffix="m"></InputNumber>
      </div>
      <div class="p-field p-col-3">
        <label :for="`layoutCategoryDropdown${index}`">Layout Category</label>
        <Dropdown :id="`layoutCategoryDropdown${index}`" v-model="layout.Category" :options="layoutTypeOptions" filter
                  option-value="value" optionLabel="text"
                  placeholder="Select Category"></Dropdown>
      </div>
      <div class="p-field p-col-1 p-pt-5">
        <Button class="p-button-danger" icon="pi pi-minus" @click="removeLayout(index)"></Button>
      </div>
    </div>
    <div class="p-field p-col-11"></div>
    <div class="p-field p-col-1 p-pl-3">
      <Button icon="pi pi-plus" @click="addLayout"></Button>
    </div>
    <div class="p-field p-col-12">
      <Button class="p-mt-2" label="Submit" type="submit"/>
    </div>
  </form>
</template>

<script>
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox"
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import MultiSelect from "primevue/multiselect"
import Button from "primevue/button";
import useVuelidate from "@vuelidate/core";
import {helpers, integer, minValue, required, url} from "@vuelidate/validators";

export default {
  name: "TrackForm",
  props: ["initialValue"],
  emits: ["submit"],
  components: {
    InputText,
    Checkbox,
    Dropdown,
    InputNumber,
    MultiSelect,
    Button,
  },
  setup: () => ({v$: useVuelidate()}),
  data() {
    return {
      form: this.initialValue,
      existingAuthor: true,
      existingNation: true,
      submitted: false,
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
  computed: {
    nations() {
      return this.$store.getters['tracks/nations']
    },
    authors() {
      return this.$store.getters['authors/authors']
    },
  },
  mounted() {
    this.$store.dispatch('tracks/getAllNations')
    this.$store.dispatch('authors/getAll')
  },
  methods: {
    handleSubmit(isValid) {
      this.submitted = true
      if (isValid) {
        this.$emit('submit', this.form)
        this.resetForm()
      }
    },
    resetForm() {
      this.form = this.initialValue
      this.submitted = false
    },
    removeLayout(index) {
      this.form.Layouts.splice(index, 1)
    },
    addLayout() {
      this.form.Layouts.push({
        LengthM: 0,
        Category: "",
        Name: "",
      })
    }
  },
  validations() {
    return {
      form: {
        Name: {required},
        Premium: {required},
        Year: {required, minValueValue: minValue(0), integer},
        Nation: {
          Name: {required},
          Code: {required}
        },
        Location: {required},
        DownloadLink: {required, url},
        Image: {required, url},
        Layouts: {
          $each: helpers.forEach({
            LengthM: {required, minValueValue: minValue(0), integer},
            Category: {required},
            Name: {required},
          })
        },
        Author: {
          Name: {required},
          Link: {required},
        },
      }
    }
  }
}
</script>

<style scoped>

</style>
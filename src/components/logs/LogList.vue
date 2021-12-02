<template>
  <div class="p-grid">
    <div class="p-col-12 text-center p-mt-4">
      <h1 class="display-4">Repository Logs</h1>
      <p class="lead"><em>Stay updated on what's happening inside the repository</em></p>
    </div>
    <div class="p-col-12 p-lg-3"></div>
    <div class="p-col-12 p-lg-6" style="height: calc(75vh)">
      <DataTable :value="logs" :scrollable="true" scrollHeight="flex" responsive-layout="scroll">
        <Column header="Type">
          <template #body="slotProps">
            <FontAwesomeIcon class="p-mr-2" :icon="slotProps.data.name ? 'road' : 'car'"></FontAwesomeIcon>
            <FontAwesomeIcon v-if="slotProps.data.premium" icon="dollar-sign"></FontAwesomeIcon>
          </template>
        </Column>
        <Column header="Mod">
          <template #body="slotProps">
            <router-link :to="slotProps.data.name ? `/track/${slotProps.data.id}` : `/car/${slotProps.data.id}`">{{ slotProps.data.name ? slotProps.data.name : `${slotProps.data.brand} ${slotProps.data.model}`}}</router-link>
          </template>
        </Column>
        <Column header="Action">
          <template #body="slotProps">
            <Tag :severity="slotProps.data.action==='Insert' ? 'success' : 'primary'">{{slotProps.data.action}}</Tag>
          </template>
        </Column>
        <Column header="Date">
          <template #body="slotProps">
            {{getDate(slotProps.data.happenedAt)}}
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="p-col-12 p-lg-3"></div>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import moment from "moment-timezone";
import Tag from 'primevue/tag'

const sortByDate = (a, b) => {
    let timeA = moment(a.happenedAt)
    let timeB = moment(b.happenedAt)
    return timeA.isBefore(timeB) ? 1 : -1
}

export default {
  name: "LogList",
  components:{
    DataTable,
    Column,
    FontAwesomeIcon,
    Tag,
  },
  computed:{
    logs(){
      return this.$store.getters['logs/carLogs'].concat(this.$store.getters['logs/trackLogs']).sort(sortByDate)
    },
    loggedIn() {
      return this.$store.getters['authentication/loggedIn']
    },
  },
  watch :{
    loggedIn() {
      if (this.loggedIn) {
        this.initiate()
      }
    }
  },
  mounted() {
    this.initiate()
  },
  methods:{
    getDate(momentString){
      return moment(momentString).format('DD-MM-YYYY')
    },
    initiate(){
      this.$store.dispatch('logs/getCarLogs')
      this.$store.dispatch('logs/getTrackLogs')
    }
  }
}
</script>

<style scoped>

</style>
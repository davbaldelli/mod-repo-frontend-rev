<template>
  <div class="p-grid">
    <div class="p-col-12 p-lg-3"></div>
    <div class="p-col-12 p-lg-6">
      <DataTable :value="logs" responsive-layout="scroll">
        <template #header>
          <div class="table-header">
            Logs
          </div>
        </template>
        <Column header="Type">
          <template #body="slotProps">
            <FontAwesomeIcon :icon="slotProps.data.name ? 'road' : 'car'"></FontAwesomeIcon>
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
            {{getDate(slotProps.data.happened_at)}}
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
    let timeA = moment(a.happened_at)
    let timeB = moment(b.happened_at)
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
  },
  mounted() {
    this.$store.dispatch('logs/getCarLogs')
    this.$store.dispatch('logs/getTrackLogs')
  },
  methods:{
    getDate(momentString){
      return moment(momentString).format('DD-MM-YYYY')
    },
  }
}
</script>

<style scoped>

</style>
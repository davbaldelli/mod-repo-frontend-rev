<template>
  <div class="p-grid">
    <div class="p-md-0 p-lg-3"></div>
    <div class="p-md-12 p-lg-6 text-center">
      <div class="p-col-12">
        <h1 class="display-3 p-mt-4">Assetto Corsa Mod Repository</h1>
        <h2 class="display-6 p-mt-2"><em>By Davide Baldelli</em></h2>
        <Divider/>
        <p class="lead"><strong>Benvenuto!</strong></p>
        <p class="lead">
          Questo sito è una raccolta di mod di qualità, un tentativo di riunire nello stesso punto le migliori macchine e
          piste sparse sul web.<br/>
          Le mod qui presenti sono rimaste inalterate, e, ove possibile, sono presenti i riferimenti ai rispettivi autori.<br/>
        </p>
        <p class="lead">
          Se ti piace il nostro lavoro e vorresti premiarci ti invito a fare una piccola donazione
          <a href="https://paypal.me/teamItaliaracing?locale.x=it_IT" target="_blank" rel="noopener">qui</a>
        </p>
        <p class="lead">
          Se invece siete in ricerca di una comunità dove poter girare in compagnia vi invitiamo sul nostro gruppo <a
            href="https://discord.gg/5HTA8xZgTA"
            target="_blank" rel="noopener">discord</a>
        </p>
      </div>
      <div class="p-col-12">
        <Button type="button" class="p-button-lg p-button-outlined p-mr-2 p-px-4" @click="this.$router.push('cars')">
          <FontAwesomeIcon icon="car"></FontAwesomeIcon>
          <span class="p-ml-2 p-text-bold">Cars</span>
        </Button>
        <Button type="button" class="p-button-lg p-button-outlined" @click="this.$router.push('tracks')">
          <FontAwesomeIcon icon="road"></FontAwesomeIcon>
          <span class="p-ml-2 p-text-bold">Tracks</span>
        </Button>
      </div>

    </div>

    <div class="p-md-0 p-lg-3"></div>
  </div>
</template>

<script>
import Divider from 'primevue/divider';

import Button from "primevue/button";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

export default {
  name: 'HelloWorld',
  components: {
    Divider,
    FontAwesomeIcon,
    Button,
  }
}
</script>
<style scoped>
</style>

<template>
  <div class="p-grid">
    <div class="p-md-0 p-lg-3"></div>
    <div class="p-md-12 p-lg-6 text-center">
      <h1 class="display-2">AC Mod Repository</h1>
      <h3 class="display-6 p-mt-2"><em>By Davide Baldelli</em></h3>
      <Divider/>
      <h4 class="lead"><strong>Benvenuto!</strong></h4>
      <p class="lead">
        Questo sito è una raccolta di mod di qualità, un tentativo di riunire nello stesso punto le migliori macchine e
        piste sparse sul web.<br/>
        Le mod qui presenti sono rimaste inalterate, e, ove possibile, sono presenti i riferimenti ai rispettivi autori.<br/>
      </p>
      <p class="mb-2 lead">
        Se ti piace il nostro lavoro e vorresti premiarci ti invito a fare una piccola donazione
        <a href="https://paypal.me/teamItaliaracing?locale.x=it_IT" target="_blank">qui</a>
      </p>
      <p class="lead">
        Se invece siete in ricerca di una comunità dove poter girare in compagnia vi invitiamo sul nostro gruppo <a
          href="https://discord.gg/5HTA8xZgTA"
          target="_blank">discord</a>
      </p>
    </div>
    <div class="p-md-0 p-lg-3"></div>
  </div>
</template>

<script>
import Divider from 'primevue/divider';

export default {
  name: 'HelloWorld',
  components: {
    Divider,
  }
}
</script>
<style scoped>
</style>

<template>
  <nav>
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button"
        role="tab" aria-controls="nav-home" aria-selected="true">Ver Factura</button>
      <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button"
        role="tab" aria-controls="nav-profile" aria-selected="false">Crear Factura</button>
      <!-- <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button"
        role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button> -->
    </div>
  </nav>
  <div class="tab-content" id="nav-tabContent">
    <div class="tab-pane fade show active pb-3" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
      <Facturas class="mt-3" />
    </div>
    <div class="tab-pane fade pb-3" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
      <IndexDesktop />
    </div>
    <!-- <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div> -->
  </div>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <IndexDesktop /> -->
  <!-- <Facturas /> -->
</template>

<script>
import IndexDesktop from './components/IndexDesktop.vue'
import Facturas from './components/Facturas.vue'

export default {
  name: 'App',
  data() {
    return {
      message: 'Hello ',
    }
  },
  components: {
    Facturas,
    IndexDesktop
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div>
    <nav>
      <div class="nav nav-tabs navibord me-2" id="nav-tab" role="tablist">
        <button class="nav-link active letraBlanca" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button"
          role="tab" aria-controls="nav-home" aria-selected="true">Ver Factura</button>
        <button class="nav-link letraBlanca" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button"
          role="tab" aria-controls="nav-profile" aria-selected="false">Crear Factura</button>
          
        
        <!-- <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button"
        role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button> -->
      </div>
    </nav>
    <div class="tab-content fullScreen azul" id="nav-tabContent">
      <div class="tab-pane fade show active pb-3" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
        <Facturas :domain="domain" />
      </div>
      <div class="tab-pane fade " id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
        <IndexDesktop :domain="domain" />

      </div>
      <div class="tab-pane fade pb-3" id="nav-cliente" role="tabpanel" aria-labelledby="nav-cliente-tab">
      <Cliente />
    </div>
    </div>
  </div>
</template>

<script>
import IndexDesktop from './components/IndexDesktop.vue'
import Facturas from './components/Facturas.vue'
import Cliente from './components/Clientes.vue'

export default {
  name: 'App',
  data() {
    return {
      // domain: 'http://127.0.0.1:8000/',
      domain: 'https://infinite-basin-30570.herokuapp.com/',
    }
  },
  components: {
    Cliente,
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

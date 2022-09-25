<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <IndexDesktop />
  <Postgres />
  <span> {{ message }} </span>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import IndexDesktop from './components/IndexDesktop.vue'
import Postgres from './components/pg_js/app.js'

export default {
  name: 'App',
  data(){
    return {
      message: 'Hello '
    }
  },
  components: {
    // HelloWorld,
    IndexDesktop,
    Postgres
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

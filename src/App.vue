<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <IndexDesktop />
</template>

<script>
import IndexDesktop from './components/IndexDesktop.vue'

export default {
  name: 'App',
  data(){
    return {
      message: 'Hello '
    }
  },
  components: {
    IndexDesktop,
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

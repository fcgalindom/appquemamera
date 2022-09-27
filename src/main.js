import { createApp } from 'vue'
import App from './App.vue'
import './assets/colores.css';
import './assets/bootstrap.min.css';
import './assets/bootstrap.min.js';
import $ from 'jquery'
import Swal from 'sweetalert2'
// import '@/database/conection.js'




window.Swal = Swal
window.axios = require('axios');
window.$ = window.jQuery = $

createApp(App).mount('#app')
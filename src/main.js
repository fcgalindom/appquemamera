import { createApp } from 'vue'
import App from './App.vue'
import './assets/colores.css';
import './assets/bootstrap.min.css';

window.axios = require('axios');

createApp(App).mount('#app')
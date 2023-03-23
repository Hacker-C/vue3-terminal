import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './assets/index.css'

createApp(App).use(createPinia()).mount('#app')

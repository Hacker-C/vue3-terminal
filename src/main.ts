import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './styles/index.css'

createApp(App).use(createPinia()).mount('#app')

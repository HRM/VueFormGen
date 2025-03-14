import { createApp, type Component } from 'vue'
import { createPinia } from 'pinia'
import "@/assets/main.scss"

import App from './App.vue'
import router from './router'
import { createFormGenConfig } from 'vue-form-gen'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(
  createFormGenConfig({initializeObjects: false}),
)

app.mount('#app')
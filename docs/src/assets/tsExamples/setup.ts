import 'vue-form-gen/style.css'
import './assets/main.css'
import { createApp } from 'vue'
import { createFormGenConfig } from 'vue-form-gen'
import App from '@/App.vue'

const app = createApp(App)
app.use(createFormGenConfig())

app.mount('#app')

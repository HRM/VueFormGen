import 'vue-form-gen/style.css'
import './assets/main.scss'
import '@fontsource-variable/open-sans';
import '@fontsource-variable/fira-code';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createFormGenConfig } from 'vue-form-gen'

const app = createApp(App)

app.use(router)
app.use(createFormGenConfig())

app.mount('#app')

import './assets/main.css'
import 'vue-form-gen/style.css'
import { createApp } from 'vue'
import {
  createFormGenConfig,
  type FormFieldTranslator,
  type ValidationErrorTranslator,
} from 'vue-form-gen'
import App from '@/App.vue'

const fieldTranslator: FormFieldTranslator = (formPlan) => {
  // ... here comes your field translation logic
}

const errorTranslator: ValidationErrorTranslator = (error) => {
  // ... here comes your error translation logic
}

const app = createApp(App)
app.use(
  createFormGenConfig({
    fieldTranslator,
    errorTranslator,
  }),
)

app.mount('#app')

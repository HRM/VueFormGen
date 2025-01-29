import { createApp, type Component } from 'vue'
import { createPinia } from 'pinia'
import "@/assets/main.scss"

import App from './App.vue'
import router from './router'
import { componentCollection, FormGenComponents, type FormGenComponent, type FormGenComponentProps } from '@vue-form-gen/form-generator'
import FormObject from './components/FormComponents/FormObject.vue'
import FromField from './components/FormComponents/FormField.vue'
import FormEnum from './components/FormComponents/FormEnum.vue'
import FormBoolean from './components/FormComponents/FormBoolean.vue'
import FormString from './components/FormComponents/FormString.vue'
import FormNumber from './components/FormComponents/FormNumber.vue'
import FormArray from './components/FormComponents/FormArray.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(
  FormGenComponents,
  componentCollection([
    { selector: ['object'], component: FormObject },
    { selector: ['field'], component: FromField },
    { selector: ['enum'], component: FormEnum },
    { selector: ['boolean'], component: FormBoolean },
    { selector: ['string'], component: FormString },
    { selector: ['number'], component: FormNumber },
    { selector: ['array'], component: FormArray },
  ]),
)

app.mount('#app')

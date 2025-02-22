import './assets/main.css'
import 'vue-form-gen/style.css'
import { createApp } from 'vue'
import { componentCollection, createFormGenConfig } from 'vue-form-gen'
import App from '@/App.vue'
import FormString from '@/components/FormString.vue'
/**
 * import the rest of your components
 */

const components = componentCollection([
    { selector: ["object"], component: FormObject },
    { selector: ["field"], component: FormField },
    { selector: ["enum"], component: FormEnum },
    { selector: ["boolean"], component: FormBoolean },
    { selector: ["string"], component: FormString },
    { selector: ["number"], component: FormNumber },
    { selector: ["array"], component: FormArray },
])

const app = createApp(App)
app.use(createFormGenConfig({components}))

app.mount('#app')

import { componentCollection, defaultComponentCollection } from 'vue-form-gen'
import FormString from '@/components/FormString.vue'

const components = componentCollection([{ selector: ['string'], component: FormString }]).concat(
  defaultComponentCollection,
)

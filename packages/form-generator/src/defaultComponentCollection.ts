import FormArray from "./DefaultFormComponents/FormArray.vue";
import FormObject from "./DefaultFormComponents/FormObject.vue";
import FormNumber from "./DefaultFormComponents/FormNumber.vue";
import FormField from "./DefaultFormComponents/FormField.vue";
import FormEnum from "./DefaultFormComponents/FormEnum.vue";
import FormBoolean from "./DefaultFormComponents/FormBoolean.vue";
import FormString from "./DefaultFormComponents/FormString.vue";
import { componentCollection } from "./util/componentCollection";
import './defaultComponentCollectionStyles.scss'

const defaultComponentCollection = componentCollection([
  { selector: ["object"], component: FormObject },
  { selector: ["field"], component: FormField },
  { selector: ["enum"], component: FormEnum },
  { selector: ["boolean"], component: FormBoolean },
  { selector: ["string"], component: FormString },
  { selector: ["number"], component: FormNumber },
  { selector: ["array"], component: FormArray },
]);

export default defaultComponentCollection;

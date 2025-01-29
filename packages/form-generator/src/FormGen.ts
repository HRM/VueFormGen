import { defineComponent,h, provide, reactive, toRaw, watch, type PropType } from "vue";
import type { FormGenChildContext, FormPlan, ValidationError } from "./types";
import FormGenChild from "./FormGenChild";
import { setAtPath } from "./util/pathUtil";
import { deepAssign } from "./util/valueUtil";

const component = defineComponent({
  props: {
    errors: Object as PropType<ValidationError>,
    formPlan: { type: Object as PropType<FormPlan> ,required:true},
    modelValue: { type: Object, required: true },
  },
  emit: {
    "update:modelValue": (value: object) => {
      return typeof value == "object";
    },
  },
  setup(props, ctx) {
    const formValue = reactive(structuredClone(toRaw(props.modelValue)))

    watch(formValue, (value)=>{
      ctx.emit("update:modelValue", structuredClone(toRaw(value)));
    })

    watch(()=>props.modelValue,(value)=>{
      deepAssign(formValue, value);
    },{deep:true});

    provide<FormGenChildContext>("formGenChildContext", {
      errors: props.errors ?? {},
      value: formValue,
      setValue: (val,path) => setAtPath(formValue,path,val),
    });

    if(props.formPlan.section!=='object'){
      throw Error("The root of form plan should be an object")
    }

    return () => h(FormGenChild, { formPlan: props.formPlan });
  },
});

export default component;

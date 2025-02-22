import { computed, createVNode, defineComponent, inject, provide, reactive, watch, type PropType } from "vue";
import type { FormGenChildContext, FormFieldTranslator, FormValidationErrors, ValidationErrorTranslator, FormGenConfig } from "./types";
import FormGenChild from "./FormGenChild";
import { setAtPathByFormPlan } from "./util/pathUtil";
import { deepAssign, deepClone } from "./util/valueUtil";
import { jsonSchemaToFormPlan, translateFormPlan } from "./util/jsonSchemaToFormPlan";
import { validateFormValue } from "./util/validateFormValue";
import { formGenConfigSymbol } from "./util/symbols";

const component = defineComponent({
  props: {
    schema: { type: [Object,String], required: true },
    modelValue: Object,
    errorTranslator: Function as PropType<ValidationErrorTranslator>,
    fieldTranslator: Function as PropType<FormFieldTranslator>
  },
  emit: {
    "update:modelValue": (value: object) => {
      return typeof value == "object";
    },
  },
  setup(props, ctx) {
    const formGenConfig =
      inject<FormGenConfig>(formGenConfigSymbol);
      if(!formGenConfig){
        throw Error("Missing form gen configuration.")
      }
    const schemaObject = computed(() => {
      if (typeof props.schema === "string") {
        try{
          return JSON.parse(props.schema);
        }catch(e){
          return {};
        }
      } else {
        return props.schema;
      }
    });
    const formValue = reactive(deepClone(props.modelValue ?? {}));
    const errors = reactive<FormValidationErrors>({});
    const plan = computed(() => {
      let plan = jsonSchemaToFormPlan(schemaObject.value)
      if((props.fieldTranslator||formGenConfig.fieldTranslator)&&plan){
        plan = translateFormPlan(plan, (props.fieldTranslator??formGenConfig.fieldTranslator)!)
      }
      return plan;
    });

    function validate(): boolean {
      const res = validateFormValue(formValue, schemaObject.value, props.errorTranslator??formGenConfig?.errorTranslator);
      deepAssign(errors, res.errors);
      return res.valid;
    }
    
    function setValue(val: any, path: string[]) {
      if(plan.value){
        setAtPathByFormPlan(formValue, plan.value, path, val);
      }
        delete errors[path.join(".")];
    }

    ctx.expose({
      validate,
    });

    watch(formValue, (value) => {
      ctx.emit("update:modelValue", deepClone(value));
    });

    watch(
      () => props.modelValue,
      (value) => {
        deepAssign(formValue, value??{});
      },
      { deep: true }
    );

    provide<FormGenChildContext>("formGenChildContext", {
      errors: errors,
      value: formValue,
      setValue
    });
    return () => plan?.value?.section === "object"?createVNode(FormGenChild, { formPlan: plan.value }):null;
  },
});

export default component;

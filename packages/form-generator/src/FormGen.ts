import { computed, createVNode, defineComponent, inject, provide, reactive, watch } from 'vue'
import type { FormGenChildContext, FormValidationErrors, FormGenConfig } from './types'
import FormGenChild from './FormGenChild'
import { withValAtPath } from './util/pathUtil'
import { correctBaseShape, deepAssign, deepClone } from './util/valueUtil'
import { jsonSchemaToFormPlan } from './util/jsonSchemaToFormPlan'
import { validateFormValue } from './util/validateFormValue'
import { formGenConfigSymbol, formGenContextSymbol } from './util/symbols'
import { useFormGenConfig } from './util/use'

const component = defineComponent({
  expose: undefined as unknown as ['validate'],
  methods: undefined as unknown as { validate: () => boolean },
  props: {
    schema: { type: [Object, String], required: true },
    modelValue: Object,
  },
  emit: {
    'update:modelValue': (value: object) => {
      return typeof value == 'object'
    },
  },
  setup(props, ctx) {
    const formGenConfig = useFormGenConfig();

    const schemaObject = computed(() => {
      if (typeof props.schema === 'string') {
        try {
          return JSON.parse(props.schema)
        } catch (e) {
          return {}
        }
      } else {
        return props.schema
      }
    })
    const plan = computed(() => jsonSchemaToFormPlan(schemaObject.value))
    const formValue = reactive(
      plan.value ? correctBaseShape(props.modelValue ?? {}, plan.value, formGenConfig) : {},
    )
    const errors = reactive<FormValidationErrors>({})

    function validate(): boolean {
      const res = validateFormValue(formValue, schemaObject.value, formGenConfig.errorTranslator)
      deepAssign(errors, res.errors)
      return res.valid
    }

    function setValue(val: any, path: string[]) {
      if (plan.value) {
        deepAssign(formValue, correctBaseShape(withValAtPath(formValue, path, val), plan.value, formGenConfig))
      }
      for (const key in errors) {
        if (key.startsWith(path.join('.'))) {
          delete errors[key]
        }
      }
    }

    ctx.expose({
      validate,
    })

    watch(formValue, (value) => {
      ctx.emit('update:modelValue', deepClone(value))
    })

    watch(
      () => props.modelValue,
      (value) => {
        if (plan.value) {
          deepAssign(formValue, correctBaseShape(value ?? {}, plan.value, formGenConfig))
        } else {
          deepAssign(formValue, {})
        }
      },
      { deep: true },
    )

    watch(
      plan,
      (value) => {
        if (value) {
          deepAssign(formValue, correctBaseShape(props.modelValue ?? {}, value, formGenConfig))
        }
      },
      { deep: true },
    )

    provide<FormGenChildContext>(formGenContextSymbol, {
      errors: errors,
      value: formValue,
      setValue,
    })

    return () =>
      plan?.value?.section === 'object' ? createVNode(FormGenChild, { formPlan: plan.value }) : null
  },
})

export default component

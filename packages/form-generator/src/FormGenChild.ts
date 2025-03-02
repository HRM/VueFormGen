import { computed, createVNode, defineComponent, inject, watchEffect, type PropType } from 'vue'
import type { FormGenChildContext, FormGenComponent, FormGenConfig, FormPlan } from './types'
import { firstSelectorMatching } from './util/selectionUtil'
import { getAtPath } from './util/pathUtil'
import { formGenConfigSymbol, formGenContextSymbol } from './util/symbols'
import { useFormGenConfig } from './util/use'
import { cleanObject } from './util/valueUtil'

export default defineComponent({
  props: {
    formPlan: { type: Object as PropType<FormPlan>, required: true },
  },
  setup(props) {
    const { value, errors, setValue } = inject<FormGenChildContext>(formGenContextSymbol)!

    const formGenConfig = useFormGenConfig();

    const SelectedComponent = computed(
      () =>
        formGenConfig.components[
          firstSelectorMatching(
            props.formPlan,
            formGenConfig.components.map((c) => c.selector),
          )
        ]?.component as FormGenComponent,
    )

    const plan = computed(() => {
      if (props.formPlan.section === 'field' && formGenConfig.fieldTranslator) {
        const translation = formGenConfig.fieldTranslator(props.formPlan)
        cleanObject(translation);
        return { ...props.formPlan, props: { ...props.formPlan.props, ...translation } }
      }
      return props.formPlan
    })

    const valueSetter = computed(() => (val: any) => {
      setValue(val, props.formPlan.path)
    })

    return () =>
      SelectedComponent.value
        ? createVNode(SelectedComponent.value, {
            modelValue: getAtPath(value, props.formPlan.path) ?? null,
            formPlan: plan.value,
            errors: errors[props.formPlan.path.join('.')] ?? [],
            'onUpdate:modelValue': valueSetter.value,
          })
        : createVNode(
            'div',
            { style: { color: 'red' } },
            `No component found for section ${props.formPlan.section}`,
          )
  },
})

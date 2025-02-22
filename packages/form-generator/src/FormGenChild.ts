import { computed, createVNode, defineComponent, inject, watchEffect, type PropType } from 'vue'
import type { FormGenChildContext, FormGenComponent, FormGenConfig, FormPlan } from './types'
import { firstSelectorMatching } from './util/selectionUtil'
import { getAtPath } from './util/pathUtil'
import { formGenConfigSymbol } from './util/symbols'
import { isNullish } from './util/valueUtil'

export default defineComponent({
  props: {
    formPlan: { type: Object as PropType<FormPlan>, required: true },
  },
  setup(props) {
    const { value, errors, setValue } = inject<FormGenChildContext>('formGenChildContext')!

    const formGenConfig = inject<FormGenConfig>(formGenConfigSymbol)
    if (!formGenConfig) {
      throw Error('Missing form gen configuration.')
    }

    const SelectedComponent = computed(
      () =>
        formGenConfig.components[
          firstSelectorMatching(
            props.formPlan,
            formGenConfig.components.map((c) => c.selector),
          )
        ]?.component as FormGenComponent,
    )

    watchEffect(() => {
      if (
        props.formPlan.section === 'boolean' &&
        props.formPlan.props.required &&
        isNullish(getAtPath(value, props.formPlan.path))
      ) {
        setValue(false, props.formPlan.path)
      }
    })

    return () =>
      SelectedComponent.value
        ? createVNode(SelectedComponent.value, {
            modelValue: getAtPath(value, props.formPlan.path),
            formPlan: props.formPlan,
            errors: errors[props.formPlan.path.join('.')] ?? [],
            'onUpdate:modelValue': (val: any) => setValue(val, props.formPlan.path),
          })
        : createVNode(
            'div',
            { style: { color: 'red' } },
            `No component found for section ${props.formPlan.section}`,
          )
  },
})

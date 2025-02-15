import { defineComponent, inject, h, type PropType } from "vue";
import type {
  FormGenChildContext,
  FormGenComponent,
  FormGenConfig,
  FormPlan,
} from "./types";
import { firstSelectorMatching } from "./util/selectionUtil";
import { getAtPath } from "./util/pathUtil";
import { formGenConfigSymbol } from "./util/symbols";

export default defineComponent({
  props: {
    formPlan: { type: Object as PropType<FormPlan>, required: true },
  },
  setup(props) {
    const { value, errors, setValue } = inject<FormGenChildContext>(
      "formGenChildContext"
    )!;

    const formGenConfig =
      inject<FormGenConfig>(formGenConfigSymbol);
      if(!formGenConfig){
        throw Error("Missing form gen configuration.")
      }

    const SelectedComponent = formGenConfig.components[
      firstSelectorMatching(
        props.formPlan,
        formGenConfig.components.map((c) => c.selector)
      )
    ]?.component as FormGenComponent;

    if (SelectedComponent) {
      return () =>
        h(SelectedComponent, {
          modelValue: getAtPath(value, props.formPlan.path),
          formPlan: props.formPlan,
          errors: errors[props.formPlan.path.join(".")] ?? [],
          "onUpdate:modelValue": (val: any) =>
            setValue(val, props.formPlan.path),
        });
    } else {
      throw new Error(
        `Component not found for section ${props.formPlan.section}.`
      );
    }
  },
});

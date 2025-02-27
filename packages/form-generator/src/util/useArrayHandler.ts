import { toRaw, type ModelRef, computed } from "vue";
import type {
  FormGenComponentProps,
  FormPlan,
} from "../types";
import { generateBaseShape } from "./valueUtil";

function replaceWildCardWithIndexInPlan<T extends FormPlan>(formPlan: T, index: number): T {
  const indexOfFirstWildcard = formPlan.path.findIndex((p) => p === "*");
  if (indexOfFirstWildcard === -1)
    throw new Error("FormPlan path must contain a wildcard '*'");
  if (formPlan.section == "field") {
    return {
      ...formPlan,
      path: formPlan.path.map((p, i) =>
        i === indexOfFirstWildcard ? index.toString() : p
      ),
      child: replaceWildCardWithIndexInPlan(formPlan.child, index),
    }
  }else if (formPlan.section == "array") {
    return {
      ...formPlan,
      path: formPlan.path.map((p, i) =>
        i === indexOfFirstWildcard ? index.toString() : p
      ),
      items: replaceWildCardWithIndexInPlan(formPlan.items, index),
    };
  } else if (formPlan.section == "object") {
    return {
      ...formPlan,
      path: formPlan.path.map((p, i) =>
        i === indexOfFirstWildcard ? index.toString() : p
      ),
      children: formPlan.children.map((child) =>
        replaceWildCardWithIndexInPlan(child, index)
      ),
    };
  } else {
    return {
      ...formPlan,
      path: formPlan.path.map((p, i) =>
        i === indexOfFirstWildcard ? index.toString() : p
      ),
    };
  }
}

/**
 * Helps reduce boilerplate when working with arrays in the form generator
 * @param model the returned value from defineModel
 * @param props the props for the form array component
 * @returns
 */
export function useArrayHandler(
  model: ModelRef<any[]|undefined>,
  props: FormGenComponentProps<"array">
) {

  return {
    /**
     * Add a new item to the array
     */
    expandArray() {
      model.value = toRaw(model.value ?? []).concat([generateBaseShape(props.formPlan.items)]);
    },
    /**
     *
     * @param index the key or index of the item to remove
     */
    shrinkArray(index?: number) {
      if(model.value === undefined) return;
      if (index === undefined) {
        index = model.value.length - 1;
      }
      model.value = toRaw(model.value ?? []).filter((_, i) => i !== index);
    },
    /**
     * Form plans used for rendering the FormGenChild components
     */
    childPlans: computed(()=>(model.value??[]).map((_, i) => replaceWildCardWithIndexInPlan(props.formPlan.items, i))),
  };
}

import { ref, type ModelRef } from "vue";
import type {
  FormGenComponentProps,
  FormPlan,
} from "../types";
import { randomId } from "./randomId";


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
  model: ModelRef<any[]>,
  props: FormGenComponentProps<"array">
) {
  const arrayProps = ref<
    {
      key: string;
      formPlan: FormPlan;
    }[]
  >([]);
  return {
    /**
     * Add a new item to the array
     */
    expandArray() {
      arrayProps.value = arrayProps.value.concat({
        key: randomId(15),
        formPlan: replaceWildCardWithIndexInPlan(props.formPlan.items, arrayProps.value.length),
      });
    },
    /**
     *
     * @param index the key or index of the item to remove
     */
    shrinkArray(index?: number | string) {
      if (arrayProps.value.length === 0) return;
      if (index == undefined) {
        index = arrayProps.value.length - 1;
      }
      if (typeof index === "string") {
        index = arrayProps.value.findIndex((a) => a.key === index);
      }
      arrayProps.value = arrayProps.value
        .filter((_, i) => i !== index)
        .map((item, i) => ({
          key: item.key,
          formPlan: replaceWildCardWithIndexInPlan(props.formPlan.items, i),
        }));
      model.value = (model.value ?? []).filter((_, i) => i !== index);
    },
    /**
     * Props used for building the array children, it's an array of objects with a 'key' prop (for list rendering) and a 'formPlan' prop (for the FormGenChild component)
     */
    arrayProps,
  };
}

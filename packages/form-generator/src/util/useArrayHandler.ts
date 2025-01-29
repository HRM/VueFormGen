import { ref, type ModelRef } from "vue";
import type { FormGenComponentProps, FormPlan, GetMiddleware, SetMiddleware } from "../types";
import { randomId } from "./randomId";

function generateSetMiddleware(formPlan: FormPlan, index: number):SetMiddleware {
  return (value,path,next)=>{
    next(value,path.map((p,i)=>i===formPlan.path.length-1?index.toString():p));
  }
}

function generateGetMiddleware(
  formPlan: FormPlan,
  index: number
): GetMiddleware {
  return (path, next) => 
    next(
      path.map((p, i) =>
        i === formPlan.path.length - 1 ? index.toString() : p
      )
    );
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
  const arrayProps = ref<{ key: string; setMiddleware:SetMiddleware, getMiddleware:GetMiddleware }[]>([]);
  return {
    /**
     * Add a new item to the array
     */
    expandArray() {
      arrayProps.value = arrayProps.value.concat({
        key: randomId(15),
        setMiddleware: generateSetMiddleware(props.formPlan.items, arrayProps.value.length),
        getMiddleware: generateGetMiddleware(props.formPlan.items, arrayProps.value.length)
      });
    },
    /**
     *
     * @param index the key or index of the item to remove
     */
    shrinkArray(index?: number | string) {
      if(arrayProps.value.length === 0) return;
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
          setMiddleware: generateSetMiddleware(
            props.formPlan.items,
            i
          ),
          getMiddleware: generateGetMiddleware(
            props.formPlan.items,
            i
          )
        }));
      model.value = (model.value??[]).filter((_, i) => i !== index);
      
    },
    /**
     * Props used for building the array children, it's an array of objects with a 'key' prop (for list rendering) and a 'setMiddleware' prop (for the FormGenChild component)
     */
    arrayProps
  };
}

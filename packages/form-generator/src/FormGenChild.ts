import { defineComponent, inject, h, type PropType, watch, type Ref, ref, computed, provide } from "vue";
import type {
  FormGenChildContext,
  FormGenComponent,
  FormGenConfigContext,
  FormPlan,
  GetMiddleware,
  SetMiddleware,
} from "./types";
import { firstSelectorMatching } from "./util/selectionUtil";
import { getAtPath } from "./util/pathUtil";
import { combineMiddlewaresWithGetter, combineMiddlewaresWithSetter } from "./util/middlewareUtil";

export default defineComponent({
  props: {
    formPlan: { type: Object as PropType<FormPlan>, required: true },
    setMiddleware: { type: Function as PropType<SetMiddleware> },
    getMiddleware: { type: Function as PropType<GetMiddleware> },
  },
  setup(props) {
    const { value, errors, setValue } = inject<FormGenChildContext>(
      "formGenChildContext"
    )!;

    let injectedSetMiddlewares = inject<Ref<SetMiddleware[]>>(
      "setMiddlewares",
      () => ref<SetMiddleware[]>([]),
      true
    );

    let injectedGetMiddlewares = inject<Ref<GetMiddleware[]>>(
      "getMiddlewares",
      () => ref<GetMiddleware[]>([]),
      true
    );

    const setMiddlewares = computed(() => {
      const previousMiddlewares = injectedSetMiddlewares.value;
      if (props.setMiddleware) {
        return [...previousMiddlewares, props.setMiddleware];
      } else {
        return previousMiddlewares;
      }
    });

    const getMiddlewares = computed(() => {
      const previousMiddlewares = injectedGetMiddlewares.value;
      if (props.getMiddleware) {
        return [...previousMiddlewares, props.getMiddleware];
      } else {
        return previousMiddlewares;
      }
    });

    provide("setMiddlewares", setMiddlewares);
    provide("getMiddlewares", getMiddlewares);

    const setValueCombined = computed(() => {
      const combined = combineMiddlewaresWithSetter(
        setMiddlewares.value,
        setValue
      );
      return (val: any) => combined(val, props.formPlan.path);
    });

    const getValueCombined = computed(() => {
      const combined = combineMiddlewaresWithGetter(
        getMiddlewares.value,
        (path:string[])=>getAtPath(value,path)
      );
      return () => combined(props.formPlan.path);
    });

    const setForComponent = (val:any)=>{
      setValueCombined.value(val);
    }

    const getForComponent = ()=>{
      return getValueCombined.value();
    }

    const { components } = inject<FormGenConfigContext>(
      "formGenConfigContext"
    )!;

    const SelectedComponent = components[
      firstSelectorMatching(
        props.formPlan,
        components.map((c) => c.selector)
      )
    ]?.component as FormGenComponent;

    if (SelectedComponent) {
      return () =>
        h(SelectedComponent, {
          modelValue: getForComponent(),
          formPlan: props.formPlan,
          errors: errors[props.formPlan.path.join(".")] ?? [],
          "onUpdate:modelValue": setForComponent,
        });
    } else {
      throw new Error(
        `Component not found for section ${props.formPlan.section}.`
      );
    }
  },
});

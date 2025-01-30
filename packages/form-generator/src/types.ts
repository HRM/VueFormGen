//Form Plan
import type { JSONSchema4 } from 'json-schema';
import type {Component, ComputedOptions, MethodOptions} from "vue"

export type SectionType =
  | 'object'
  | 'field'
  | 'enum'
  | 'string'
  | 'number'
  | 'boolean'
  | 'array';

export type SharedProps = {
  required: boolean;
};

export type SectionSpecificProps = {
  string: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    format?: string;
  };
  number: {
    minimum?: number;
    maximum?: number;
    multipleOf?: number;
  };
  enum: {
    values: string[] ;
  };
  field: {
    title: string;
    description?: string;
  };
  array: {
    minItems?: number;
    maxItems?: number;
  }
};

export type SectionSpecificChild = {
  object: { children: FormPlan<"field">[] };
  field: { child: FormPlan };
  array: { items: FormPlan };
};

export type SectionProps = {
  [key in SectionType]: key extends keyof SectionSpecificProps
    ? SharedProps & SectionSpecificProps[key]
    : SharedProps;
};

export type FormPlan<K extends SectionType = SectionType> = {
  [key in SectionType]: {
    section: key;
    path: string[];
    props: SectionProps[key];
  } & (key extends keyof SectionSpecificChild ? SectionSpecificChild[key]
  : object);
}[K];

export type FormPlanSelector<K extends SectionType = SectionType> = {
  [key in SectionType]: [key] | [key, (formPlan: FormPlan<key>) => boolean];
}[K];

export type FormGenComponentValue<T extends SectionType = SectionType> = {
  object: object;
  enum: string;
  string: string;
  number: number;
  boolean: boolean;
  field: any;
  array: any[];
}[T];

export type FormGenComponentProps<
  T extends SectionType = SectionType,
> = {
  formPlan: FormPlan<T>;
  errors: string[];
};

export type FormGenComponentPropsWithModel<T extends SectionType = SectionType> = {
  modelValue: FormGenComponentValue<T>;
} & FormGenComponentProps<T>;
export type FormGenComponentEmits<T extends SectionType = SectionType> = {
 'update:modelValue': (value: FormGenComponentValue<T>) => any;
}

export type FormGenComponent<T extends SectionType = SectionType> = Component<
  Partial<FormGenComponentPropsWithModel<T>>,
  any,
  any,
  ComputedOptions,
  MethodOptions,
  Partial<FormGenComponentEmits<T>>
>;

export type FormGenComponentEntry<T extends SectionType = SectionType> =
  T extends string
    ? {
        selector: FormPlanSelector<T>;
        component: FormGenComponent<T>;
      }
    : never;

export type ValidationError = {
  [k: string]: string[];
};

export type ValidatorFunction = (value: any) => ValidationError;

export type Validator = (schema: JSONSchema4) => ValidatorFunction;

export type ComponentCollectionConfig<T extends SectionType[]> = {
  [key in keyof T]: FormGenComponentEntry<T[key]>;
};



export type FormGenChildContext = {
  setValue: (val: any, path: string[]) => void;
  value: object;
  errors: ValidationError;
};

export type FormGenConfigContext = {
  components: FormGenComponentEntry[];
};

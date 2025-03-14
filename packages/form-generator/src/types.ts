//Form Plan
import type { ValidationError } from "jsonschema";
import type { Component, ComputedOptions, MethodOptions } from "vue";

export type SectionType =
  | "object"
  | "field"
  | "enum"
  | "string"
  | "number"
  | "boolean"
  | "array";

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
    values: (string | number)[];
  };
  field: {
    title?: string;
    description?: string;
  };
  array: {
    minItems?: number;
    maxItems?: number;
  };
};

export type SectionSpecificChild = {
  object: { children: FormPlan<"field">[] };
  field: { child: FormPlan<Exclude<SectionType, "field">> };
  array: { items: FormPlan<"field"> };
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
  } & (key extends keyof SectionSpecificChild
    ? SectionSpecificChild[key]
    : object);
}[K];

const k:FormPlan = {} as any;

export type FormPlanSelector<K extends SectionType = SectionType> = {
  [key in SectionType]: [key] | [key, (formPlan: FormPlan<key>) => boolean];
}[K];

export type FormGenComponentValue<T extends SectionType = SectionType> =
  {
    object: object | null;
    enum: string | number | null;
    string: string | null;
    number: number | null;
    boolean: boolean | null;
    field: any;
    array: any[] | null;
  }[T];

export type FormGenComponentProps<T extends SectionType = SectionType> = {
  formPlan: FormPlan<T>;
  errors: string[];
};

export type FormGenComponentPropsWithModel<
  T extends SectionType = SectionType,
> = {
  modelValue: FormGenComponentValue<T>;
} & FormGenComponentProps<T>;
export type FormGenComponentEmits<T extends SectionType = SectionType> = {
  "update:modelValue": (value: FormGenComponentValue<T>) => any;
};

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

export type FormValidationErrors = {
  [k: string]: string[];
};

export type ComponentCollectionConfig<T extends SectionType[]> = {
  [key in keyof T]: FormGenComponentEntry<T[key]>;
};

export type ValidationErrorTranslator = (error: ValidationError) => string;
export type FormFieldTranslator = (formPlan: FormPlan<"field">) => {title?: string, description?: string};

export type FormGenChildContext = {
  setValue: (val: any, path: string[]) => void;
  value: object;
  errors: FormValidationErrors;
};

export type FormGenConfig = {
  components: FormGenComponentEntry[];
  initializeBooleans: boolean;
  initializeObjects: boolean;
  fieldTranslator?: FormFieldTranslator;
  errorTranslator?: ValidationErrorTranslator;
};

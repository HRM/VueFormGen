type ObjectFormPlan = {
  section: 'object'
  path: string[]
  props: {
    required: boolean
  }
  children: Extract<FormPlan, { section: 'field' }>[]
}

type FieldFormPlan = {
  section: 'field'
  path: string[]
  props: {
    required: boolean
    title: string
    description?: string
  }
  child: Exclude<FormPlan, { section: 'field' }>
}

type ArrayFormPlan = {
  section: 'array'
  path: string[]
  props: {
    required: boolean
    minItems?: number
    maxItems?: number
  }
  items: Exclude<FormPlan, { section: 'field' }>
}

type EnumFormPlan = {
  section: 'enum'
  path: string[]
  props: {
    required: boolean
    values: (string | number)[]
  }
}

type StringFormPlan = {
  section: 'string'
  path: string[]
  props: {
    required: boolean
    minLength?: number
    maxLength?: number
    pattern?: string
    format?: string
  }
}

type NumberFormPlan = {
  section: 'number'
  path: string[]
  props: {
    required: boolean
    minimum?: number
    maximum?: number
    multipleOf?: number
  }
}

type BooleanFormPlan = {
  section: 'boolean'
  path: string[]
  props: {
    required: boolean
  }
}

type FormPlan =
  | ObjectFormPlan
  | FieldFormPlan
  | ArrayFormPlan
  | EnumFormPlan
  | StringFormPlan
  | NumberFormPlan
  | BooleanFormPlan

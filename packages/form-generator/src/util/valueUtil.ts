import type { FormPlan } from '../types'

export function isNullish(value: any) {
  if (typeof value === 'string' && value.trim().length === 0) {
    return true
  }
  if (Array.isArray(value) && value.length === 0) {
    return true
  }
  if (
    typeof value === 'object' &&
    value !== null &&
    Object.getOwnPropertyNames(value).length === 0
  ) {
    return true
  }
  if (value === undefined || value === null) {
    return true
  }
  return false
}

export function cleanObject(value: Record<string, any>) {
  for (const key in value) {
    if (isNullish(value[key])) {
      delete value[key]
    }
  }
}

export function isObject(value: any) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function deepAssign(to: object, from: object, removeExtraKeys = true) {
  if (Array.isArray(from) != Array.isArray(to)) {
    throw new Error(
      'both from and to has to be array or object, objects cannot be assigned to arrays or arrays to objects',
    )
  }
  if (Array.isArray(from) && Array.isArray(to)) {
    for (let i = 0; i < from.length; i++) {
      if (typeof from[i] == 'object' && from[i] != null) {
        if (Array.isArray(from[i]) && !Array.isArray(to[i])) {
          to[i] = []
        } else if (typeof to[i] != 'object' || to[i] == null) {
          to[i] = {}
        }
        deepAssign(to[i], from[i])
      } else {
        to[i] = from[i]
      }
    }
    if (from.length < to.length && removeExtraKeys) {
      to.splice(from.length, to.length - from.length)
    }
  } else {
    for (const key in from) {
      if (typeof from[key as keyof object] == 'object' && from[key as keyof object] != null) {
        if (Array.isArray(from[key as keyof object]) && !Array.isArray(to[key as keyof object])) {
          ;(to[key as keyof object] as any[]) = []
        } else if (typeof to[key as keyof object] != 'object' || to[key as keyof object] == null) {
          ;(to[key as keyof object] as object) = {}
        }
        deepAssign(to[key as keyof object], from[key as keyof object])
      } else {
        to[key as keyof object] = from[key as keyof object]
      }
    }
    if (removeExtraKeys) {
      for (const key of Object.keys(to).filter((k) => !(k in from))) {
        delete to[key as keyof object]
      }
    }
  }
}

export function deepClone<T>(value: T): T {
  if (typeof value == 'object' && value != null) {
    if (Array.isArray(value)) {
      return value.map(deepClone) as T
    }
    const obj: Record<string, any> = {}
    for (const key in value) {
      obj[key] = deepClone(value[key])
    }
    return obj as T
  }
  return value
}

export function generateBaseShape(
  plan: FormPlan,
  config = { initializeBooleans: true, initializeObjects: true },
): any {
  if (plan.section === 'field') {
    return generateBaseShape(plan.child, config)
  }
  if (plan.section === 'object' && config.initializeObjects) {
    let obj: Record<string, any> = {}
    for (let child of plan.children) {
      if (
        child.props.required ||
        (child.child.section === 'object' && config.initializeObjects) ||
        (child.child.section === 'boolean' && config.initializeBooleans)
      ) {
        obj[child.path[child.path.length - 1]] = generateBaseShape(child, config)
      }
    }
    return obj
  }
  if (plan.section === 'boolean' && config.initializeBooleans) {
    return false
  }
  return null
}

export function correctBaseShape(
  value: any,
  plan: FormPlan,
  config = { initializeBooleans: true, initializeObjects: true },
): any {
  if (plan.section === 'field') {
    return correctBaseShape(value, plan.child, config)
  }
  if (plan.section === 'object') {
    if (!isObject(value)) {
      return generateBaseShape(plan, config)
    }

    let obj: Record<string, any> = {}
    for (let child of plan.children) {
      if (
        child.props.required ||
        (child.child.section === 'object' && config.initializeObjects) ||
        (child.child.section === 'boolean' && config.initializeBooleans)
      ) {
        obj[child.path[child.path.length - 1]] = correctBaseShape(
          value[child.path[child.path.length - 1]],
          child,
          config,
        )
      } else if (child.path[child.path.length - 1] in value) {
        const newValue = correctBaseShape(value[child.path[child.path.length - 1]], child, config)
        if (!isNullish(newValue)) {
          obj[child.path[child.path.length - 1]] = newValue
        }
      }
    }
    return obj
  }
  if (plan.section === 'boolean') {
    if (typeof value !== 'boolean') {
      if (config.initializeBooleans) {
        return false
      }
      return null
    }
    return value
  }
  if (isNullish(value)) {
    return null
  }
  if (plan.section === 'array') {
    if (!Array.isArray(value)) {
      return null
    }
    return value.map((v, i) => correctBaseShape(v, plan.items, config))
  }
  if (plan.section === 'string') {
    if (typeof value !== 'string') {
      return null
    }
    return value
  }
  if (plan.section === 'number') {
    if (typeof value !== 'number') {
      return null
    }
    return value
  }
  if (plan.section === 'enum') {
    if (!plan.props.values.includes(value)) {
      return null
    }
    return value
  }
  return null
}

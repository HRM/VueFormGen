
export function isNullish(value: any) {
  if (typeof value === "string" && value.trim().length === 0) {
    return true;
  }
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  if(typeof value === "object" && value !== null && Object.getOwnPropertyNames(value).length === 0) {
    return true;
  }
  if(value === undefined|| value === null) {
    return true;
  }
  return false;
}

export function deepAssign(to: object, from: object) {
  if (Array.isArray(from) != Array.isArray(to)) {
    throw new Error(
      "both from and to has to be array or object, objects cannot be assigned to arrays or arrays to objects"
    );
  }
  if (Array.isArray(from) && Array.isArray(to)) {
    for (let i = 0; i < from.length; i++) {
      if (typeof from[i] == "object" && from[i] != null) {
        if (Array.isArray(from[i]) && !Array.isArray(to[i])) {
          to[i] = [];
        } else if (typeof to[i] != "object" || to[i] == null) {
          to[i] = {};
        }
        deepAssign(to[i], from[i]);
      } else {
        to[i] = from[i];
      }
    }
    if (from.length < to.length) {
      to.splice(from.length, to.length - from.length);
    }
  } else {
    for (const key in from) {
      if (
        typeof from[key as keyof object] == "object" &&
        from[key as keyof object] != null
      ) {
        if (
          Array.isArray(from[key as keyof object]) &&
          !Array.isArray(to[key as keyof object])
        ) {
          (to[key as keyof object] as any[]) = [];
        } else if (
          typeof to[key as keyof object] != "object" ||
          to[key as keyof object] == null
        ) {
          (to[key as keyof object] as object) = {};
        }
        deepAssign(to[key as keyof object], from[key as keyof object]);
      } else {
        to[key as keyof object] = from[key as keyof object];
      }
    }
    for (const key of Object.keys(to).filter(
      (k) => !(k in from)
    )) {
      delete to[key as keyof object];
    }
  }
}

export function deepClone<T>(value: T): T {
  if (typeof value == "object" && value != null) {
    if (Array.isArray(value)) {
      return value.map(deepClone) as T;
    }
    const obj: Record<string, any> = {};
    for (const key in value) {
      obj[key] = deepClone(value[key]);
    }
    return obj as T;
  }
  return value;
}

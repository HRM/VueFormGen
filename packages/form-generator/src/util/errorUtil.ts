import type { FormValidationErrors } from "../types";

export function groupValidationErrors(errors: {path:string|string[],message:string}[]): FormValidationErrors {
  const pathErrorMap = new Map<string, string[]>();
  errors.forEach((error) => {
    const errorPath = Array.isArray(error.path)
      ? error.path.join('.')
      : error.path;
    const entry = pathErrorMap.get(errorPath) || [];
    entry.push(error.message);
    pathErrorMap.set(errorPath, entry);
  });
  return Object.fromEntries(pathErrorMap);
}

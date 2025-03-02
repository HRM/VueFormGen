import type { JSONSchema4 } from "json-schema";
import { validate } from "jsonschema";
import type { FormValidationErrors, ValidationErrorTranslator } from "../types";

export function validateFormValue(
  value: any,
  formPlan: JSONSchema4,
  errorTranslator?: ValidationErrorTranslator
): { errors: FormValidationErrors; valid: boolean } {
  const res = validate(value, formPlan);
  const errorsTransformed = res.errors.map((e) => {
    if(e.name === "required"){
      return {
        ...e,
        message: `value is required`,
        path: e.path.concat(e.argument),
      };
    }
    if (e.name === "type" && e.instance == null) {
      return {
        ...e,
        message: `value is required`,
      };
    }
    return e;
  });
  if (errorTranslator) {
    errorsTransformed.forEach((e) => {
      e.message = errorTranslator(e);
    });
  }
  const errors: FormValidationErrors = {};
  errorsTransformed.forEach((e) => {
    const path = e.path.join(".");
    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(e.message);
  });
  return { errors, valid: res.valid };
}

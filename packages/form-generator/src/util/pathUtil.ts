import type {  FormPlan } from "../types";
import { isObject } from "./valueUtil";

export function setAtPathByFormPlan(
  input: any,
  formPlan: FormPlan,
  path: string[],
  value: any
): any{
    switch (formPlan.section) {
      case "field":
        return setAtPathByFormPlan(input, formPlan.child, path, value);
      case "string":
      case "number":
      case "boolean":
      case "enum":
        return value;
      case "array":
        {
          if(path.length === 0){
            return value;
          }
          const inputArray = Array.isArray(input) ? input : [];
          const [head, ...tail] = path;
          const headAsNum = parseInt(head, 10);
          if (isNaN(headAsNum)) {
            throw new Error("Array path must be a number: "+path.join("."));
          }

          if (inputArray.length <= headAsNum) {
            for (let i = inputArray.length; i <= headAsNum; i++) {
              inputArray[i] = null;
            }
          }

          inputArray[headAsNum] = setAtPathByFormPlan(
            inputArray[headAsNum],
            formPlan.items,
            tail,
            value
          );

          return inputArray;
        }
      case "object":
        {
          if(path.length === 0){
            return value;
          }
          const inputObject =
            typeof input === "object" && input !== null ? input : {};
          const [head, ...tail] = path;
          const child = formPlan.children.find(
            (child) => child.path[child.path.length - 1] === head
          );
          if(child === undefined){
            throw new Error("Path does not match form plan: "+path.join("."));
          }
          inputObject[head] = setAtPathByFormPlan(
            inputObject[head],
            child,
            tail,
            value
          );
          if(!child.props.required && inputObject[head]===null && !isObject(inputObject[head])){
            delete inputObject[head];
          }
          return inputObject;
        }
    }
}

export function getAtPath(input: any, path: string[]): any {
  if (path.length === 0) {
    return input;
  }
  const [head, ...tail] = path;
  if (typeof input == 'object' && input != null) {
    return getAtPath(input[head], tail);
  }
  return undefined;
}

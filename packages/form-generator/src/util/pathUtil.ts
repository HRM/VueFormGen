import type {  FormPlan } from "../types";
import { isNullish } from "./valueUtil";

export function setAtPath(input: any, path: string[], value: any): any {
  if (path.length === 0) {
    return value;
  }
  const [head, ...tail] = path;
  const headAsNum = parseInt(head, 10);
  if (!isNaN(headAsNum)) {
    const newArray = Array.isArray(input) ? input : [];
    if (newArray.length <= headAsNum) {
      for (let i = newArray.length; i <= headAsNum; i++) {
        newArray[i] = undefined;
      }
    }
    newArray[headAsNum] = setAtPath(newArray[headAsNum], tail, value);
    return newArray;
  }
  if (typeof input === 'object' && input !== null && !Array.isArray(input)) {
    input[head]= setAtPath(input?.[head], tail, value);
    return input;
  }
  return {
    [head]: setAtPath(input?.[head], tail, value),
  };
}

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
              inputArray[i] = undefined;
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
          if(!child.props.required && isNullish(inputObject[head])){
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

export function isSubPathOf(subPath: string[], path: string[]): boolean {
  if (path.length < subPath.length) {
    return false;
  }
  for (let i = 0; i < subPath.length; i++) {
    if (path[i] !== subPath[i]) {
      return false;
    }
  }
  return true;
}

export function pathsOverlap(path1: string[], path2: string[]) {
  return isSubPathOf(path1, path2) || isSubPathOf(path2, path1);
}

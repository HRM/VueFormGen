import { inject } from "vue";
import type { FormGenConfig } from "../types";
import { formGenConfigSymbol } from "./symbols";

export function useFormGenConfig():FormGenConfig {
  const config =  inject<FormGenConfig>(formGenConfigSymbol)!;
  if(!config) {
    throw Error('Missing form gen configuration.')
  }
  return config;
}
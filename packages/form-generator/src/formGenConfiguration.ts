import type { Plugin } from "vue";
import type { FormGenConfig } from "./types";
import { formGenConfigSymbol } from "./util/symbols";
import {defaultComponentCollection} from "./defaultComponentCollection";

export function createFormGenConfig(config: Partial<FormGenConfig> = {}): Plugin {
  return (app) => {
    app.provide<FormGenConfig>(formGenConfigSymbol, {
      ...config,
      initializeBooleans: config.initializeBooleans ?? true,
      initializeObjects: config.initializeObjects ?? true,
      components: config.components ?? defaultComponentCollection,
    });
  };
}

import type { Plugin } from "vue";
import type { FormGenConfig } from "./types";
import { formGenConfigSymbol } from "./util/symbols";
import {defaultComponentCollection} from "./defaultComponentCollection";

export function createFormGenConfig(config: Partial<FormGenConfig> = {}): Plugin {
  return (app) => {
    app.provide<FormGenConfig>(formGenConfigSymbol, {
      ...config,
      components: config.components ?? defaultComponentCollection,
    });
  };
}

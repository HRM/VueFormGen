import type { Plugin } from "vue";
import type { FormGenComponentEntry, FormGenConfigContext } from "./types";

export const FormGenComponents: Plugin<[FormGenComponentEntry[]]> = (app, components) => {
    app.provide<FormGenConfigContext>("formGenConfigContext",{components});
};
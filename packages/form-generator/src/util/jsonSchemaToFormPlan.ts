import type { JSONSchema4 } from "json-schema";
import type { FormPlan, FormFieldTranslator, SectionType } from "../types";
import { convertName } from "./convertName";

export function jsonSchemaToFormPlan(
  schema: JSONSchema4,
  basePath: string[] = [],
  required = false
): FormPlan | undefined {
  if (typeof schema === "object" || schema !== null) {
    switch (schema.type) {
      case "object":
        const children = Object.entries(
          typeof schema.properties === "object" && schema.properties !== null
            ? schema.properties
            : {}
        )
          .map(([key, value]) => {
            const fieldRequired = Array.isArray(schema.required)
              ? schema.required.includes(key)
              : false;
            const childPlan = jsonSchemaToFormPlan(
              value,
              basePath.concat(key),
              fieldRequired
            );
            if (childPlan) {
              return {
                section: "field",
                path: basePath.concat(key),
                props: {
                  title: value.title ?? convertName(key),
                  description: value.description,
                  required: fieldRequired,
                },
                child: childPlan,
              };
            }
            return undefined;
          })
          .filter((child) => child !== undefined);
        if (children.length > 0) {
          return {
            section: "object",
            path: basePath,
            props: { required },
            children,
          } as FormPlan<"object">;
        }
        return undefined;
      case "array":
        if (typeof schema.items == "object" && !Array.isArray(schema.items)) {
          const itemsPlan = jsonSchemaToFormPlan(
            schema.items,
            basePath.concat("*")
          );
          if (itemsPlan) {
            return {
              section: "array",
              path: basePath,
              props: {
                minItems: schema.minItems,
                maxItems: schema.maxItems,
                required,
              },
              items: {
                section: "field",
                path:itemsPlan.path,
                props:{
                  required:itemsPlan.props.required
                },
                child: itemsPlan as FormPlan<Exclude<SectionType, "field">>
              },
            };
          }
        }
        return undefined;
      case "string":
        return {
          section: "string",
          path: basePath,
          props: {
            maxLength: schema.maxLength,
            minLength: schema.minLength,
            pattern: schema.pattern,
            format: schema.format,
            required,
          },
        } as FormPlan<"string">;
      case "number":
        return {
          section: "number",
          path: basePath,
          props: {
            maximum: schema.maximum,
            minimum: schema.minimum,
            multipleOf: schema.multipleOf,
            required,
          },
        } as FormPlan<"number">;
      case "integer":
        return {
          section: "number",
          path: basePath,
          props: {
            maximum: schema.maximum,
            minimum: schema.minimum,
            multipleOf: schema.multipleOf ?? 1,
            required,
          },
        } as FormPlan<"number">;
      case "boolean":
        return {
          section: "boolean",
          path: basePath,
          props: { required },
        } as FormPlan<"boolean">;
      default:
        if (
          "enum" in schema &&
          Array.isArray(schema.enum) &&
          schema.enum.every((v) => ["number", "string"].includes(typeof v))
        ) {
          return {
            section: "enum",
            path: basePath,
            props: {
              values: schema.enum,
              required,
            },
          } as FormPlan<"enum">;
        }
        return undefined;
    }
  }
  return undefined;
}


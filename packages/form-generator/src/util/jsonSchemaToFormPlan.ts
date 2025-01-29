import type { JSONSchema4 } from 'json-schema';
import type { FormPlan } from '../types';

export function jsonSchemaToFormPlan(
  schema: JSONSchema4,
  basePath: string[] = [],
  required = false
): FormPlan {
  switch (schema.type) {
    case 'object':
      return {
        section: 'object',
        path: basePath,
        props: { required },
        children: Object.entries(schema.properties || {}).map(
          ([key, value]) => ({
            section: 'field',
            path: basePath.concat(key),
            props: {
              title: value.title ?? key,
              description: value.description,
              required: value.required,
            },
            child: jsonSchemaToFormPlan(value, basePath.concat(key)),
          })
        ),
      } as FormPlan<'object'>;
    case 'array':
      if (typeof schema.items == "object" && !Array.isArray(schema.items)){
        return {
          section: "array",
          path: basePath,
          props: {
            minItems: schema.minItems,
            maxItems: schema.maxItems,
            required,
          },
          items: jsonSchemaToFormPlan(
            schema.items,
            basePath.concat("*")
          ),
        };
      }
      throw new Error("Array schema with tuple items not supported");
    case 'string':
      return {
        section: 'string',
        path: basePath,
        props: {
          maxLength: schema.maxLength,
          minLength: schema.minLength,
          pattern: schema.pattern,
          required,
        },
      } as FormPlan<'string'>;
    case 'number':
      return {
        section: 'number',
        path: basePath,
        props: {
          maximum: schema.maximum,
          minimum: schema.minimum,
          multipleOf: schema.multipleOf,
          required,
        },
      } as FormPlan<'number'>;
    case 'boolean':
      return {
        section: 'boolean',
        path: basePath,
        props: { required },
      } as FormPlan<'boolean'>;
    default:
      if ('enum' in schema) {
        return {
          section: 'enum',
          path: basePath,
          props: {
            values: schema.enum,
            required,
          },
        } as FormPlan<'enum'>;
      }
      throw new Error(`Unparseable schema: ${JSON.stringify(schema, null, 2)}`);
  }
}

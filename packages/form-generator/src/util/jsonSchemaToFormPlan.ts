import type { JSONSchema4 } from 'json-schema';
import type { FormPlan, FormFieldTranslator, SectionType } from '../types';

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
          ([key, value]) => {
            const fieldRequired = Array.isArray(schema.required) ? schema.required.includes(key) : false;
            return {
              section: "field",
              path: basePath.concat(key),
              props: {
                title: value.title ?? key,
                description: value.description,
                required: fieldRequired,
              },
              child: jsonSchemaToFormPlan(
                value,
                basePath.concat(key),
                fieldRequired
              ),
            };}
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
          ) as FormPlan<Exclude<SectionType,'field'>>,
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
      throw new Error(`Unparsable schema: ${JSON.stringify(schema, null, 2)}`);
  }
}

export function translateFormPlan<T extends FormPlan>(
  plan: T,
  translator: FormFieldTranslator
): T {
  switch (plan.section) {
    case 'object':
      return {
        ...plan,
        children: plan.children.map((child) =>
          translateFormPlan(child, translator)
        ),
      };
    case 'field':
      return {
        ...plan,
        props: {...plan.props, title: translator(plan)},
        child: translateFormPlan(plan.child, translator),
      };
    case 'array':
      return {
        ...plan,
        items: translateFormPlan(plan.items, translator),
      };
    default:
      return plan;
  }
}

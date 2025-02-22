<script setup lang="ts">
import Container from '@/components/Container.vue'
import DocTitle from '@/components/DocTitle.vue'
import HighlightedCode from '@/components/HighlightedCode.vue'
import InlineCode from '@/components/InlineCode.vue'
import ExampleEditor from '@/components/ExampleEditor.vue'
import OneLineCode from '@/components/OneLineCode.vue'
import tryOutExample from '@/assets/jsonExamples/tryOutExample.json?raw'
import setupExample from '@/assets/tsExamples/setup.ts?raw'
import howToUse from '@/assets/vueExample/howToUse.vue?raw'
import formPlanExpanded from '@/assets/tsExamples/formPlanExpanded.ts?raw'
import customStringInput from '@/assets/vueExample/CustomStringInput.vue?raw'
import customObjectInput from '@/assets/vueExample/CusomObjectInput.vue?raw'
import customArrayInput from '@/assets/vueExample/CustomArrayInput.vue?raw'
import componentSetupExample from '@/assets/tsExamples/componentSetup.ts?raw'
import partialComponentCollecionExample from '@/assets/tsExamples/partialComponentCollection.ts?raw'
import targetedSelectorExample from '@/assets/tsExamples/targetedSelector.ts?raw'
import setupWithLocalization from '@/assets/tsExamples/setupWithLocalization.ts?raw'
</script>

<template>
  <Container>
    <DocTitle />
    <div>
      <h2>Try it out</h2>
      <ExampleEditor :default-code="tryOutExample" :default-value="{ items: [undefined] }" />
    </div>
    <div>
      <h2>Setup</h2>
      <p>First, install the package:</p>
      <OneLineCode>npm install vue-form-gen</OneLineCode>
      <p>Then, in your main.ts file, add the following code:</p>
      <HighlightedCode lang="typescript" :code="setupExample" />
      <p>
        The key part of the code above is <InlineCode>app.use(createFormGenConfig())</InlineCode>.
        Additionally, import <InlineCode>vue-form-gen/style.css</InlineCode> if you are using the
        built-in components and want to apply the default styles to them. More details about
        built-in components and styling will be covered later.
      </p>
    </div>
    <div>
      <h2>How to use</h2>
      <HighlightedCode lang="vue" :code="howToUse" />
      <p>
        The <InlineCode>FormGen</InlineCode> component is the main component of the library. It
        accepts a JSON schema as a prop, which can be provided either as an object or a string. The
        form data is bound using v-model, allowing two-way data binding. The component also exposes
        a function called <InlineCode>validate</InlineCode> that can be used to validate the form
        and returns a boolean indicating whether the form is valid.
      </p>
      <p>The supported data types are:</p>
      <ul>
        <li><strong>object</strong></li>
        <li><strong>array</strong></li>
        <li><strong>string</strong></li>
        <li><strong>number</strong></li>
        <li><strong>boolean</strong></li>
        <li>
          <strong>enum</strong> (containing strings and/or numbers, should be used through the
          <InlineCode>enum</InlineCode> keyword)
        </li>
      </ul>
      <p>Supported properties for each data type include:</p>
      <ul>
        <li>
          <strong>Strings</strong>: <InlineCode>minLength</InlineCode>,
          <InlineCode>maxLength</InlineCode>, <InlineCode>pattern</InlineCode>,
          <InlineCode>format</InlineCode>
        </li>
        <li>
          <strong>Numbers</strong>: <InlineCode>minimum</InlineCode>,
          <InlineCode>maximum</InlineCode>, <InlineCode>multipleOf</InlineCode>
        </li>
        <li>
          <strong>Arrays</strong>: <InlineCode>minItems</InlineCode>,
          <InlineCode>maxItems</InlineCode>
        </li>
      </ul>
      <p>
        Additionally, all data types support the <InlineCode>title</InlineCode> and
        <InlineCode>description</InlineCode> properties. If these are used, the
        <InlineCode>title</InlineCode> will replace the title generated from the property name, and
        the <InlineCode>description</InlineCode> will be presented to the user. The built-in
        validation supports all DRAFT-07 JSON schema properties.
      </p>
      <p>
        Objects and arrays can be nested into each other, allowing for complex form structures. If
        the schema contains unsupported properties or data types, they will be ignored.
      </p>
    </div>
    <div>
      <h2>Value handling</h2>
      <p>
        Nested objects and arrays, along with their properties, will be created as the user adds
        more data, so the value you begin with can be an empty object, or an object only containing
        partial data. If a property is not required and the user clears it's value, it will be
        removed from the containing object. This behavior is recursive and clears all empty values
        up to the root object. Empty properties include empty strings, objects with no properties,
        empty arrays, undefined, and null values. This behavior simplifies handling empty states by
        converting them all into a single, consistent empty state. For example,
        <InlineCode>{ num: 11, obj1: { obj2: { str: "" } } }</InlineCode> will become
        <InlineCode>{ num: 11 }</InlineCode>.
      </p>
      <p>
        To create a default starting value for your data, we recommend using a library such as
        <a href="https://www.npmjs.com/package/json-schema-default">json-schema-default</a>.
      </p>
    </div>
    <div>
      <h2>Styling</h2>
      <p>
        The default styles are defined using CSS variables, which can be overridden in your own
        stylesheet to match your application's design.
      </p>
      <p>Here are the CSS variables you can override:</p>
      <ul>
        <li>
          <InlineCode>--form-gen-border-color</InlineCode>: The border color of the form elements.
        </li>
        <li>
          <InlineCode>--form-gen-required-star-color</InlineCode>: The color of the required field
          asterisk.
        </li>
        <li>
          <InlineCode>--form-gen-input-background-color</InlineCode>: The background color of the
          input fields.
        </li>
        <li>
          <InlineCode>--form-gen-input-text-color</InlineCode>: The text color of the input fields.
        </li>
        <li>
          <InlineCode>--form-gen-input-outline-color</InlineCode>: The outline color of the input
          fields when focused.
        </li>
        <li>
          <InlineCode>--form-gen-solid-background-color</InlineCode>: The background color of solid
          elements like buttons.
        </li>
        <li>
          <InlineCode>--form-gen-solid-hover-background-color</InlineCode>: The background color of
          solid elements when hovered.
        </li>
        <li>
          <InlineCode>--form-gen-solid-text-color</InlineCode>: The text color of solid elements.
        </li>
        <li>
          <InlineCode>--form-gen-field-label-text-color</InlineCode>: The text color of field
          labels.
        </li>
        <li>
          <InlineCode>--form-gen-field-error-text-color</InlineCode>: The text color of error
          messages.
        </li>
        <li>
          <InlineCode>--form-gen-field-description-text-color</InlineCode>: The text color of field
          descriptions.
        </li>
        <li>
          <InlineCode>--form-gen-border-radius</InlineCode>: The border radius of the form elements.
        </li>
      </ul>
      <p>
        Additionally, the form components have predefined classes that can be used to style them.
        These classes are used to apply the default styles and can be overridden to customize the
        appearance of the form components. The classes are as follows:
      </p>
      <ul>
        <li>
          <InlineCode>.formGenComponent-enum</InlineCode>: Used for select elements with enumerated
          values.
        </li>
        <li><InlineCode>.formGenComponent-array</InlineCode>: Used for arrays.</li>
        <li>
          <InlineCode>.formGenComponent-array-item</InlineCode>: Used for individual array items.
        </li>
        <li>
          <InlineCode>.formGenComponent-array-removeButton</InlineCode>: Used for array remove
          buttons.
        </li>
        <li>
          <InlineCode>.formGenComponent-array-addButton</InlineCode>: Used for array add buttons.
        </li>
        <li><InlineCode>.formGenComponent-field</InlineCode>: Used for field containers.</li>
        <li><InlineCode>.formGenComponent-field-label</InlineCode>: Used for field labels.</li>
        <li>
          <InlineCode>.formGenComponent-field-label-required</InlineCode>: Used for labels of
          required fields.
        </li>
        <li><InlineCode>.formGenComponent-field-error</InlineCode>: Used for error messages.</li>
        <li>
          <InlineCode>.formGenComponent-field-description</InlineCode>: Used for field descriptions.
        </li>
        <li><InlineCode>.formGenComponent-number</InlineCode>: Used for numeric input fields.</li>
        <li><InlineCode>.formGenComponent-object</InlineCode>: Used for object containers.</li>
        <li>
          <InlineCode>.formGenComponent-object-subObject</InlineCode>: Used for every object that's
          not the root object.
        </li>
        <li><InlineCode>.formGenComponent-string</InlineCode>: Used for text input fields.</li>
        <li>
          <InlineCode>.formGenComponent-boolean</InlineCode>: Used for boolean (checkbox) inputs.
        </li>
        <li>
          <InlineCode>.formGenComponent-field-boolean-label-row</InlineCode>: Used for fields that
          contain boolean inputs.
        </li>
      </ul>
    </div>
    <div>
      <h2>Create your own components</h2>
      <p>
        First, let's discuss form plans. A form plan is an intermediate representation used to break
        down a form into components. Each section of the form plan represents a component. Some
        sections can contain nested sections, such as arrays or objects. Here is a list of the
        sections:
      </p>
      <ul>
        <li>
          <InlineCode>object</InlineCode>: Represents an object input. It has children
          sections of type <InlineCode>field</InlineCode>.
        </li>
        <li>
          <InlineCode>field</InlineCode>: Responsible for displaying information about a given
          field, such as title, description, and errors. Each field section has a non-field child,
          like a string input or enum input.
        </li>
        <li>
          <InlineCode>array</InlineCode>: Represents an array input. It has a form plan
          describing its elements.
        </li>
        <li><InlineCode>enum</InlineCode>: Represents an input for enumerated values (e.g., radio group, select).</li>
        <li><InlineCode>string</InlineCode>: Describes a text input field.</li>
        <li><InlineCode>number</InlineCode>: Describes a numeric input field.</li>
        <li>
          <InlineCode>boolean</InlineCode>: Describes a boolean (checkbox, switch, ...) input field.
        </li>
      </ul>
      <p>
        Form plans also include additional information, such as the path of each section within the
        form, and section-specific properties. Below is the type definition that fully describes the
        form plan:
      </p>
      <HighlightedCode lang="typescript" :code="formPlanExpanded" />
      <p>Here is how you can create a component for a specific section:</p>
      <HighlightedCode lang="vue" :code="customStringInput" />
      <p>
        Neither the model nor the props are required to be defined. Depending on your
        implementation, you can include or exclude them.
      </p>
      <p>
        In some cases, you have to render the children of the section. For example, if you have an
        object, you have to render the fields of the object. You can do this by using the
        <InlineCode>FormGenChild</InlineCode> component. This component only takes a form plan as a
        prop. Here is an example of how you can use it:
      </p>
      <HighlightedCode lang="vue" :code="customObjectInput" />
      <p>
        Arrays can be more complex to manage due to their variable number of items. To handle
        them, you need to generate form plans dynamically. We provide a utility called
        <InlineCode>useArrayHandler</InlineCode> to assist with this. Here is an example of how you
        can use it:
      </p>
      <HighlightedCode lang="vue" :code="customArrayInput" />
      <p>After you create your components, you have to add them to the configuration:</p>
      <HighlightedCode lang="typescript" :code="componentSetupExample" />
      <p>
        The component collection is just an array of configuration objects. The form
        generator will search in this array for a matching component. The first component that
        matches a given section will be used to render it. Thanks to this behavior, you can also
        partially override the default components by just appending them to your own configuration.
      </p>
      <HighlightedCode lang="typescript" :code="partialComponentCollecionExample" />
      <p>
        You can also provide a second item to the selector, a function that receives the section
        specific form plan, and returns a boolean. Always order your component configurations from
        most specific to least specific. Here is an example of how you can provide a custom field
        for boolean inputs:
      </p>
      <HighlightedCode lang="typescript" :code="targetedSelectorExample" />
      <p>
        For more examples, check out how the
        <a
          href="https://github.com/HRM/VueFormGen/tree/master/packages/form-generator/src/DefaultFormComponents"
          >default components</a
        >
        are implemented. Every utility that is used in the default components is also exported from
        the library so you can use them in your own components.
      </p>
    </div>
    <div>
      <h2>Localization</h2>
      <p>
        There are multiple ways to localize your form. For example, you can provide localized title
        sections for your JSON schema. The library also provides a way to localize your forms. You
        can provide an error translator and a field translator:
      </p>
      <HighlightedCode lang="typescript" :code="setupWithLocalization" />
      <p>
        These functions return the translated string that will be used instead of the default one.
        The error translator will be called with the validation error and the field translator will
        be called with the given field section. For the structure of the validation error, check out
        <a href="https://github.com/tdegrunt/jsonschema?tab=readme-ov-file#results">this</a> section
        in the jsonschema repository. If you want to provide form-specific translations, you can
        also provide them as props on the <InlineCode>FormGen</InlineCode> component under the names
        <InlineCode>error-translator</InlineCode> and <InlineCode>field-translator</InlineCode>. If
        you provide them in both places, the props will be used.
      </p>
    </div>
  </Container>
</template>

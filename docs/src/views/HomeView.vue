<script setup lang="ts">
import Container from '@/components/Container.vue'
import DocTitle from '@/components/DocTitle.vue'
import HighlightedCode from '@/components/HighlightedCode.vue'
import InlineCode from '@/components/InlineCode.vue'
import ExampleEditor from '@/components/ExampleEditor.vue'
import OneLineCode from '@/components/OneLineCode.vue'
import Table from '@/components/Table.vue'
import tryOutExample from '@/assets/jsonExamples/tryOutExample.json?raw'
import setupExample from '@/assets/tsExamples/setup.ts?raw'
import howToUse from '@/assets/vueExample/howToUse.vue?raw'
import formPlanExpanded from '@/assets/tsExamples/formPlanExpanded.ts?raw'
import customStringInput from '@/assets/vueExample/CustomStringInput.vue?raw'
import customObjectInput from '@/assets/vueExample/CusomObjectInput.vue?raw'
import customArrayInput from '@/assets/vueExample/CustomArrayInput.vue?raw'
import componentSetupExample from '@/assets/tsExamples/componentSetup.ts?raw'
import partialComponentCollectionExample from '@/assets/tsExamples/partialComponentCollection.ts?raw'
import targetedSelectorExample from '@/assets/tsExamples/targetedSelector.ts?raw'
import setupWithLocalization from '@/assets/tsExamples/setupWithLocalization.ts?raw'
import SectionTitle from '@/components/SectionTitle.vue'
import TableOfContents from '@/components/TableOfContents.vue'
</script>

<template>
  <Container>
    <DocTitle />
    <div>
      <SectionTitle no-table>Try it out</SectionTitle>
      <ExampleEditor :default-code="tryOutExample" :default-value="{ items: [undefined] }" />
    </div>
    <div>
      <SectionTitle no-table>Table of contents</SectionTitle>
      <TableOfContents />
    </div>
    <div>
      <SectionTitle>Setup</SectionTitle>
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
      <SectionTitle>How to use</SectionTitle>
      <HighlightedCode lang="vue" :code="howToUse" />
      <p>
        The <InlineCode>FormGen</InlineCode> component is the main component of the library. It
        accepts a JSON schema as a prop, which can be provided either as an object or a string. The
        form data is bound using v-model, allowing two-way data binding. The component also exposes
        a function called <InlineCode>validate</InlineCode> that can be used to validate the form
        and returns a boolean indicating whether the form is valid.
      </p>
      <p>The supported data types:</p>
      <Table>
        <thead>
          <tr>
            <th>Data type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>object</td>
            <td></td>
          </tr>
          <tr>
            <td>array</td>
            <td></td>
          </tr>
          <tr>
            <td>string</td>
            <td></td>
          </tr>
          <tr>
            <td>number</td>
            <td></td>
          </tr>
          <tr>
            <td>integer</td>
            <td>it will be converted to a number input</td>
          </tr>
          <tr>
            <td>boolean</td>
            <td></td>
          </tr>
          <tr>
            <td>enum</td>
            <td>trough the enum keyword, only numbers and strings are supported</td>
          </tr>
        </tbody>
      </Table>
      <p>Supported properties for each data type:</p>
      <Table>
        <thead>
          <tr>
            <th>Data type</th>
            <th>Supported properties</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>array</td>
            <td>
              <InlineCode>minItems</InlineCode>,
              <InlineCode>maxItems</InlineCode>
            </td>
          </tr>
          <tr>
            <td>string</td>
            <td>
              <InlineCode>minLength</InlineCode>, <InlineCode>maxLength</InlineCode>,
              <InlineCode>pattern</InlineCode>, <InlineCode>format</InlineCode>
            </td>
          </tr>
          <tr>
            <td>number</td>
            <td>
              <InlineCode>minimum</InlineCode>, <InlineCode>maximum</InlineCode>,
              <InlineCode>multipleOf</InlineCode>
            </td>
          </tr>
        </tbody>
      </Table>
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
      <SectionTitle>Value handling</SectionTitle>
      <p>
        The form data is stored as an object that matches your JSON schema structure. This object
        can contain nested objects and arrays in any combination. When values are missing, we use
        <InlineCode>null</InlineCode>. For non-required properties, we completely remove them from
        the object if they contain null or are empty (nullish).
      </p>
      <p>
        Empty values (nullish) include: objects with no properties, empty arrays, and empty strings.
        We remove these properties recursively - for example, if a nested object only contains
        nullish values, the entire object will be removed from its parent.
      </p>
      <p>For better usability, the form generator provides two helpful behaviors:</p>
      <p>
        First, nested objects are kept initialized. This means only leaf values (like strings or
        numbers) can be optional. This simplifies the form by avoiding scenarios where an optional
        parent object would have required child fields. Which would be harder for the end user to
        interpret and control.
      </p>
      <p>
        Second, boolean fields are treated as required with <InlineCode>false</InlineCode> as their
        default value. This makes sense because UI elements like checkboxes and switches typically
        can't represent an undefined state - they're either checked or unchecked.
      </p>
      <p>
        You can disable these default behaviors by setting
        <InlineCode>initializeObjects: false</InlineCode> and
        <InlineCode>initializeBooleans: false</InlineCode> in the configuration object passed to the
        <InlineCode>createFormGenConfig</InlineCode> function.
      </p>
      <p>
        If you disable the default object behavior, an object will still be created if the user
        enters a value for any of its fields.
      </p>
    </div>
    <div>
      <SectionTitle>Styling</SectionTitle>
      <p>
        The default styles are defined using CSS variables, which can be overridden in your own
        stylesheet to match your application's design.
      </p>
      <p>Here are the CSS variables you can override:</p>
      <Table>
        <thead>
          <tr>
            <th>CSS Variable</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><InlineCode>--form-gen-border-color</InlineCode></td>
            <td>The border color of the form elements.</td>
          </tr>
          <tr>
            <td><InlineCode>--form-gen-required-star-color</InlineCode></td>
            <td>The color of the required field asterisk.</td>
          </tr>
          <tr>
            <td><InlineCode>--form-gen-input-background-color</InlineCode></td>
            <td>The background color of the input fields.</td>
          </tr>
          <tr>
            <td><InlineCode>--form-gen-input-text-color</InlineCode></td>
            <td>The text color of the input fields.</td>
          </tr>
          <tr>
            <td><InlineCode>--form-gen-input-outline-color</InlineCode></td>
            <td>The outline color of the input fields when focused.</td>
          </tr>
          <tr>
            <td><InlineCode>--form-gen-solid-background-color</InlineCode></td>
            <td>The background color of solid elements like buttons.</td>
          </tr>
          <tr>
            <td><InlineCode>--form-gen-solid-hover-background-color</InlineCode></td>
            <td>The background color of solid elements when hovered.</td>
          </tr>
          <tr>
            <td><InlineCode>--form-gen-solid-text-color</InlineCode></td>
            <td>The text color of solid elements.</td>
          </tr>
          <tr>
            <td><InlineCode>--form-gen-field-label-text-color</InlineCode></td>
            <td>The text color of field labels.</td>
          </tr>
          <tr>
            <td><InlineCode>--form-gen-field-error-text-color</InlineCode></td>
            <td>The text color of error messages.</td>
          </tr>
          <tr>
            <td><InlineCode>--form-gen-field-description-text-color</InlineCode></td>
            <td>The text color of field descriptions.</td>
          </tr>
          <tr>
            <td><InlineCode>--form-gen-border-radius</InlineCode></td>
            <td>The border radius of the form elements.</td>
          </tr>
        </tbody>
      </Table>
      <p>
        Additionally, the form components have predefined classes that can be used to style them.
        These classes are used to apply the default styles and can be overridden to customize the
        appearance of the form components. The classes are as follows:
      </p>
      <Table>
        <thead>
          <tr>
            <th>Class</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><InlineCode>.formGenComponent-enum</InlineCode></td>
            <td>Used for select elements with enumerated values.</td>
          </tr>
          <tr>
            <td><InlineCode>.formGenComponent-array</InlineCode></td>
            <td>Used for arrays.</td>
          </tr>
          <tr>
            <td><InlineCode>.formGenComponent-array-item</InlineCode></td>
            <td>Used for individual array items.</td>
          </tr>
          <tr>
            <td><InlineCode>.formGenComponent-array-removeButton</InlineCode></td>
            <td>Used for array remove buttons.</td>
          </tr>
          <tr>
            <td><InlineCode>.formGenComponent-array-addButton</InlineCode></td>
            <td>Used for array add buttons.</td>
          </tr>
          <tr>
            <td><InlineCode>.formGenComponent-field</InlineCode></td>
            <td>Used for field containers.</td>
          </tr>
          <tr>
            <td><InlineCode>.formGenComponent-field-label</InlineCode></td>
            <td>Used for field labels.</td>
          </tr>
          <tr>
            <td><InlineCode>.formGenComponent-field-label-required</InlineCode></td>
            <td>Used for labels of required fields.</td>
          </tr>
          <tr>
            <td><InlineCode>.formGenComponent-field-error</InlineCode></td>
            <td>Used for error messages.</td>
          </tr>
          <tr>
            <td><InlineCode>.formGenComponent-field-description</InlineCode></td>
            <td>Used for field descriptions.</td>
          </tr>
          <tr>
            <td><InlineCode>.formGenComponent-number</InlineCode></td>
            <td>Used for numeric input fields.</td>
          </tr>
          <tr>
            <td><InlineCode>.formGenComponent-object</InlineCode></td>
            <td>Used for object containers.</td>
          </tr>
          <tr>
            <td><InlineCode>.formGenComponent-object-subObject</InlineCode></td>
            <td>Used for every object that's not the root object.</td>
          </tr>
          <tr>
            <td><InlineCode>.formGenComponent-string</InlineCode></td>
            <td>Used for text input fields.</td>
          </tr>
          <tr>
            <td><InlineCode>.formGenComponent-boolean</InlineCode></td>
            <td>Used for boolean (checkbox) inputs.</td>
          </tr>
          <tr>
            <td><InlineCode>.formGenComponent-field-boolean-label-row</InlineCode></td>
            <td>Used for fields that contain boolean inputs.</td>
          </tr>
        </tbody>
      </Table>
    </div>
    <div>
      <SectionTitle>Create your own components</SectionTitle>
      <p>
        First, let's discuss form plans. A form plan is an intermediate representation used to break
        down a form into components. Each section of the form plan represents a component. Some
        sections can contain nested sections, such as arrays or objects. Here is a list of the
        sections:
      </p>
      <Table>
        <thead>
          <tr>
            <th>Section Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><InlineCode>object</InlineCode></td>
            <td>
              Represents an object input. It has children sections of type
              <InlineCode>field</InlineCode>.
            </td>
          </tr>
          <tr>
            <td><InlineCode>field</InlineCode></td>
            <td>
              Responsible for displaying information about a given field, such as title,
              description, and errors. Each field section has a non-field child, like a string input
              or enum input.
            </td>
          </tr>
          <tr>
            <td><InlineCode>array</InlineCode></td>
            <td>Represents an array input. It has a form plan describing its elements.</td>
          </tr>
          <tr>
            <td><InlineCode>enum</InlineCode></td>
            <td>Represents an input for enumerated values (e.g., radio group, select).</td>
          </tr>
          <tr>
            <td><InlineCode>string</InlineCode></td>
            <td>Describes a text input field.</td>
          </tr>
          <tr>
            <td><InlineCode>number</InlineCode></td>
            <td>Describes a numeric input field.</td>
          </tr>
          <tr>
            <td><InlineCode>boolean</InlineCode></td>
            <td>Describes a boolean (checkbox, switch, ...) input field.</td>
          </tr>
        </tbody>
      </Table>
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
        Arrays can be more complex to manage due to their variable number of items. To handle them,
        you need to generate form plans dynamically. We provide a utility called
        <InlineCode>useArrayHandler</InlineCode> to assist with this. Here is an example of how you
        can use it:
      </p>
      <HighlightedCode lang="vue" :code="customArrayInput" />
      <p>After you create your components, you have to add them to the configuration:</p>
      <HighlightedCode lang="typescript" :code="componentSetupExample" />
      <p>
        The component collection is just an array of configuration objects. The form generator will
        search in this array for a matching component. The first component that matches a given
        section will be used to render it. Thanks to this behavior, you can also partially override
        the default components by just appending them to your own configuration.
      </p>
      <HighlightedCode lang="typescript" :code="partialComponentCollectionExample" />
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
      <SectionTitle>Localization</SectionTitle>
      <p>
        There are multiple ways to localize your form. For example, you can provide localized title
        sections for your JSON schema. The library also provides a way to localize your forms. You
        can provide an error translator and a field translator:
      </p>
      <HighlightedCode lang="typescript" :code="setupWithLocalization" />
      <p>
        These functions return the translated strings that will be used instead of the default one.
        The error translator will be called with the validation error and the field translator will
        be called with the given field section. In the field translator you can leave out the title
        and/or the description if you want to leave them untouched. For the structure of the
        validation error, check out
        <a href="https://github.com/tdegrunt/jsonschema?tab=readme-ov-file#results">this</a> section
        in the jsonschema repository.
      </p>
    </div>
    <div>
      <SectionTitle>Configuration</SectionTitle>
      <p>
        These are the properties of the configuration object provided to the
        <InlineCode>createFormGenConfig</InlineCode> function:
      </p>
      <Table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Default Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><InlineCode>components</InlineCode></td>
            <td>defaultComponentCollection</td>
            <td>An array of form component entries used to render the form sections.</td>
          </tr>
          <tr>
            <td><InlineCode>initializeBooleans</InlineCode></td>
            <td>true</td>
            <td>
              Determines if boolean fields should be initialized with
              <InlineCode>false</InlineCode>.
            </td>
          </tr>
          <tr>
            <td><InlineCode>initializeObjects</InlineCode></td>
            <td>true</td>
            <td>Determines if nested objects should be initialized.</td>
          </tr>
          <tr>
            <td><InlineCode>fieldTranslator</InlineCode></td>
            <td>undefined</td>
            <td>An optional function to translate field labels and descriptions.</td>
          </tr>
          <tr>
            <td><InlineCode>errorTranslator</InlineCode></td>
            <td>undefined</td>
            <td>An optional function to translate validation error messages.</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </Container>
</template>

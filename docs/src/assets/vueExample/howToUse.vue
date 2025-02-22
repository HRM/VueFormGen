<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { FormGen, type FormGenRef } from 'vue-form-gen';

const schmema = {  
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "number" },
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "itemName": { "type": "string" },
          "itemPrice": { "type": "number" }
        }
      }
    }
  },
  "required": ["name", "age"]
};

const value = ref({});

const formGen = useTemplateRef<FormGenRef>('formGen');

</script>
<template>
    <FormGen :schema="schmema" v-model="value" ref="formGen" />
    <button @click="formGen?.validate()">Validate</button>
</template>
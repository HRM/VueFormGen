<template>
  <input
    :id="id"
    :type="inputType"
    v-model="model"
    :minlength="prop.formPlan.props.minLength"
    :maxlength="prop.formPlan.props.maxLength"
    :pattern="prop.formPlan.props.pattern"
    class="formGenComponent-string"
  />
</template>
<script setup lang="ts">
import { computed, inject, onUpdated, type InputTypeHTMLAttribute, type Ref } from "vue";
import type { FormGenComponentProps, FormGenComponentValue } from "../types";
const model = defineModel<FormGenComponentValue<"string">>();
const prop = defineProps<FormGenComponentProps<"string">>();
const id = inject("fieldId", "");
const inputType: Ref<InputTypeHTMLAttribute> = computed(() => {
  switch (prop.formPlan.props.format) {
    case "email":
      return "email";
    case "password":
      return "password";
    case "tel":
      return "tel";
    case "uri":
      return "url";
    case "date":
      return "date";
    case "time":
      return "time";
    case "date-time":
      return "datetime-local";
    default:
      return "text";
  }
});
</script>

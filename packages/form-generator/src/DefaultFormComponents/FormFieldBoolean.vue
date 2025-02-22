<template>
  <div class="formGenComponent-field">
    <div class="formGenComponent-field-boolean-label-row">
    <FormGenChild :form-plan="props.formPlan.child" />
    <label
      :for="fieldFor"
      class="formGenComponent-field-label"
      :class="{
        'formGenComponent-field-label-required': props.formPlan.props.required,
      }"
      >{{ props.formPlan.props.title }}</label
    >
  </div>
    <div class="formGenComponent-field-error" v-if="props.errors.length">
      {{ errors.join(" ") }}
    </div>
    <div
      class="formGenComponent-field-description"
      v-if="props.formPlan.props.description"
    >
      {{ props.formPlan.props.description }}
    </div>
  </div>
</template>
<script setup lang="ts">
import FormGenChild from "../FormGenChild";
import { provide } from "vue";
import type { FormGenComponentProps } from "../types";
import { randomId } from "../util/randomId";
const props = defineProps<FormGenComponentProps<"field">>();
const fieldFor = randomId(15);
provide("fieldId", fieldFor);
</script>

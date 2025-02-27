<template>
  <div class="formGenComponent-field">
    <FormGenChild :form-plan="props.formPlan.child" />
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
import type { FormGenComponentProps } from "../types";
const props = defineProps<FormGenComponentProps<"field">>();
</script>

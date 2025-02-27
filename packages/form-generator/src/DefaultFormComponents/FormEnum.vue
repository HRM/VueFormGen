<template>
  <select :id="id" v-model="model" class="formGenComponent-enum">
    <option
      v-if="!props.formPlan.props.required"
      :value="null"
    >-</option>
    <option v-for="option in props.formPlan.props.values" :value="option">
      {{ typeof option == "string" ? convertName(option) : option }}
    </option>
  </select>
</template>
<script setup lang="ts">
import { inject } from "vue";
import type { FormGenComponentProps, FormGenComponentValue } from "../types";
import { convertName } from "../util/convertName";
const props = defineProps<FormGenComponentProps<"enum">>();
const model = defineModel<FormGenComponentValue<"enum">>();
const id = inject("fieldId", "");
</script>

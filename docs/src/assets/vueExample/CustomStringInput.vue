<template>
  <input
    v-model="model"
    :minlength="props.formPlan.props.minLength"
    :maxlength="props.formPlan.props.maxLength"
    :pattern="props.formPlan.props.pattern"
  />
</template>
<script setup lang="ts">
import type { FormGenComponentProps, FormGenComponentValue } from 'vue-form-gen'
const model = defineModel<FormGenComponentValue<'string'>>()
const props = defineProps<FormGenComponentProps<'string'>>()
</script>

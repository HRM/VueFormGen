<template>
  <div>
    <FormGenChild
      v-for="(child, index) in props.formPlan.children"
      :form-plan="child"
      :key="index"
    />
  </div>
</template>
<script setup lang="ts">
import FormGenChild from 'vue-form-gen'
import type { FormGenComponentProps } from 'vue-form-gen'
const props = defineProps<FormGenComponentProps<'object'>>()
</script>

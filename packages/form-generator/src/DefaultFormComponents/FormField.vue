<template>
  <div class="formGenComponent-field">
    <label
      :for="fieldFor"
      class="formGenComponent-field-label"
      :class="{
        'formGenComponent-field-label-required':
          props.formPlan.props.required &&
          (props.formPlan.child.section !== 'object' || !config.initializeObjects),
      }"
      >{{ props.formPlan.props.title }}</label
    >
    <FormGenChild :form-plan="props.formPlan.child" />
    <div class="formGenComponent-field-error" v-if="props.errors.length">
      {{ errors.join(' ') }}
    </div>
    <div class="formGenComponent-field-description" v-if="props.formPlan.props.description">
      {{ props.formPlan.props.description }}
    </div>
  </div>
</template>
<script setup lang="ts">
import FormGenChild from '../FormGenChild'
import { provide } from 'vue'
import type { FormGenComponentProps } from '../types'
import { randomId } from '../util/randomId'
import { useFormGenConfig } from '../util/use'
const props = defineProps<FormGenComponentProps<'field'>>()
const config = useFormGenConfig()
const fieldFor = randomId(15)
provide('fieldId', fieldFor)
</script>

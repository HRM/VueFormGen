<template>
    <div class="formGenComponent-field" :class="{'formGenComponent-field-required':props.formPlan.props.required}">
        <label :for="fieldFor">{{ props.formPlan.props.title }}</label>
        <FormGenChild :form-plan="props.formPlan.child"/>
    </div>
</template>
<script setup lang="ts">
import { FormGenChild, randomId, type FormGenComponentProps } from '@vue-form-gen/form-generator';
import { provide } from 'vue';
const props = defineProps<FormGenComponentProps<'field'>>()
const fieldFor = randomId(15);
provide('fieldId', fieldFor);
</script>
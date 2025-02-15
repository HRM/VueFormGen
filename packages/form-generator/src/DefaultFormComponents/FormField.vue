<template>
    <div class="formGenComponent-field" :class="{'formGenComponent-field-required':props.formPlan.props.required}">
        <label :for="fieldFor">{{ props.formPlan.props.title }}</label>
        <FormGenChild :form-plan="props.formPlan.child"/>
        <span class="formGenComponent-field-error" v-if="props.errors.length">{{ errors.join(" ") }}</span>
    </div>
</template>
<script setup lang="ts">
import FormGenChild from '../FormGenChild';
import { provide } from 'vue';
import type { FormGenComponentProps } from '../types';
import { randomId } from '../util/randomId';
const props = defineProps<FormGenComponentProps<'field'>>()
const fieldFor = randomId(15);
provide('fieldId', fieldFor);
</script>
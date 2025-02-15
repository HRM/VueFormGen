<template>
    <input :id="id" type="number" v-model="model" class="formGenComponent-number" 
        :min="props.formPlan.props.minimum"
        :max="props.formPlan.props.maximum"
        :step="props.formPlan.props.multipleOf"
        />
</template>
<script setup lang="ts">
import { inject } from 'vue';
import type { FormGenComponentProps, FormGenComponentValue } from '../types';
const model = defineModel<FormGenComponentValue<'number'>>();
const props = defineProps<FormGenComponentProps<'number'>>();
const id = inject('fieldId','');
</script>
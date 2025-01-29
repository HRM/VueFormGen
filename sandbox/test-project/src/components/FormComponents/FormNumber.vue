<template>
    <input :id="id" type="number" v-model="model" class="formGenComponent-number" 
        :min="props.formPlan.props.minimum"
        :max="props.formPlan.props.maximum"
        :step="props.formPlan.props.multipleOf"
        />
</template>
<script setup lang="ts">
import type { FormGenComponentProps, FormGenComponentValue } from '@vue-form-gen/form-generator';
import { inject } from 'vue';
const model = defineModel<FormGenComponentValue<'number'>>();
const props = defineProps<FormGenComponentProps<'number'>>();
const id = inject('fieldId','');
</script>
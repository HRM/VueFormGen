<template>
    <select :id="id" v-model="model" class="formGenComponent-enum">
        <option v-for="option in props.formPlan.props.values" :value="option">{{ option }}</option>
    </select>
</template>
<script setup lang="ts">
import type { FormGenComponentProps, FormGenComponentValue } from '@vue-form-gen/form-generator';
import { inject } from 'vue';
const props = defineProps<FormGenComponentProps<'enum'>>();
const model = defineModel<FormGenComponentValue<'enum'>>();
const id = inject('fieldId','');
</script>
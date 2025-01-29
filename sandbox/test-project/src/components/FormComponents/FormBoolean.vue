<template>
    <input class="formGenComponent-boolean" :id="id" type="checkbox" v-model="model" />
</template>
<script setup lang="ts">
import type { FormGenComponentValue } from '@vue-form-gen/form-generator';
import { inject } from 'vue';
const model = defineModel<FormGenComponentValue<'boolean'>>();
const id = inject('fieldId','');
</script>
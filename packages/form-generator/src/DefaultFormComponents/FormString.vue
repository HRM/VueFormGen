<template>
    <input :id="id" type="text" v-model="model" class="formGenComponent-string" />
</template>
<script setup lang="ts">
import { inject, onUpdated } from 'vue';
import type { FormGenComponentValue } from '../types';
const model = defineModel<FormGenComponentValue<'string'>>()
const id = inject('fieldId','');
</script>
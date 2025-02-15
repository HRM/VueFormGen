<template>
    <input class="formGenComponent-boolean" :id="id" type="checkbox" v-model="model" />
</template>
<script setup lang="ts">
import { inject } from 'vue';
import type { FormGenComponentValue } from '../types';
const model = defineModel<FormGenComponentValue<'boolean'>>();
const id = inject('fieldId','');
</script>
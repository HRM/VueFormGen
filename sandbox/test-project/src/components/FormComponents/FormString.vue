<template>
    <input :id="id" type="text" v-model="model" class="formGenComponent-string" />
</template>
<script setup lang="ts">
import type { FormGenComponentValue } from '@vue-form-gen/form-generator';
import { inject, onUpdated } from 'vue';
const model = defineModel<FormGenComponentValue<'string'>>()
onUpdated(()=>{
    console.log("updated",model.value);
})
const id = inject('fieldId','');
</script>
<template>
    <div class="formGenComponent-array">
        <div class="formGenComponent-array-item" v-for="(item,index) in arrayProps" :key="item.key">
            <FormGenChild :form-plan="item.formPlan" />
            <button class="formGenComponent-array-removeButton" @click="shrinkArray(index)">-</button>
        </div>
        <button @click="expandArray" class="formGenComponent-array-addButton">+</button>
    </div>
</template>
<script setup lang="ts">
import { FormGenChild, useArrayHandler, type FormGenComponentProps, type FormGenComponentValue } from '@vue-form-gen/form-generator';
import { toRaw, watch } from 'vue';

const props = defineProps<FormGenComponentProps<'array'>>();
const model = defineModel<FormGenComponentValue<'array'>>({required:true});
const {arrayProps,expandArray,shrinkArray} = useArrayHandler(model, props);
// watch(arrayProps,(value)=>{
//     console.log(toRaw(value));
// })
</script>
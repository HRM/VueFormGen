<template>
    <div class="formGenComponent-array">
        <div class="formGenComponent-array-item" v-for="(item,index) in childPlans" :key="index">
            <FormGenChild :form-plan="item" />
            <button class="formGenComponent-array-removeButton" @click="shrinkArray(index)"><SubtractIcon/></button>
        </div>
        <button @click="expandArray" class="formGenComponent-array-addButton">
            <AddIcon />
        </button>
    </div>
</template>
<script setup lang="ts">
import FormGenChild from '../FormGenChild';
import AddIcon from './assets/AddIcon.vue';
import SubtractIcon from './assets/SubtractIcon.vue';
import type { FormGenComponentProps, FormGenComponentValue } from '../types';
import { useArrayHandler } from '../util/useArrayHandler';
const props = defineProps<FormGenComponentProps<'array'>>();
const model = defineModel<FormGenComponentValue<'array'>>({required:true});
const {childPlans,expandArray,shrinkArray} = useArrayHandler(model, props);
</script>
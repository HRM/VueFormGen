<template>
    <div class="formGenComponent-array">
        <div class="formGenComponent-array-item" v-for="(item,index) in childPlans" :key="index">
            <FormGenChild :form-plan="item" />
            <button class="formGenComponent-array-removeButton" @click="shrinkArray(index)">-</button>
        </div>
        <button @click="expandArray" class="formGenComponent-array-addButton">+</button>
    </div>
</template>
<script setup lang="ts">
import FormGenChild from '../FormGenChild';
import type { FormGenComponentProps, FormGenComponentValue } from '../types';
import { useArrayHandler } from '../util/useArrayHandler';
const props = defineProps<FormGenComponentProps<'array'>>();
const model = defineModel<FormGenComponentValue<'array'>>({required:true});
const {childPlans,expandArray,shrinkArray} = useArrayHandler(model, props);
</script>
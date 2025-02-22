<template>
    <div>
        <div v-for="(item,index) in childPlans" :key="index">
            <FormGenChild :form-plan="item" />
            <button @click="shrinkArray(index)">
                -
            </button>
        </div>
        <button @click="expandArray">
            +
        </button>
    </div>
</template>
<script setup lang="ts">
import {FormGenChild, useArrayHandler} from 'vue-form-gen';
import type { FormGenComponentProps, FormGenComponentValue } from 'vue-form-gen';
const props = defineProps<FormGenComponentProps<'array'>>();
const model = defineModel<FormGenComponentValue<'array'>>({required:true});
const {childPlans,expandArray,shrinkArray} = useArrayHandler(model, props);
</script>
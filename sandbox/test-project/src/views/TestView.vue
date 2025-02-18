<template>
    <div class="wrapper">
        <h2>
            Test Form
        </h2>
        <FormGen v-model="obj" :schema="schema" ref="form-gen"/>
        <button @click="formGenRef?.validate()">Validate</button>
    </div>
</template>
<script setup lang="ts">
import { FormGen, type FormGenRef } from 'vue-form-gen';
import type { JSONSchema4 } from 'json-schema';
import { ref, toRaw, useTemplateRef, watch} from 'vue';

const obj = ref({});
watch(obj,(value)=>{
    console.log(toRaw(value));
})
const schema: any = {
    type:'object',
    properties:{
        test1:{type:'string',minLength:5},
        test2:{type:'number'},
        test3:{enum:["test1","test2"]},
        test4:{type:'object', properties:{
            test1:{type:"string"},
            test2:{type:"number", maximum:0}
        }},
        test6:{type:'array', items:{type:'string'}}
    },
    required:['test1','test5']
};
const formGenRef = useTemplateRef<FormGenRef>('form-gen');

</script>
<style lang="css" scoped>
    .wrapper{
        display: flex;
        flex-direction: column;
        gap: 5px;
        max-width: 500px;
    }
</style>
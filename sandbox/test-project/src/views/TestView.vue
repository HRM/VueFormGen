<template>
    <div class="wrapper">
        <h2>
            Test Form
        </h2>
        <FormGen v-model="obj" :form-plan="plan" />
    </div>
</template>
<script setup lang="ts">
import { FormGen, jsonSchemaToFormPlan } from '@vue-form-gen/form-generator';
import { ref, toRaw, watch} from 'vue';

const obj = ref({});
watch(obj,(value)=>{
    console.log(toRaw(value));
})
const plan = jsonSchemaToFormPlan({
    type:'object',
    properties:{
        test1:{type:'string'},
        test2:{type:'number'},
        test3:{enum:["test1","test2"]},
        test4:{type:'object', properties:{
            test1:{type:"string"},
            test2:{type:"number", maximum:0}
        }},
        test5:{type:'array', items:{type:'string'}}
    }
})

</script>
<style lang="css" scoped>
    .wrapper{
        display: flex;
        flex-direction: column;
        gap: 5px;
        max-width: 500px;
    }
</style>
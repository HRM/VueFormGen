<template>
    <div class="formGenComponent-object" :class="{'formGenComponent-object-subObject':props.formPlan.path.length>0}">
        <FormGenChild v-for="(child,index) in props.formPlan.children" :form-plan="child" :key="index" />
    </div>
</template>
<script setup lang="ts">
import FormGenChild from '../FormGenChild';
import type { FormGenComponentProps } from '../types';
const props = defineProps<FormGenComponentProps<'object'>>();
</script>
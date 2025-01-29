<template>
    <div class="formGenComponent-object" :class="{'formGenComponent-object-subObject':props.formPlan.path.length>0}">
        <FormGenChild v-for="(child,index) in props.formPlan.children" :form-plan="child" :key="index" />
    </div>
</template>
<script setup lang="ts">
import { FormGenChild, type FormGenComponentProps} from '@vue-form-gen/form-generator';
const props = defineProps<FormGenComponentProps<'object'>>();
</script>
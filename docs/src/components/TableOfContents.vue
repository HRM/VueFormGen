<template>
<a v-for="content in tableContents.contents" :key="content.id" :href="'#' + content.id">
    {{ content.title }}
</a>
</template>
<script setup lang="ts">
import { useTableOfContents } from '@/stores/tableOfContents';
const tableContents = useTableOfContents();
</script>
<style lang="scss" scoped>
a {
    display: block;
    &:not(:first-child) {
        margin-top: var(--space-1);
    }
}
</style>
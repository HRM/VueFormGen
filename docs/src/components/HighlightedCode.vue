<script setup lang="ts">
import { highlighter } from '@/util/shiki'
const props = defineProps<{
  code: string
  lang: string
}>()
const highlightedCode = highlighter.codeToHtml(props.code, {
  lang: props.lang,
  theme: 'one-dark-pro',
})
</script>
<template>
    <div class="code-highlighted" v-html="highlightedCode"></div>
</template>
<style scoped lang="css">
.code-highlighted > *{
    border-radius: var(--border-radius);
    padding: var(--space-2);
    margin: 0;
}
</style>

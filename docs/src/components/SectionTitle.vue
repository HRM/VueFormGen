<template>
  <h2 :id="id">
    {{ child }}
  </h2>
</template>
<script setup lang="ts">
import { useTableOfContents } from '@/stores/tableOfContents'
import { onBeforeMount, onUnmounted } from 'vue'

const tableContents = useTableOfContents()
const slots = defineSlots()
const child = slots.default()[0].children
if (typeof child !== 'string') {
  throw new Error('SectionTitle must have a string child')
}
const id = child.replace(/ +/g, '').toLowerCase()

const props = defineProps<{
  noTable?: boolean
}>()

if (!props.noTable) {
  onBeforeMount(() => {
    tableContents.addContent(child, id)
  })
  onUnmounted(() => {
    tableContents.removeContent(id)
  })
}
</script>

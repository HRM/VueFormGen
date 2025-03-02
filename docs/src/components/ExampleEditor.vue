<template>
  <div class="holder">
    <JsonEditor v-model="code" class="editor" />
    <div class="display-holder">
      <div class="display">
        <FormGen :schema="jsonObj" v-model="value" ref="form-gen" />
      </div>
      <button class="validate-button" @click="formGen?.validate()">Validate</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { FormGen} from 'vue-form-gen'
import JsonEditor from '@/components/JsonEditor.vue'

const formGen = useTemplateRef('form-gen')

const props = defineProps<{
  defaultCode?: object | string
  defaultValue?: object
}>()

const value = ref(props.defaultValue ?? {})

const defaultCodeConverted =
  typeof props.defaultCode === 'object'
    ? JSON.stringify(props.defaultCode ?? {}, null, 2)
    : (props.defaultCode ?? '{}')

const code = ref(defaultCodeConverted)
const jsonObj = computed(() => {
  try {
    return JSON.parse(code.value)
  } catch (e) {
    return {}
  }
})
</script>
<style lang="css" scoped>
.holder {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: var(--space-2);
  height: 450px;
}
@media screen and (max-width: 768px) {
  .holder {
    flex-direction: column;
    height: 800px;
  }
  .display-holder {
    flex: 1 1 0px !important;
    height: 0;
  }
  .editor {
    flex: 1 1 0px !important;
    height: 0;
  }
}
.display-holder {
  flex: 8 1 0px;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.display {
  height: 0;
  flex-grow: 1;
  border-radius: var(--border-radius);
  background-color: var(--sheet-background-color);
  overflow-x: auto;
}
.display::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
}
.display::-webkit-scrollbar-thumb {
  background: var(--display-scroll-color);
  border-radius: 0.5rem;
}
.display::-webkit-scrollbar-thumb:hover {
  background: var(--display-scroll-hover-color);
}
.display::-webkit-scrollbar-track {
  background: transparent;
}
.display::-webkit-scrollbar-corner {
  background: transparent;
}
.editor {
  overflow: hidden;
  border-radius: var(--border-radius);
  flex: 10 1 0px;
}
.validate-button {
  padding: 6px;
  border-radius: var(--border-radius);
  background-color: var(--form-gen-solid-background-color);
  color: var(--form-gen-solid-text-color);
  border: none;
  cursor: pointer;
  font-size: inherit;
  transition: background-color 0.3s;
}

.validate-button:hover {
  background-color: var(--form-gen-solid-hover-background-color);
}
</style>

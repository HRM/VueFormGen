<template>
  <div>
    <div class="holder">
    <h1 class="doc-title">Vue Form Gen</h1>
    <div>
      <a v-html="github" href="https://github.com/HRM/VueFormGen"/> 
      <a v-html="npm" href="https://www.npmjs.com/package/vue-form-gen"/>
    </div>
    </div>
    <p>Generate forms from JSON schema with Vue 3.</p>
  </div>
</template>
<style lang="scss" scoped>
.doc-title {
  font-size: 2.5rem;
}
.holder {
  display: flex;
  justify-content: space-between;
  align-items: center;
  div{
    display: flex;
    gap: 1rem;
  }
}
</style>
<script setup lang="ts">
import github from '@/assets/icons/github.svg?raw';
import npm from '@/assets/icons/npm.svg?raw';
</script>

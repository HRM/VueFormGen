<template>
    <code class="oneline-code">
        <slot></slot>
    </code>
</template>
<style scoped lang="css">
.oneline-code{
  padding: var(--space-2);
  border-radius: var(--border-radius);
  background-color: var(--code-background-color);
  color: var(--code-text-color);
  display: block;
}
</style>
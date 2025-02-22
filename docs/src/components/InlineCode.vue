<template>
    <span class="inline-code">
        <slot></slot>
    </span>
</template>
<style lang="css" scoped>
.inline-code{
    font-family: var(--font-code);
    font-weight: bold;
    white-space: nowrap;
    font-size: var(--code-font-size);
}
</style>
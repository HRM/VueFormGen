<template>
    <div class="container">
        <slot></slot>
    </div>
</template>
<style lang="css" scoped>
    .container{
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        padding-top: var(--space-4);
        padding-bottom: var(--space-4);
        padding-left: var(--space-2);
        padding-right: var(--space-2);
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
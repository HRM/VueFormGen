<template>
    <table>
        <slot/>
    </table>
</template>
<style lang="scss" scoped>
table {
    margin-top: var(--space-3);
    margin-bottom: var(--space-3);
    border-collapse: collapse;
    width: 100%;
    :deep(th) {
        text-align: left;
        font-weight:lighter;
        font-size: inherit;
        border-bottom: 1px solid var(--border-color);
    }
    :deep(tr:not(:last-child)>td){
        border-bottom: 1px solid var(--border-color);
    }
    :deep(tbody tr:hover) {
        background-color: var(--table-hover-color);
    }
    :deep(td) {
        padding: var(--space-2);
        min-width: 8rem;
    }
    :deep(th) {
        padding: var(--space-1);
        padding-left: var(--space-2);
        padding-right: var(--space-2);
    }
}

</style>
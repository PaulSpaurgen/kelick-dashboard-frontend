<script lang="ts">
    export let title: string;
</script>

<div class="flex items-center justify-between w-full px-[32px] py-[26px] bg-white border-b-[1px] border-border">
    <h1 class="text-3xl font-bold text-black">{title}</h1>
    {#if $$slots.actions}
        <div class="flex items-center gap-[16px]">
            <slot name="actions" />
        </div>
    {/if}
</div>


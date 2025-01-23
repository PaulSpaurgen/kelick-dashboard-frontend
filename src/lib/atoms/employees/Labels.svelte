<script lang="ts">
    export let labels: string[] = [];
    export let colors: string[] = [];
    export let actualValues: number[] = [];
</script>

<div class="flex gap-4 flex-wrap">
    {#each labels as label, index}
        <div class="flex items-center gap-2">
            <div class="w-[4px] h-[16px] rounded-2xl" style="background-color: {colors[index]}"></div>
            <span class="text-sm font-semibold text-black">{actualValues[index]}</span>
            <span class="text-sm text-gray-600">{label}</span>
        </div>
    {/each}
</div>

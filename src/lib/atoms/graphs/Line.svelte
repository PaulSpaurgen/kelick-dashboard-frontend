<script lang="ts">
    import { onMount } from 'svelte';
    import { graphColors } from "$lib/utills/constants/CSS";
    import Labels from "$lib/atoms/employees/Labels.svelte";

    export let values: number[] = [25, 25, 25, 25];
    export let labels: string[] = ['Full Time', 'Part Time', 'Contract', 'Intern'];
    export let actualValues: number[] = [25, 10, 5, 6];

    let isVisible = false;
    const colors = [graphColors.green, graphColors.purple, graphColors.yellow, graphColors.gray];
    
    onMount(() => {
        setTimeout(() => {
            isVisible = true;
        }, 0);
    });
</script>

<div class="flex flex-col w-full h-full justify-between">
    <div class="flex gap-[4px] w-full h-[8px] rounded-full overflow-hidden">
        {#each values as value, index}
            <div 
                class="rounded-full transition-[width] duration-1000 ease-in-out"
                style="width: {isVisible ? value : 0}%; background-color: {colors[index]}; transition-delay: {index * 100}ms"
            ></div>
        {/each}
    </div>
    
    <!-- Labels -->
    <div class="mt-[16px] flex flex-col w-full h-full ">
        <Labels labels={labels} colors={colors} actualValues={actualValues} />
    </div>
</div>


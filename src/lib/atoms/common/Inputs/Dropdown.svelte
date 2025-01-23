<script lang="ts">
    import { staticImages } from '$lib/utills/constants/staticImages';

    export let title: string;
    export let options: Array<{
        text: string;
        value: string;
        icon?: string;
    }>;
    export let value: string;
    export let onChange: (value: string) => void;
    export let style: string;

    let isExpanded = false;

    function handleSelect(option: {text: string, value: string}) {
        value = option.value;
        onChange(option.value);
        isExpanded = false;
    }
</script>

<div class="nav-dropdown relative {style} w-full">
    <button 
        class="w-full flex items-center justify-between px-[10px] py-[8px] font-bold rounded-2xl bg-transparent border border-[#E5E7E7]"
        on:click={() => isExpanded = !isExpanded}
    >
        <p class="text-[14px] text-[#2D3232] font-semibold w-fit">
            {options.find(opt => opt.value === value)?.text || title}
        </p>
        <img 
            src={staticImages.dropdownArrow} 
            alt="expand"
            class="w-[24px] h-[24px] transition-transform duration-300 {isExpanded ? 'rotate-180' : ''}"
        />
    </button>
    <div 
        class="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E7E7] rounded-xl overflow-hidden transition-all duration-500 ease-in-out z-10"
        class:hidden={!isExpanded}
    >
        <div class="max-h-[400px] overflow-y-auto w-full scrollbar-thin scrollbar-thumb-[#E5E7E7] scrollbar-track-transparent">
            {#each options as option}
                <button
                    class="w-full flex  gap-2 px-[16px] py-[10px] hover:bg-[#F5F5F5] transition-colors border-b border-[#E5E7E7]"
                    on:click={() => handleSelect(option)}
                >
                    {#if option.icon}
                        <img src={option.icon} alt={option.text} class="w-[20px] h-[20px]" />
                    {/if}
                    <span class="text-[14px] text-[#2D3232]">{option.text}</span>
                </button>
            {/each}
        </div>
    </div>
</div>

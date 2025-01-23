<script lang="ts">
    import NavElement from './NavElement.svelte';
    import { staticImages } from '$lib/utills/constants/staticImages';

    export let title: string;
    export let navElements: Array<{
        icon: string;
        text: string;
        url: string;
        isActive: boolean;
    }>;

    let isExpanded = false;
</script>

<div class="nav-dropdown">
    <button 
        class="w-full flex items-center justify-between px-[16px] py-[10px] font-bold rounded-xl"
        on:click={() => isExpanded = !isExpanded}
    >
        <p class="text-[16px] text-[#7A8484] tracking-[2px] uppercase">{title}</p>
        <img 
            src={staticImages.dropdownArrow} 
            alt="expand"
            class="w-[24px] h-[24px] transition-transform duration-300 {isExpanded ? 'rotate-180' : ''}"
        />
    </button>
    <div class="flex flex-col gap-[12px] pl-[16px] overflow-hidden transition-all  duration-500 ease-in-out {isExpanded ? 'max-h-[500px]' : 'max-h-0'}">
        {#each navElements as element}
        <a href={element.url}>
            <NavElement
                icon={element.icon}
                text={element.text}
                isActive={element.isActive}
            />
            </a>
        {/each}
    </div>
</div>
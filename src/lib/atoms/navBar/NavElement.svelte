<script lang="ts">

    export let icon: string;
    export let text: string;
    export let isActive: boolean;

</script>

<div class="flex items-center gap-[10px] rounded-xl py-[10px]  px-[16px] hover:bg-backgroundHover cursor-pointer text-[16px] font-medium 
              {isActive ? 'bg-backgroundHover border-[1px] border-borderActive font-semibold' : ''}">
    <img src={icon} alt={text} class="w-[24px] h-[24px]" />
    <p class="{isActive ? 'text-text-active' : 'text-text-inactive'}">{text}</p>
</div>
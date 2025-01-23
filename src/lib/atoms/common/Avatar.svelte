<script lang="ts">
    export let name: string;
    export let email: string | null = null;
    export let image: string | null = null;
    export let variant: 'primary' | 'outline' = 'primary';


    const primaryStyle = 'bg-primary text-white';
    const outlineStyle = 'bg-white border border-black text-black';

    // Function to get initials from name
    function getInitials(name: string): string {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase();
    }

    $: initials = getInitials(name);
</script>

<div class="flex items-center gap-[12px]">
    {#if image}
        <img 
            src={image} 
            alt={name} 
            class="w-[40px] h-[40px] rounded-full object-cover"
        />
    {:else}
        <div class="w-[40px] h-[40px] rounded-full {variant === 'primary' ? primaryStyle : outlineStyle} flex items-center justify-center text-[16px] font-medium">
            {initials}
        </div>
    {/if}
    <div class="flex flex-col">
        <span class="text-[14px] font-medium text-text-active">{name}</span>
        <span class="text-[12px] text-text-inactive">{email}</span>
    </div>
</div>

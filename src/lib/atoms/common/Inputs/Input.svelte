<script lang="ts">
    export let value: string = "";
    export let onChange: (value: string) => void;
    export let icon: string | undefined = undefined;
    export let placeholder: string = "";
    export let style: string = "";

    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        value = target.value;
        onChange(target.value);
    }
</script>

<div class="relative w-full">
    <input
        type="text"
        {value}
        on:input={handleInput}
        class="w-full px-[10px] py-[8px] font-medium text-[14px] text-[#2D3232] rounded-2xl border border-[#E5E7E7] outline-none focus:border-[#2D3232] transition-colors {icon
            ? 'pl-[36px]'
            : ''} {style}"
        placeholder={placeholder}
    />
    {#if icon}
        <img
            src={icon}
            alt="input icon"
            class="absolute left-[10px] top-1/2 -translate-y-1/2 w-[20px] h-[20px]"
        />
    {/if}
</div>

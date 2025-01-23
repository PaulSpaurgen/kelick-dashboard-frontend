<script lang="ts">
  export let variant: 'primary' | 'outline' = 'primary';
  export let icon: string | undefined = undefined;
  export let type: 'button' | 'submit' = 'button';
  export let disabled = false;
  export let style: string | undefined = undefined;

  const variantClasses = {
    primary: 'bg-primary text-white hover:opacity-90',
    outline: 'border border-border bg-background text-black hover:bg-backgroundHover'
  };
</script>

<button
  {type}
  {disabled}
  class="inline-flex items-center justify-center px-4 py-2 rounded-xl font-[16px] font-semibold transition-colors {variantClasses[variant]} {style}"
  on:click
>
  {#if icon}
    <img src={icon} alt="" class="w-5 h-5 {$$slots.default ? 'mr-2' : ''}" />
  {/if}
  <slot />
</button>


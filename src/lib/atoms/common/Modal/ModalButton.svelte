<script lang="ts">
    import Button from "$lib/atoms/common/Inputs/Button.svelte";

    export let id: string;
    export let variant: "primary" | "outline" = "primary";
    export let type: "cancel" | "open" = "open";
    export let icon: string | undefined = undefined;
    export let disabled: boolean = false;
</script>

<Button
    {variant}
    {icon}
    {disabled}
    on:click={() => {
        const modal = document.getElementById(id) as HTMLDialogElement;
        if (modal) {
            if(type === "cancel"){
                modal.close();
            }else{
                modal.showModal();
            }
        }
    }}
>
    <slot />
</Button>

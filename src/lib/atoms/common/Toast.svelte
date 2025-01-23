<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    export let message: string;
    export let variant: 'primary' | 'outline' = 'primary';
    export let onClose: () => void;

    let visible = true;

    onMount(() => {
        const timer = setTimeout(() => {
            visible = false;
            onClose();
        }, 10000);

        return () => clearTimeout(timer);
    });

    const handleClose = () => {
        visible = false;
        onClose();
    };
</script>

{#if visible}
    <div
        transition:fade
        class="fixed bottom-4 right-1/2 translate-x-1/2 p-4 rounded-2xl shadow-lg flex items-center z-50 gap-3 {
            variant === 'primary' 
                ? 'bg-primary text-white' 
                : 'bg-white border border-black text-black'
        }"
    >
        <span class="text-sm font-medium">{message}</span>
        <button
            on:click={handleClose}
            class="hover:opacity-80 transition-opacity"
            aria-label="Close toast"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>
    </div>
{/if}

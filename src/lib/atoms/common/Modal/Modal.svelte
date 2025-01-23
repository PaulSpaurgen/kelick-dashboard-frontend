<script lang="ts">
    export let id: string;
    export let title: string;
    export let width: string = 'w-12/12 max-w-[600px]';
</script>

<dialog {id} class="modal modal-middle">
    <div class="modal-box bg-white rounded-[16px] p-[24px] {width}">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="text-lg font-bold text-black">{title}</h3>
        <div class="w-full">
            <div class="content-wrapper">
                <slot name="body" />
            </div>
        </div>
        <div class="modal-action">
            <slot name="footer" />
        </div>
    </div>
</dialog>

<style>
    /* Override DaisyUI's modal transitions */
    :global(.modal-box) {
        transition-property: transform, opacity, height;
        transition-duration: 300ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    .content-wrapper {
        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Ensure modal content transitions smoothly */
    :global(.modal.modal-open .modal-box) {
        animation: none;
    }
</style>

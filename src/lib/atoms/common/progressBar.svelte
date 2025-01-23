<script lang="ts">
    export let width: number = 0; // Default to 0 if no width provided
</script>

<div class="w-full h-[4px] bg-backgroundHover rounded-full">
    <div 
        class="h-full bg-primary rounded-full transition-all duration-1000 ease-in-out" 
        style="width: {width}%"
    >
    </div>
</div>


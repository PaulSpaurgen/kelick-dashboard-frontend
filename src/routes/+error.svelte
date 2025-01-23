<script lang="ts">
    import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center justify-center h-screen bg-background w-full">
    <div class="text-center p-8 rounded-lg">
        <h1 class="text-6xl font-bold text-primary mb-4">
            {$page.status}
        </h1>
        <p class="text-xl text-text-inactive mb-6">
            {$page.error?.message || 'Something went wrong'}
        </p>
        <a 
            href="/employees"
            class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
        >
            Go To Employees
        </a>
    </div>
</div> 
<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/navigationBar/Nav.svelte';
	let { children } = $props();
</script>
<div class="flex h-screen bg-background w-full font-quicksand">
	<Nav />
	{@render children()}
</div>

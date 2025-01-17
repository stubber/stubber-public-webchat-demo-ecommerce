<script>
	import { toasts } from '$lib/stores/toast';
	import { fly } from 'svelte/transition';
</script>

<div class="fixed bottom-4 right-4 z-50 space-y-2">
	{#each $toasts as toast (toast.id)}
		<div
			transition:fly={{ x: 100, duration: 300 }}
			class="bg-white rounded-lg shadow-lg p-4 flex items-center space-x-2 min-w-[200px]"
		>
			<div class="flex-1">
				<p class="text-sm text-gray-800">{toast.message}</p>
			</div>
			<button
				on:click={() => toasts.remove(toast.id)}
				class="text-gray-400 hover:text-gray-600"
			>
				✕
			</button>
		</div>
	{/each}
</div>
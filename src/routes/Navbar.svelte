<script>
	import { page } from '$app/stores';
	import { cart } from '$lib/stores/cart';

	const categories = ['TVs', 'Laptops', 'Mobile Phones'];
</script>

<nav class="bg-white shadow-lg">
	<div class="container mx-auto px-4">
		<div class="flex justify-between items-center h-16">
			<a href="/" class="text-xl font-bold text-gray-800">TechStore</a>
			
			<div class="hidden md:flex space-x-4">
				{#each categories as category}
					<a
						href="/?category={category}"
						class="px-3 py-2 rounded-md text-sm font-medium {$page.url.searchParams.get('category') === category
							? 'bg-gray-900 text-white'
							: 'text-gray-700 hover:bg-gray-100'}"
					>
						{category}
					</a>
				{/each}
			</div>

			<div class="flex items-center">
				<a href="/cart" class="relative">
					<span class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
						{$cart.length}
					</span>
					<button class="p-2">
						🛒
					</button>
				</a>
			</div>
		</div>
	</div>
</nav>
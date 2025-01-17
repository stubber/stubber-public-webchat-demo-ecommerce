<script>
	import { page } from '$app/stores';
	import { products } from '$lib/data/products';
	import { cart } from '$lib/stores/cart';
	import { toasts } from '$lib/stores/toast';
	import { getCategoryKey } from '$lib/utils/categoryUtils';
	
	$: category = $page.url.searchParams.get('category');

	function addToCart(product) {
		cart.update((items) => [...items, product]);
		toasts.add(`${product.name} added to cart`);
		
		// Send event to server with product details
		window.send_page_control_event({
			action: 'add_to_cart',
			product: {
				id: product.id,
				name: product.name,
				price: product.price,
				category: product.category
			}
		});
	}
</script>

{#if !category}
	<div class="max-w-4xl mx-auto text-center">
		<div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4 rounded-lg shadow-xl mb-8">
			<h1 class="text-4xl font-bold mb-4">Webchat Functionality Demo</h1>
			<p class="text-xl">Experience the power of contextual AI assistance</p>
		</div>
		
		<div class="bg-white p-8 rounded-lg shadow-lg">
			<h2 class="text-2xl font-semibold mb-6">Things to try</h2>
			<ul class="space-y-4 text-left">
				<li class="flex items-start">
					<span class="text-blue-600 mr-2">•</span>
					<span>Ask the agent to show you phones and watch as the page navigates to Mobile Phones.</span>
				</li>
				<li class="flex items-start">
					<span class="text-blue-600 mr-2">•</span>
					<span>Add something to the cart with the chat open and see the agent comment on your purchase.</span>
				</li>
				<li class="flex items-start">
					<span class="text-blue-600 mr-2">•</span>
					<span>Navigate to the laptops page and ask a question about something on the page, see that the agent has context of what page you're on.</span>
				</li>
			</ul>
			
			<div class="mt-8">
				<a
					href="/?category=TVs"
					class="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
				>
					Start Exploring
				</a>
			</div>
		</div>
	</div>
{:else}
	<div class="space-y-8">
		<h1 class="text-3xl font-bold text-gray-900">{category}</h1>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each products[getCategoryKey(category)] || [] as product}
				<div class="bg-white rounded-lg shadow-md overflow-hidden">
					<img
						src={product.image}
						alt={product.name}
						class="w-full h-48 object-cover"
					/>
					<div class="p-4 space-y-2">
						<h2 class="text-xl font-semibold text-gray-800">{product.name}</h2>
						<p class="text-gray-600">${product.price.toFixed(2)}</p>
						<button
							on:click={() => addToCart(product)}
							class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
						>
							Add to Cart
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}
<script>
	import { cart } from '$lib/stores/cart';

	$: cartTotal = $cart.reduce((total, item) => total + item.price, 0);

	function removeFromCart(index) {
		cart.update(items => items.filter((_, i) => i !== index));
	}
</script>

<div class="space-y-8">
	<h1 class="text-3xl font-bold text-gray-900">Shopping Cart</h1>

	{#if $cart.length === 0}
		<div class="text-center py-8">
			<p class="text-gray-600">Your cart is empty</p>
			<a href="/" class="text-blue-600 hover:underline mt-4 inline-block">Continue Shopping</a>
		</div>
	{:else}
		<div class="bg-white rounded-lg shadow-md">
			<div class="divide-y divide-gray-200">
				{#each $cart as item, index}
					<div class="p-6 flex items-center space-x-4">
						<img
							src={item.image}
							alt={item.name}
							class="w-24 h-24 object-cover rounded-md"
						/>
						<div class="flex-1">
							<h2 class="text-lg font-semibold text-gray-800">{item.name}</h2>
							<p class="text-gray-600">${item.price.toFixed(2)}</p>
							<p class="text-sm text-gray-500">{item.category}</p>
						</div>
						<button
							on:click={() => removeFromCart(index)}
							class="text-red-600 hover:text-red-800"
						>
							Remove
						</button>
					</div>
				{/each}
			</div>
			<div class="p-6 bg-gray-50 border-t border-gray-200">
				<div class="flex justify-between items-center">
					<span class="text-lg font-semibold">Total:</span>
					<span class="text-2xl font-bold">${cartTotal.toFixed(2)}</span>
				</div>
				<button
					class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
				>
					Proceed to Checkout
				</button>
			</div>
		</div>
	{/if}
</div>
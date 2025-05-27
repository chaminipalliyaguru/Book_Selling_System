<script lang="ts">
	let { book, addToCart } = $props();

	let quantity = $state(1);
</script>

<div class="p-4 border rounded-md shadow-sm">
	<h2 class="text-xl font-bold mb-1">{book.title}</h2>
	<p class="text-gray-600 mb-1">{book.author}</p>
	<p class="text-green-600 font-semibold mb-2">${book.price}</p>

	<input
		type="number"
		min="1"
		bind:value={quantity}
		class="border p-1 w-20 rounded mr-2"
	/>

	<button
		class="bg-blue-500 text-white px-3 py-1 rounded hover:opacity-90"
		on:click={() => addToCart(book, quantity)}
	>
		Add to Cart
	</button>
</div>

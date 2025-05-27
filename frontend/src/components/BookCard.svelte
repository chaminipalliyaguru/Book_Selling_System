<script lang="ts">
	let { book, addToCart } = $props();

	let quantity = $state(1);
</script>

<div class="p-4 mt-24 border rounded-md shadow-sm bg-white flex flex-col items-center text-center">
	<img src={book.image} alt={book.title} class="w-40 h-60 object-cover mb-3 rounded shadow-md" />
	<h2 class="text-lg font-bold mb-1">{book.title}</h2>
	<p class="text-gray-600 mb-1">{book.author}</p>
	<p class="text-green-600 font-semibold mb-2">${book.price}</p>

	<input
		type="number"
		min="1"
		bind:value={quantity}
		class="border p-1 w-20 rounded mb-2"
	/>

	<button
		class="bg-blue-500 text-white px-3 py-1 rounded hover:opacity-90"
		on:click={() => addToCart(book, quantity)}
	>
		Add to Cart
	</button>
</div>
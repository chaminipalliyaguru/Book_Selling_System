<script lang="ts">
	import { cart } from "../lib/stores";
	import type { Book } from "../lib/stores";

	let { book } = $props();

	let quantity = $state(1);
	

	function addToCart(book: Book, quantity: number) {
        cart.update((c) => [...c, { ...book, quantity }]);
    }

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

	<div class="flex gap-2">
	<button class="text-2xl"
		on:click={() => {
			addToCart(book, quantity);
		}}
	>
	🛒
	</button>
	
	<button style="width: 30px; height: 30px;" 
		on:click={() => {
			addToCart(book, quantity);
		}}
	>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="gray" stroke-width="2" viewBox="0 0 24 24" style="width: 100%; height: 100%;">
		  <path stroke-linecap="round" stroke-linejoin="round" d="M3.172 5.172a4 4 0 015.656 0L12 8.343l3.172-3.171a4 4 0 115.656 5.656L12 21.343 3.172 10.828a4 4 0 010-5.656z"/>
		</svg>
	</button>
	  
	</div>
</div>
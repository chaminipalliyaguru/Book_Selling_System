<script>
    export let book;
    export let addToCart;
  
    let quantity = 1;
  </script>
  
  <div class="border p-4 rounded shadow-md">
    <h2 class="text-xl font-semibold">{book.title}</h2>
    <p class="text-gray-600">{book.author}</p>
    <p class="text-green-600 font-bold">${book.price}</p>
  
    <input type="number" bind:value={quantity} min="1" class="border p-1 w-16" />
    <button
      class="bg-blue-500 text-white px-3 py-1 mt-2 rounded"
      on:click={() => addToCart(book, quantity)}
    >
      Add to Cart
    </button>
  </div>
  
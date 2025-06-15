<script lang="ts">
  import { cart, favoriteBooks } from "../lib/stores";
  import type { Book } from "../lib/stores";

  export let book: Book;

  let quantity = 1;
  let flipped = false;

  function addToCart(book: Book, quantity: number) {
    cart.update((c) => [...c, { ...book, quantity }]);
  }

  function addToFavorites(book: Book) {
    favoriteBooks.update((f) => [...f, book]);
  }
</script>

<!-- 3D Flip Card Container -->
<div class="w-full max-w-sm mx-auto mt-10 [perspective:1000px]">
  <div
    class={`relative w-full h-[450px] transition-transform duration-700 [transform-style:preserve-3d] ${
      flipped ? "[transform:rotateY(180deg)]" : ""
    }`}
  >
    <!-- Front -->
    <div
      class="absolute w-full h-full bg-white rounded-md shadow-md p-4 flex flex-col items-center text-center [backface-visibility:hidden]"
    >
      <img
        src={book.image}
        alt={book.title}
        class="w-40 h-60 object-cover mb-3 rounded shadow-md"
      />
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
        <button class="text-2xl" on:click={() => addToCart(book, quantity)}
          >🛒</button
        >
        <button class="text-2xl" on:click={() => addToFavorites(book)}
          >❤️</button
        >
        <button
          class="absolute bottom-2 right-2 text-sm bg-white p-1 rounded-full shadow-md"
          on:click={() => (flipped = true)}
          title="Flip"
        >
          ↺
        </button>
      </div>
    </div>

    <!-- Back -->
    <div
      class="absolute w-full h-full bg-gray-300 rounded-md shadow-md p-4 flex flex-col items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]"
    >
      <h2 class="text-lg font-bold mb-1">{book.title}</h2>
      <p class="text-gray-700 mt-2">
        📖 Description or extra info can go here. You can show reviews, genres,
        links, etc.
      </p>
      <button
        class="absolute bottom-2 right-2 text-sm bg-white p-1 rounded-full shadow-md"
        on:click={() => (flipped = false)}
        title="Flip back"
      >
        ↺
      </button>
    </div>
  </div>
</div>

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
<div class="w-full max-w-sm mx-auto mt-10 [perspective:1200px]">
  <div
    class={`relative w-full h-[500px] transition-transform duration-700 ease-in-out [transform-style:preserve-3d] ${
      flipped ? "[transform:rotateY(180deg)]" : ""
    }`}
  >
    <!-- Front -->
    <div
      class="absolute w-full h-full bg-white rounded-xl shadow-xl p-5 flex flex-col items-center text-center [backface-visibility:hidden] transition-all duration-500"
    >
      <img
        src={book.image}
        alt={book.title}
        class="w-40 h-60 object-cover mb-4 rounded-md shadow-sm hover:scale-105 transition-transform duration-300"
      />
      <h2 class="text-xl font-semibold text-gray-800">{book.title}</h2>
      <p class="text-sm text-gray-500 mb-1">{book.author}</p>
      <p class="text-green-600 font-bold text-lg mb-4">${book.price}</p>

      <input
        type="number"
        min="1"
        bind:value={quantity}
        class="border border-gray-300 rounded-md p-2 w-24 mb-4 text-center focus:ring-2 focus:ring-indigo-400"
      />

      <div class="flex gap-3 justify-center">
        <button
          class="text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-full shadow text-sm transition"
          on:click={() => addToCart(book, quantity)}
        >
          🛒 Add
        </button>
        <button
          class="text-white bg-pink-500 hover:bg-pink-600 px-3 py-1 rounded-full shadow text-sm transition"
          on:click={() => addToFavorites(book)}
        >
          ❤️ Favorite
        </button>
      </div>

      <!-- Flip Button -->
      <button
        class="absolute top-2 right-2 text-gray-600 hover:text-black bg-white p-1 rounded-full shadow transition"
        on:click={() => (flipped = true)}
        title="Flip card"
      >
        ↻
      </button>
    </div>

    <!-- Back -->
    <div
      class="absolute w-full h-full bg-gray-100 rounded-xl shadow-xl p-6 flex flex-col justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden] transition-all duration-500"
    >
      <h2 class="text-xl font-semibold text-gray-800 mb-2">{book.title}</h2>
      <p class="text-gray-600 text-sm mb-4">
        📖 This is the back of the card. Add more details like summary, genre,
        reviews, or a link to buy.
      </p>

      <!-- Flip Back Button -->
      <button
        class="absolute top-2 right-2 text-gray-600 hover:text-black bg-white p-1 rounded-full shadow transition"
        on:click={() => (flipped = false)}
        title="Flip back"
      >
        ↺
      </button>
    </div>
  </div>
</div>

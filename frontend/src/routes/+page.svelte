<script lang="ts">
  import "../app.css";
  import { books, cart, fetchBooks, favoriteBooks } from "../lib/stores";
  import BookCard from "../components/BookCard.svelte";
  import { onMount } from "svelte";
  import CardInfo from "../components/CardInfo.svelte";
  import FavoriteBook from "../components/FavoriteBook.svelte";

  
  let bookList = $state($books);
  let total = $state(0);
  // let fetchedBooks = []; // This variable is not used, can be removed if not needed elsewhere
  let showCart = $state(false);
  let showFavorites = $state(false);
  let showSelection = $state(false);

  onMount(async () => {
    await fetchBooks();
    bookList = $books;
  });

  $effect(() => {
    bookList = $books;
    total = $cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  });

  function resetCart() {
    cart.set([]);
  }

  function closeFavoriteBook() {
    showFavorites = false;
  }

  // Function to close the cart (passed to CardInfo)
  function closeCardInfo() {
    showCart = false;
  }

  function closeSelection() {
    showSelection = false;
  }

  const priceOptions = [
    { min: 0, max: 100, label: "All" },
    { min: 10, max: 20, label: "10-20" },
    { min: 20, max: 30, label: "20-30" },
    { min: 30, max: 40, label: "30-40" },
    { min: 40, max: 50, label: "40-50" },
    { min: 50, max: 60, label: "50-60" },
    { min: 60, max: 70, label: "60-70" },
    { min: 70, max: 80, label: "70-80" },
    { min: 80, max: 90, label: "80-90" },
    { min: 90, max: 100, label: "90-100" },
  ];

  let priceLimit = $state(priceOptions[0]);
  
</script>

<main class="max-w-7xl mx-auto p-6 font-sans">
  <div class="flex justify-between items-center mb-8">
    <h1
      class="text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-transparent bg-clip-text drop-shadow-md animate-fade-in"
    >
      📘 BookNest
    </h1>

    <div class="flex gap-2 justify-end">
      <button onclick={() => (showCart = !showCart)} class="text-3xl">
        🛒
        <span class="text-sm">{$cart.length}</span>
      </button>

      <div class="relative">
        <button
          onclick={() => (showFavorites = !showFavorites)}
          style="width: 30px; height: 30px;"
          class="relative"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="gray"
            stroke-width="2"
            viewBox="0 0 24 24"
            style="width: 100%; height: 100%;"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.172 5.172a4 4 0 015.656 0L12 8.343l3.172-3.171a4 4 0 115.656 5.656L12 21.343 3.172 10.828a4 4 0 010-5.656z"
            />
          </svg>
        </button>

        {#if showFavorites}
          <div class="absolute top-full right-0 mt-2 z-10">
            <FavoriteBook {showFavorites} closeFavorites={closeFavoriteBook} />
          </div>
        {/if}
      </div>
    </div>
  </div>

  <div class="mt-20">
    <label
      for="priceLimit"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      Price Limit
    </label>
    <select
      id="priceLimit"
      bind:value={priceLimit}
      class="block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700"
    >
      {#each priceOptions as option}
        <option value={option}>{option.label}</option>
      {/each}
    </select>
  </div>

  <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {#each bookList.filter((book) => book.price >= priceLimit.min && book.price <= priceLimit.max) as book (book.id)}
      <BookCard {book} />
    {/each}
  </section>
</main>

<CardInfo {showCart} {total} {resetCart} closeCart={closeCardInfo} />

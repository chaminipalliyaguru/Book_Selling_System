<script lang="ts">
    import "../app.css";
    import { books, cart, fetchBooks } from "../lib/stores";
    import BookCard from "../components/BookCard.svelte";
    import { onMount } from "svelte";
    import CardInfo from "../components/CardInfo.svelte";

    let bookList = $state($books); 
    let total = $state(0);
    let fetchedBooks = [];
    let showCart = $state(false);
    let showFavorites = $state(false);

    onMount(async () => {
        await fetchBooks();
        bookList = $books;
    });

    $effect(() => {
        bookList = $books;
        total = $cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
        );
    });

    function resetCart() {
        cart.set([]);
    }
</script>


<main class="max-w-7xl mx-auto p-6 font-sans">
    <div class="flex justify-between items-center mb-8">
    <h1
            class="text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-transparent bg-clip-text drop-shadow-md animate-fade-in"
    >
        📘 BookNest
    </h1>

    <div class="flex gap-2 justify-end">
    <button onclick={() => showCart = !showCart} class="text-3xl">
       🛒 
    <span class="text-sm">{$cart.length}</span>
    </button>

    <button onclick={() => showFavorites = !showFavorites} style="width: 30px; height: 30px;">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="gray" stroke-width="2" viewBox="0 0 24 24" style="width: 100%; height: 100%;">
		  <path stroke-linecap="round" stroke-linejoin="round" d="M3.172 5.172a4 4 0 015.656 0L12 8.343l3.172-3.171a4 4 0 115.656 5.656L12 21.343 3.172 10.828a4 4 0 010-5.656z"/>
		</svg>
	</button>
    </div>
     
    {#if showCart}
        <CardInfo {total} {resetCart} />
    {/if}
    
    </div>

    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {#each bookList as book (book.id)}
            <BookCard {book} />
        {/each}
    </section>
</main>


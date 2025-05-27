<script lang="ts">
    import "../app.css";
    import { books, cart } from "../lib/stores";
    import BookCard from "../components/BookCard.svelte";

    let bookList = $state([]);
    let total = $state(0);

    $effect(() => {
        bookList = $books;
        total = $cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
        );
    });

    function addToCart(book: Object, quantity: number) {
        cart.update((c) => [...c, { ...book, quantity }]);
    }

    function resetCart() {
        cart.set([]);
    }
</script>

<main class="max-w-7xl mx-auto p-6 font-sans">
    <h1 class="text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-transparent bg-clip-text drop-shadow-md animate-fade-in">
        📘 BookNest
    </h1>

    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {#each bookList as book (book.id)}
            <BookCard {book} {addToCart} />
        {/each}
    </section>

    <section class="mt-10 bg-gray-50 p-6 rounded-md shadow-md">
        <h2 class="text-2xl font-semibold mb-4">🛒 Your Cart</h2>

        {#if $cart.length > 0}
            <ul class="list-disc ml-5 space-y-2">
                {#each $cart as item}
                    <li>{item.title} × {item.quantity}</li>
                {/each}
            </ul>
            <p class="mt-4 text-lg font-bold">Total: ${total}</p>
        {:else}
            <p class="text-gray-500">Cart is empty.</p>
        {/if}
        <button
            class="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
            on:click={resetCart}
        >
            Clear Cart
        </button>
    </section>
</main>

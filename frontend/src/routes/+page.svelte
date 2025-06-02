<script lang="ts">
    import "../app.css";
    // import { books, cart } from "../lib/stores";
    import { books, cart } from "../lib/stores.js";
    import BookCard from "../components/BookCard.svelte";
    import { onMount } from "svelte";
    import { client, GET_BOOKS } from "../lib/graphql";

    let bookList = $state([]);
    let total = $state(0);
    let fetchedBooks = [];

    onMount(async () => {
        const data = await client.request(GET_BOOKS);
        fetchedBooks = data.books;
        books.set(fetchedBooks);
    });

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
    <div class="flex justify-between items-center mb-8">
        <h1
            class="text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-transparent bg-clip-text drop-shadow-md animate-fade-in"
        >
            📘 BookNest
        </h1>
        <a href="/admin" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200">
            Admin Panel
        </a>
    </div>

    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {#each bookList as book (book.id)}
            <BookCard {book} {addToCart} />
        {/each}
    </section>

    <section class="mt-10 bg-gray-50 p-6 rounded-md shadow-md">
        <h2 class="text-2xl font-semibold mb-4">🛒 Your Cart</h2>

        {#if $cart.length > 0}
            <div
                class="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
                <h2 class="text-xl font-semibold text-gray-800 mb-4">
                    🛒 Your Cart
                </h2>

                <ul class="list-disc ml-6 space-y-2 text-gray-700">
                    {#each $cart as item}
                        <li class="flex justify-between items-center">
                            <span>{item.title}</span>
                            <span class="text-sm text-gray-500"
                                >× {item.quantity}</span
                            >
                        </li>
                    {/each}
                </ul>

                <p
                    class="mt-6 text-lg font-bold text-right text-green-600 border-t pt-4"
                >
                    Total: ${total}
                </p>
            </div>
        {:else}
            <div class="text-center text-gray-500 italic mt-6">
                <p>🛒 Your cart is empty.</p>
            </div>
        {/if}

        <button
            class="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
            onclick={resetCart}
        >
            Clear Cart
        </button>
    </section>
</main>


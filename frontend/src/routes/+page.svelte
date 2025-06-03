<script lang="ts">
    import "../app.css";
    import { books, cart } from "../lib/stores.js";
    import BookCard from "../components/BookCard.svelte";
    import { onMount } from "svelte";
    import { client, GET_BOOKS } from "../lib/graphql";
    import CardInfo from "../components/CardInfo.svelte";

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
    </div>

    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {#each bookList as book (book.id)}
            <BookCard {book} {addToCart} />
        {/each}
    </section>

    <CardInfo {total} {resetCart} />
</main>


<!-- <script lang="ts">
    import { favoriteBooks, type Book } from "../lib/stores";
    export let showFavorites: boolean;
    export let closeFavorites: () => void;

    let favoriteBookList = $favoriteBooks;

    function removeFromFavorite(book: Book) {
        favoriteBooks.update((f) => f.filter((b) => b.id !== book.id));
    }
</script>

<div class="items-center justify-center h-full w-96 bg-gray-200 rounded-md mt-12 border border-gray-300 p-2 overflow-y-auto">
    <h1 class="text-2xl font-bold">Favorite Books</h1>
    <button class="bg-red-500 text-white px-2 py-1 rounded" on:click={closeFavorites}>
        close
    </button>
    
    {#if showFavorites}
    {#each favoriteBookList as book}
        <div class="flex flex-col h-full bg-white rounded-md mt-12 border border-gray-300 p-2">
            <h1 class="text-sm text-center ">{book.title}</h1>
            <button class="bg-red-500 text-white px-2 py-1 rounded" on:click={() => removeFromFavorite(book)}>
                X
            </button>
        </div>
        {/each}
    {/if}
</div> -->


<!-- <script lang="ts">
    import { favoriteBooks, type Book } from "../lib/stores";
    export let showFavorites: boolean;
    export let closeFavorites: () => void;

    let favoriteBookList = $favoriteBooks;

    function removeFromFavorite(book: Book) {
        favoriteBooks.update((f) => f.filter((b) => b.id !== book.id));
    }
</script>

<div class="items-center justify-center h-full w-96 bg-gray-200 rounded-md border border-gray-300 p-2 overflow-y-auto"> <h1 class="text-2xl font-bold">Favorite Books</h1>
    <button class="bg-red-500 text-white px-2 py-1 rounded" on:click={closeFavorites}>
        close
    </button>

    {#if showFavorites}
    {#each favoriteBookList as book}
        <div class="flex flex-col h-full bg-white rounded-md mt-12 border border-gray-300 p-2">
            <h1 class="text-sm text-center ">{book.title}</h1>
            <button class="bg-red-500 text-white px-2 py-1 rounded" on:click={() => removeFromFavorite(book)}>
                X
            </button>
        </div>
        {/each}
    {/if}
</div> -->


<script lang="ts">
    import { favoriteBooks, type Book } from "../lib/stores";
    export let showFavorites: boolean;
    export let closeFavorites: () => void;

    let favoriteBookList = $favoriteBooks;

    function removeFromFavorite(book: Book) {
        favoriteBooks.update((f) => f.filter((b) => b.id !== book.id));
    }
</script>

<div
    class="relative w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 flex flex-col max-h-[70vh] overflow-hidden transform transition-all duration-300 ease-in-out
        transition-transform transition-opacity
        {showFavorites ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}"
>
    <div class="flex justify-between items-center pb-3 border-b border-gray-200 mb-3">
        <h2 class="text-xl font-semibold text-gray-800">Favorite Books</h2>
        <button
            class="text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out"
            on:click={closeFavorites}
            aria-label="Close favorites"
        >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>

    <div class="flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {#if favoriteBookList.length === 0}
            <p class="text-gray-500 text-center py-4">No favorite books added yet.</p>
        {:else}
            {#each favoriteBookList as book (book.id)}
                <div class="flex items-center bg-gray-50 rounded-lg p-3 mb-2 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <span class="flex-grow text-sm text-gray-700 font-medium truncate pr-2">
                        {book.title}
                    </span>
                    <button
                        class="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                        on:click={() => removeFromFavorite(book)}
                        aria-label="Remove from favorites"
                    >
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            {/each}
        {/if}
    </div>
</div>

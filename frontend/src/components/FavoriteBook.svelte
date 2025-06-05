<script lang="ts">
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
</div>
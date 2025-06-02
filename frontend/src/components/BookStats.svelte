<script lang="ts">
    import { books, type Book } from '../lib/stores';

    const totalBooks = $derived($books.length);  //derived is used to create a read-only reactive store based on one or more other stores.It reacts automatically when the original store(s) change and computes a new value from them.
    const uniqueAuthors = $derived(new Set($books.map(book => book.author)).size);
    const totalPrice = $derived($books.reduce((sum: number, book: Book) => sum + book.price, 0));
</script>

<div class="flex justify-center items-center min-h-[20vh]">
    <div class="w-full max-w-5xl">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div class="bg-yellow-300 shadow rounded p-4 text-center">
                <h3 class="text-lg font-semibold">📚 Total Books</h3>
                <p class="text-2xl font-bold mt-2">{ totalBooks }</p> 
            </div>
            <div class="bg-blue-300 shadow rounded p-4 text-center">
                <h3 class="text-lg font-semibold">✍️ Total Authors</h3>
                <p class="text-2xl font-bold mt-2">{ uniqueAuthors }</p>
            </div>
            <div class="bg-green-300 shadow rounded p-4 text-center">
                <h3 class="text-lg font-semibold">💰 Total Price</h3>
                <p class="text-2xl font-bold mt-2">${ totalPrice.toFixed(2) }</p>
            </div>
        </div>
    </div>
</div>
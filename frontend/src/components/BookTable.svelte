<script lang="ts">
    import { books, type Book } from '../lib/stores';
    import { client, GET_BOOKS } from '../lib/graphql';
    import { createEventDispatcher, onMount } from 'svelte';
    const dispatch = createEventDispatcher();

    async function fetchBooks() {
        try {
            const data = await client.request(GET_BOOKS) as { books: Book[] };
            console.log('Fetched books:', data.books);
            books.set(data.books);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }

    async function deleteBook(id: string) {
      books.update(all => all.filter(book => book.id !== id));
        await fetchBooks();
    }

    onMount(() => {
        fetchBooks();
    });

    $effect(() => {
        console.log('Books store updated:', $books);
    });
  </script>
  
  <table class="w-full table-auto border mt-6 bg-white shadow rounded">
    <thead class="bg-gray-100">
      <tr>
        <th class="p-2">Title</th>
        <th class="p-2">Author</th>
        <th class="p-2">Price</th>
        <th class="p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each $books as book}
        <tr class="border-t">
          <td class="p-2">{book.title}</td>
          <td class="p-2">{book.author}</td>
          <td class="p-2">${book.price}</td>
          <td class="p-2 flex gap-2">
            <button class="bg-yellow-400 text-white px-2 py-1 rounded" on:click={() => dispatch('edit', book)}>Edit</button>
            <button class="bg-red-500 text-white px-2 py-1 rounded" on:click={() => deleteBook(book.id)}>Delete</button>
          </td>
        </tr>
      {:else}
        <tr>
          <td colspan="4" class="p-4 text-center text-gray-500">No books available</td>
        </tr>
      {/each}
    </tbody>
  </table>
  
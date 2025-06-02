<script lang="ts">
    import { books } from '../lib/stores';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    function deleteBook(id: any) {
      books.update(all => all.filter(book => book.id !== id));
    }
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
          <td class="p-2">{book.category}</td>
          <td class="p-2">${book.price}</td>
          <td class="p-2 flex gap-2">
            <button class="bg-yellow-400 text-white px-2 py-1 rounded" on:click={() => dispatch('edit', book)}>Edit</button>
            <button class="bg-red-500 text-white px-2 py-1 rounded" on:click={() => deleteBook(book.id)}>Delete</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  
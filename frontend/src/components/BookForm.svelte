<script lang="ts">
    import { books } from '../lib/stores';
    import { createEventDispatcher } from 'svelte';
    export let editingBook: any = null;
  
    const dispatch = createEventDispatcher();
  
    let form: any = {
      title: '',
      author: '',
      isbn: '',
      category: '',
      price: ''
    };
  
    $: if (editingBook) {
      form = { ...editingBook };
    }
  
    function saveBook() {
      if (editingBook) {
        books.update(all => all.map(b => b.id === form.id ? form : b));
      } else {
        form.id = Date.now();
        books.update(all => [...all, form]);
      }
      resetForm();
    }
  
    function resetForm() {
      form = { title: '', author: '', isbn: '', category: '', price: '' };
      dispatch('clearEdit');
    }
  </script>
  
  <div class="bg-white p-4 rounded shadow mb-6">
    <h2 class="text-xl font-semibold mb-2">{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
  
    <div class="grid grid-cols-2 gap-4">
      <input class="border p-2 rounded" placeholder="Title" bind:value={form.title} />
      <input class="border p-2 rounded" placeholder="Author" bind:value={form.author} />
      <input class="border p-2 rounded" placeholder="ISBN" bind:value={form.isbn} />
      <input class="border p-2 rounded" placeholder="Category" bind:value={form.category} />
      <input class="border p-2 rounded" placeholder="Price" type="number" bind:value={form.price} />
    </div>
  
    <div class="mt-4 flex gap-2">
      <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={saveBook}>
        {editingBook ? 'Update' : 'Add'}
      </button>
      {#if editingBook}
        <button class="bg-gray-300 px-4 py-2 rounded" on:click={resetForm}>Cancel</button>
      {/if}
    </div>
  </div>
  
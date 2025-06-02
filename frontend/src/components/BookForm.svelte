<script lang="ts">
  import { books, addBook, UpdateBook } from "../lib/stores";
  import { createEventDispatcher } from "svelte";
  export let editingBook: any = null;

  const dispatch = createEventDispatcher();

  let form: any = {
    title: "",
    author: "",
    price: "",
    image: "",
  };

  $: if (editingBook) {
    form = { ...editingBook };
  }

  async function editBook() {
    if (editingBook) {
      UpdateBook(form);
    }
  }

  async function saveBook() {
    if (editingBook) {
      editBook();
    } else {
      await addBook(form); // no need to manually assign id
    }
    resetForm();
  }

  function resetForm() {
    form = { title: "", author: "", price: "", image: "" };
    dispatch("clearEdit");
  }
</script>

<div class="bg-white p-6 rounded shadow-md mb-6 max-w-2xl mx-auto">
  <h2 class="text-xl font-semibold mb-4">
    {editingBook ? "✏️ Edit Book" : "Add New Book"}
  </h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label class="block text-sm font-medium mb-1" for="title">Title</label>
      <input
        id="title"
        class="w-full border p-2 rounded"
        placeholder="Enter book title"
        bind:value={form.title}
      />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1" for="author">Author</label>
      <input
        id="author"
        class="w-full border p-2 rounded"
        placeholder="Enter author's name"
        bind:value={form.author}
      />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1" for="price"
        >Price (USD)</label
      >
      <input
        id="price"
        class="w-full border p-2 rounded"
        type="number"
        placeholder="e.g. 19.99"
        bind:value={form.price}
      />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1" for="image">Image URL</label
      >
      <input
        id="image"
        class="w-full border p-2 rounded"
        placeholder="Paste image link"
        bind:value={form.image}
      />
    </div>
  </div>

  {#if form.image}
    <div class="mt-4">
      <p class="text-sm text-gray-600 mb-1">Preview:</p>
      <img src={form.image} alt="Book Cover" class="h-32 rounded border" />
    </div>
  {/if}

  <div class="mt-6 flex flex-wrap gap-2">
    <button
      class="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      on:click={saveBook}
    >
      {editingBook ? "💾 Update Book" : "Add Book"}
    </button>

    {#if editingBook}
      <button
        class="bg-gray-300 px-5 py-2 rounded hover:bg-gray-400 transition"
        on:click={resetForm}
      >
        Cancel
      </button>
    {/if}
  </div>
</div>

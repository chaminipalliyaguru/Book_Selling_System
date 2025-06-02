<script lang="ts">
    import "../../app.css";
    import BookForm from '../../components/BookForm.svelte';
    import BookTable from '../../components/BookTable.svelte';
    import { fetchBooks } from '../../lib/stores.ts';
    import { onMount } from 'svelte';
  
    let editingBook: any = null;

    onMount(() => {
        fetchBooks();
    });
</script>
  
<main class="p-6">
    <h1 class="text-2xl font-bold mb-4">📘 Book Admin Panel</h1>
    <BookForm {editingBook} on:clearEdit={() => editingBook = null} />
    <BookTable on:edit={(e) => editingBook = e.detail} />
</main>
  
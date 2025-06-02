   <script lang="ts">
    import "../../app.css";
    import BookForm from '../../components/BookForm.svelte';
    import BookTable from '../../components/BookTable.svelte';
    import { fetchBooks } from '../../lib/stores.ts';
    import { onMount } from 'svelte';

    let editingBook: any = null;
    let showForm = false;

    onMount(() => {
        fetchBooks();
    });

    function handleEdit(e) {
        editingBook = e.detail;
        showForm = true;
    }

    function handleClearEdit() {
        editingBook = null;
        showForm = false;
    }
</script>

<main class="p-6">
    <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold">📘 Book Admin Panel</h1>
        <button 
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            on:click={() => showForm = !showForm}>
            {showForm ? (editingBook ? 'Cancel Editing' : 'Close Form') : (editingBook ? 'Edit Book' : '➕ Add New Book')}
        </button>
    </div>

    {#if showForm}
        <BookForm {editingBook} on:clearEdit={handleClearEdit} />
    {/if}

    <BookTable on:edit={handleEdit} />
</main>

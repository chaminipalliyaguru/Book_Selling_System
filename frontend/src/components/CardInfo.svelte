<script lang="ts">
    import { cart } from '../lib/stores.ts'

    let { total, resetCart } = $props();
</script>

<section class="mt-10 bg-gray-50 p-6 rounded-md shadow-md">
    <h2 class="text-2xl font-semibold mb-4">🛒 Your Cart</h2>

    {#if $cart.length > 0}
        <div
            class="bg-white p-6 rounded-lg shadow-md border border-gray-200"
        >
            <h2 class="text-xl font-semibold text-gray-800 mb-4">
                🛒 Your Cart
            </h2>

            <ul class="list-disc ml-6 space-y-2 text-gray-700">
                {#each $cart as item}
                    <li class="flex justify-between items-center">
                        <span>{item.title}</span>
                        <span class="text-sm text-gray-500"
                            >× {item.quantity}</span>
                    </li>
                {/each}
            </ul>

            <p
                class="mt-6 text-lg font-bold text-right text-green-600 border-t pt-4"
            >
                Total: ${total}
            </p>
        </div>
    {:else}
        <div class="text-center text-gray-500 italic mt-6">
            <p>🛒 Your cart is empty. You can add books to your cart by clicking the "Add to Cart" button on the book page.</p>
        </div>
    {/if}

    <button
        class="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
        onclick={resetCart}
    >
        Clear Cart 🧹
    </button>
</section>
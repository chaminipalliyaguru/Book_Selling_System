<script lang="ts">
    import { cart } from "../lib/stores.ts";
    import Payment from "./Payment.svelte";

    export let total: number;
    export let resetCart: () => void;

    let payment = false;
</script>

<section
    class="fixed top-0 right-0 h-screen w-75 bg-gray-50 p-6 shadow-lg border-l border-gray-200 overflow-y-auto"
>
    <h2 class="text-2xl font-semibold mb-4">Your Cart</h2>

    {#if $cart.length > 0}
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <ul class="list-disc ml-6 space-y-2 text-gray-700">
                {#each $cart as item}
                    <li
                        class="flex justify-between items-center bg-gray-200 p-2 rounded-md"
                    >
                        <span>{item.title}</span>
                        <span class="text-sm text-gray-500"
                            >× {item.quantity}</span
                        >
                    </li>
                {/each}
            </ul>

            <p
                class="mt-6 text-lg font-bold text-right text-green-600 border-t pt-4"
            >
                Total: ${total}
            </p>
        </div>

        <div class="flex justify-between items-center">
            <button
                class="mt-4 w-1/3 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors duration-200"
                onclick={resetCart}
            >
                Clear
            </button>

            <a
                href="/payment"
                class="mt-4 w-1/3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors duration-200 text-center"
            >
                Pay
            </a>
        </div>
    {:else}
        <div class="text-center text-gray-500 italic mt-6">
            <p>
                🛒 Your cart is empty. You can add books to your cart by
                clicking the "Add to Cart" button on the book page.
            </p>
        </div>
    {/if}

    {#if payment}
        <Payment />
    {/if}
</section>

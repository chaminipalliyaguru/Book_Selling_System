 <script lang="ts">
    import { cart } from "../lib/stores.ts";
    import Payment from "./Payment.svelte";

    export let total: number;
    export let resetCart: () => void;
    export let showCart: boolean;
    export let closeCart: () => void;

    let payment = false;
</script>

<section>
<div
    class="fixed top-0 right-0 h-screen w-80 bg-white rounded-l-lg shadow-xl border-l border-gray-200 p-4 flex flex-col transform transition-transform duration-300 ease-in-out z-50 overflow-hidden"
    class:translate-x-full={!showCart}
    class:translate-x-0={showCart}
>
    <div class="flex justify-between items-center pb-3 border-b border-gray-200 mb-3">
        <h2 class="text-xl font-semibold text-gray-800">Your Cart</h2>
        <button
            class="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
            on:click={closeCart}
            aria-label="Close cart"
        >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>

    {#if $cart.length > 0}
        <div class="flex-grow overflow-y-auto pr-1 space-y-2">
            {#each $cart as item (item.id)}
                <div class="flex justify-between items-center bg-gray-50 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <span class="text-sm text-gray-700 font-medium truncate pr-2">
                        {item.title}
                    </span>
                    <span class="text-sm text-gray-500">× {item.quantity}</span>
                </div>
            {/each}
        </div>

        <p class="text-right text-green-600 text-base font-semibold mt-4 border-t border-gray-200 pt-3">
            Total: ${total.toFixed(2)}
        </p>

        <div class="mt-4 flex justify-between gap-2">
            <button
                class="w-1/2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg shadow transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                on:click={resetCart}
            >
                Clear
            </button>

            <button
                class="w-1/2 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-lg shadow transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                on:click={() => payment = true}
            >
                Pay
            </button>
        </div>
    {:else}
        <div class="flex-grow flex items-center justify-center text-center text-gray-500 italic px-4">
            🛒 Your cart is empty. Add books to your cart using the "Add to Cart" button.
        </div>
    {/if}


    {#if payment}
        <Payment />
    {/if}
</div>
</section>








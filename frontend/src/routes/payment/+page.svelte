<script lang="ts">
    import { cart } from '../../lib/stores.ts';
    import { onMount } from 'svelte';
  
    let total = 0;
    let name = '';
    let cardNumber = '';
    let expiry = '';
    let cvv = '';
    let isProcessing = false;
    let success = false;
  
    function handlePayment() {
      isProcessing = true;
      setTimeout(() => {
        isProcessing = false;
        success = true;
      }, 2000);
    }
  
    $: total = $cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
    onMount(() => {
      if ($cart.length === 0) {
        alert('Cart is empty. Redirecting...');
        window.location.href = '/';
      }
    });
  </script>
  
  <div class="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-12 border border-gray-100">
    <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold text-center text-blue-600">Secure Payment</h1>
    <button class="bg-red-500 text-white px-2 py-1 rounded" on:click={() => {
        $cart = [];
        window.location.href = '/';
    }}>
        X
    </button>
    </div>
  
    <!-- Order Summary -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-3">Your Order</h2>
      <table class="w-full table-auto border mt-6 bg-white shadow rounded">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2">Title</th>
            <th class="p-2">Quantity</th>
            <th class="p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {#each $cart as item}
            <tr class="border-t">
              <td class="p-2">{item.title}</td>
              <td class="p-2">{item.quantity}</td>
              <td class="p-2">${item.price * item.quantity}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <div class="mt-4 pt-3 flex justify-between font-bold text-green-600 text-lg">
        <span>Total</span>
        <span>${total}</span>
      </div>
    </div>
  
    <!-- Payment Form -->
    <div class="space-y-4">
      <label class="block">
        <span class="text-gray-700 font-medium">Cardholder Name</span>
        <input
          class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Jane Doe"
          bind:value={name}
        />
      </label>
  
      <label class="block">
        <span class="text-gray-700 font-medium">Card Number</span>
        <input
          class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="1234 5678 9012 3456"
          maxlength="16"
          bind:value={cardNumber}
        />
      </label>
  
      <div class="flex gap-4">
        <label class="w-1/2">
          <span class="text-gray-700 font-medium">Expiry (MM/YY)</span>
          <input
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="08/25"
            bind:value={expiry}
          />
        </label>
  
        <label class="w-1/2">
          <span class="text-gray-700 font-medium">CVV</span>
          <input
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="123"
            maxlength="4"
            type="password"
            bind:value={cvv}
          />
        </label>
      </div>
  
      <button
        class="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 mt-4"
        on:click={handlePayment}
        disabled={isProcessing || !name || !cardNumber || !expiry || !cvv}
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  
    {#if success}
      <div class="mt-6 p-4 bg-green-100 border border-green-300 rounded-xl text-green-700 text-center font-medium">
        ✅ Payment Successful! Thank you for your order.
      </div>
    {/if}
  </div>
  
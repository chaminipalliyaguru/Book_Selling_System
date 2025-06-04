<script>
    let name = '';
    let cardNumber = '';
    let expiry = '';
    let cvv = '';
    let isProcessing = false;
  
    function handlePayment() {
      isProcessing = true;
  
      // Simulate API call
      setTimeout(() => {
        alert('Payment Successful!');
        isProcessing = false;
        name = cardNumber = expiry = cvv = '';
      }, 2000);
    }
  </script>
  
  <div class="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl">
    <h2 class="text-2xl font-bold mb-4">Payment Details</h2>
  
    <div class="space-y-4">
      <input
        class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Cardholder Name"
        bind:value={name}
      />
  
      <input
        class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Card Number"
        maxlength="16"
        bind:value={cardNumber}
      />
  
      <div class="flex gap-4">
        <input
          class="w-1/2 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="MM/YY"
          bind:value={expiry}
        />
  
        <input
          class="w-1/2 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="CVV"
          maxlength="4"
          type="password"
          bind:value={cvv}
        />
      </div>
  
      <button
        class="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
        on:click={handlePayment}
        disabled={isProcessing || !name || !cardNumber || !expiry || !cvv}
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  </div>
  
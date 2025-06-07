<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '$lib/stores';

	let username = '';
	let password = '';
	let error = '';
	let loading = false;
    let isLoggedIn = false;

	// async function handleLogin() {
	// 	loading = true;
	// 	error = '';

	// 	// Fake login check
	// 	setTimeout(() => {
	// 		if (username === 'admin@example.com' && password === 'admin123') {
	// 			alert('Login successful!');
    //             isLoggedIn = true;
	// 			goto('/admin');
	// 		} else {
	// 			error = 'Invalid email or password.';
	// 		}
	// 		loading = false;
	// 	}, 1000);
	// }

	async function handleLogin() {
		loading = true;
		error = '';
		try {
			await login(username, password);
			goto('/admin');
		} catch (error) {
			error = 'Invalid username or password.';
		}
		loading = false;
	}

</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
	<div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6 border border-gray-200">
		<h2 class="text-2xl font-bold text-center text-gray-800">Admin Login</h2>

		{#if error}
			<p class="text-sm text-red-500 text-center">{error}</p>
		{/if}

		<div class="space-y-4">
			<form on:submit|preventDefault={handleLogin}>
			<div>
				
				<label class="block text-sm font-medium text-gray-700 mb-1" for="email">Email</label>
				<input
					id="email"
					type="email"
					bind:value={username}
					class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
					placeholder="admin@example.com"
				/>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1" for="password">Password</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
					placeholder="********"
				/>
			</div>

			<button
				on:click={handleLogin}
				class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md shadow transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
				disabled={loading}
			>
				{loading ? 'Logging in...' : 'Login'}
			</button>
			</form>
		</div>
	</div>
    
</div>

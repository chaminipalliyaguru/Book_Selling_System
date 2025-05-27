import { writable } from "svelte/store";

export const books = writable([
	{
		id: 1,
		title: "Clean Code",
		author: "Robert C. Martin",
		price: 25,
		image: "https://m.media-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg"
	},
	{
		id: 2,
		title: "Atomic Habits",
		author: "James Clear",
		price: 18,
		image: "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg"
	},
	{
		id: 3,
		title: "The Pragmatic Programmer",
		author: "Andrew Hunt & David Thomas",
		price: 28,
		image: "https://m.media-amazon.com/images/I/518FqJvR9aL._SX377_BO1,204,203,200_.jpg"
	}
	
]);

export const cart = writable([]);

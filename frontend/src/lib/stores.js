import { writable } from "svelte/store";

export const books = writable([
	{ id: 1, title: "Clean Code", author: "Robert C. Martin", price: 25 },
	{ id: 2, title: "Atomic Habits", author: "James Clear", price: 18 },
	{ id: 3, title: "Deep Work", author: "Cal Newport", price: 22 }
]);

export const cart = writable([]);

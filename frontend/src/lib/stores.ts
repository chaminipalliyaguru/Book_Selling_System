import { writable } from 'svelte/store';


export interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    image: string;
}

export const books = writable<Book[]>([]);
export const cart = writable<Book[]>([]);

// Function to fetch books from the GraphQL API
export async function fetchBooks() {
    const query = `
        query {
            books {
                id
                title
                author
                price
                image
            }
        }
    `;

    try {
        const response = await fetch('http://localhost:8080/query', {
            method: 'POST', // ✅ GraphQL always uses POST (not GET)
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        if (data.data?.books) {
            books.set(data.data.books);
        }
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

// Function to add a book
export async function addBook(book: Omit<Book, 'id'>) {
    const query = `
        mutation CreateBook($input: NewBook!) {
            createBook(input: $input) {
                id
                title
                author
                price
                image
            }
        }
    `;

    try {
        const response = await fetch('http://localhost:8080/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: { input: book } // ✅ 'input' must match backend schema
            }),
        });

        const data = await response.json();
        if (data.data?.createBook) {
            books.update(all => [...all, data.data.createBook]);
        }
    } catch (error) {
        console.error('Error adding book:', error);
    }
}

// Function to edit a book
export async function UpdateBook(book: Book) {
    const query = `
        mutation UpdateBook($id: ID!, $input: NewBook!) {
            updateBook(id: $id, input: $input) {
                id
                title
                author
                price
                image
            }
        }
    `;

    const variables = {
        id: book.id,
        input: {
            title: book.title,
            author: book.author,
            price: parseFloat(book.price), 
            image: book.image,
        }
    };

    try {
        const response = await fetch('http://localhost:8080/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, variables }),
        });

        const data = await response.json();
        if (data.data?.updateBook) {
            books.update(all => all.map(b => b.id === book.id ? data.data.updateBook : b));
        } else {
            console.error("Update failed:", data.errors || data);
        }
    } catch (error) {
        console.error('Error editing book:', error);
    }
}

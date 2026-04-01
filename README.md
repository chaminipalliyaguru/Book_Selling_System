# Book Selling System

A full-stack **Book Selling System** with a **SvelteKit (TypeScript) frontend** and a **Go backend** exposing a **GraphQL API** (gqlgen) backed by **SQLite**.

## Tech Stack

### Frontend
- SvelteKit + TypeScript (Vite)
- GraphQL client libraries
- Tailwind CSS

### Backend
- Go (gqlgen GraphQL server)
- GORM + SQLite
- Gorilla Mux + CORS middleware

## Repository Structure

- `frontend/` — SvelteKit web app
- `backend/` — Go GraphQL server + SQLite database + static image serving

## Features (from GraphQL schema)
- List books: `books`
- CRUD:
  - `createBook(input: NewBook!)`
  - `updateBook(id: ID!, input: NewBook!)`
  - `deleteBook(id: ID!)`

## Screenshot
<img width="1844" height="921" alt="image" src="https://github.com/user-attachments/assets/f6373ba5-039b-4624-b8f7-2f922028fc64" />
<img width="1832" height="916" alt="image" src="https://github.com/user-attachments/assets/fde3b79c-a241-4f03-b875-ef8223ca81c7" />




## Getting Started (Local Development)

### Prerequisites
- Node.js + npm (for the frontend)
- Go toolchain (for the backend)

---

## 1) Run the Backend (Go + GraphQL)

```bash
cd backend
go mod download
go run .
```

Backend starts on:
- GraphQL Playground: `http://localhost:8080/`
- GraphQL endpoint: `http://localhost:8080/query`

### Images
The backend serves files under `backend/images/` at:
- `http://localhost:8080/images/<filename>`

> Note: CORS is configured to allow `http://localhost:5173` (the default Vite dev server).

---

## 2) Run the Frontend (SvelteKit)

```bash
cd frontend
npm install
npm run dev
```

Frontend dev server typically runs at:
- `http://localhost:5173`

---

## Environment / Configuration Notes
- Backend port can be set using `PORT` (defaults to `8080`).
- The backend uses SQLite (you will see `.db` files in `backend/`).
- The `login` mutation returns a token (JWT library is included). How you store/use that token depends on the frontend implementation.

## Example GraphQL Operations

### Query: List Books
```graphql
query {
  books {
    id
    title
    author
    price
    image
  }
}
```

### Mutation: Create Book
```graphql
mutation {
  createBook(input: { title: "Clean Code", author: "Robert C. Martin", price: 29.99, image: "clean-code.jpg" }) {
    id
    title
  }
}
```

## Contributing
1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Open a Pull Request

## License
No license file is currently included. If you want, add a `LICENSE` file (MIT/Apache-2.0/etc.).

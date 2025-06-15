import { json } from "@sveltejs/kit";

export async function POST({ request, cookies }) {
  const { email, password } = await request.json();

  const query = `
        mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password)
        }
    `;
  const variables = { email, password };

  const response = await fetch("http://localhost:8080/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();

  if (!data.data?.login) {
    return json({ error: "Login failed" }, { status: 401 });
  }

  // Save token in cookie
  cookies.set("token", data.data.login, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return json({ success: true });
}

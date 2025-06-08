import { redirect } from "@sveltejs/kit";

export function load({ cookies }) {
    const token = cookies.get("token");
    if (!token) {
        redirect(302, "/login");
    }
}
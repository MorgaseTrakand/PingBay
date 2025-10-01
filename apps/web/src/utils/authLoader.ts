import { redirect } from "react-router-dom";

export async function authLoader() {
  const res = await fetch(import.meta.env.VITE_VERIFY_URL, { credentials: "include" });
  if (!res.ok) {
    return redirect("/login");
  }
  return null;
}
import { redirect } from "react-router-dom";

export async function authLoader() {
  const res = await fetch(import.meta.env.VITE_VERIFY_URL, { credentials: "include" });
  console.log(res)
  if (!res.ok) {
    console.log('huh')
    return redirect("/login");
  } else {
    console.log('verified')
  }
  return null;
}
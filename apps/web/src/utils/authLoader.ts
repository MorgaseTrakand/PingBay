import { redirect } from "react-router-dom";
import { useUpdateUserState } from "@/lib/zustand"

export async function authLoader() {
  const set = useUpdateUserState.getState().set;
  const res = await fetch(import.meta.env.VITE_VERIFY_URL, { credentials: "include" });
  if (!res.ok) {
    set(false);
    return redirect("/login");
  }
  return null;
}

export async function updateUserState() {
  const set = useUpdateUserState.getState().set;
  const res = await fetch(import.meta.env.VITE_VERIFY_URL, { credentials: "include" });
  if (!res.ok) {
    set(false);
  }
  return null;
}
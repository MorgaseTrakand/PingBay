import { useUpdateUserState } from "@/lib/zustand"

export default function useAuth() {
  const set = useUpdateUserState.getState().set;
  
  async function signup(email: string, password: string) {
    let response = await fetch(import.meta.env.VITE_SIGNUP_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password })
      })
      if (!response.ok) {
        let errorMessage = await response.json()
        return { error: errorMessage.error }
      }
      let data = await response.json();
      set(true)
      return data
  }

  async function login(email: string, password: string) {
    let response = await fetch(import.meta.env.VITE_LOGIN_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email: email, password: password })
    })
    if (!response.ok) {
      let errorMessage = await response.json()
      return {error: errorMessage.error };
    }
    let data = await response.json();
    set(true)
    
    return data
  }

  async function logout() {
    let response = await fetch(import.meta.env.VITE_LOGOUT_URL, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    if (response.ok) {
      set(false)
    }
  } 

  return {
    signup,
    login,
    logout,
  }
};
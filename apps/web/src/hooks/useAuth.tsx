export default function useAuth() {
  async function signup(email: string, password: string) {
    let response = await fetch(import.meta.env.VITE_SIGNUP_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password })
      })
      let data = await response.json()
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
    let data = await response.json();
    return data
  }

  async function logout() {
    await fetch(import.meta.env.VITE_LOGOUT_URL, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
  } 

  return {
    signup,
    login,
    logout,
  }
};
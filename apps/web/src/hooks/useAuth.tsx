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

  function logout() {

  } 

  return {
    signup,
    login,
    logout,
  }
};
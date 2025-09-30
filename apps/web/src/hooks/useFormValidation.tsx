export default function useFormValidation() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d).{8,}$/; 

  function checkForm(email: string, password: string) {
    const errors: { email?: string; password?: string } = {};

    if (!emailRegex.test(email)) {
      errors.email = "Invalid Email Format";
    }

    if (!passwordRegex.test(password)) {
      errors.password = "Password must be at least 8 characters and include a number"
    }

    return { valid: Object.keys(errors).length === 0, errors };
  }

  
  return {
    checkForm,
  }
};
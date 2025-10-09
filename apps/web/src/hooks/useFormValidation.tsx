import validator from 'validator';

export default function useFormValidation() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d).{8,}$/; 

  function checkAuthForm(email: string, password: string) {
    const errors: { email?: string; password?: string } = {};

    if (!emailRegex.test(email)) {
      errors.email = "Invalid Email Format";
    }

    if (!passwordRegex.test(password)) {
      errors.password = "Password must be at least 8 characters and include a number"
    }

    return { valid: Object.keys(errors).length === 0, errors };
  }

  function checkEditRowForm(title: string, URL: string) {
    const errors: { title?: string; URL?: string } = {};

    if (validator.isURL(URL) == false || !URL.includes('www.')) {
      errors.URL = "URL invalid. Ensure format matches https://www.url.com";
    }

    if (title.length == 0) {
      errors.title = "Please supply title"
    }

    return { valid: Object.keys(errors).length === 0, errors };
  }

  return {
    checkAuthForm,
    checkEditRowForm
  }
};
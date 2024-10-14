export const validatePassword = (
  password?: string,
  passwordConfirmation?: string,
) => {
  if (!password) return 'Field is required'
  if (password.length < 6) return 'Password must have at least 6 characters'
  if (passwordConfirmation && password !== passwordConfirmation)
    return 'Passwords do not match'
  return true
}

export const validateEmail = (email?: string) => {
  if (!email) return 'Field is required'
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
    return 'Invalid email address'
  return true
}

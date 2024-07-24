export enum SignUpErrors {
  EMAIL_EXISTS = 'The email address is already in use by another account.',
  TOO_MANY_ATTEMPTS_TRY_LATER = 'We have blocked all requests from this device due to unusual activity. Try again later.',
}
export enum SignInErrors {
  EMAIL_NOT_FOUND = 'There is no user corresponding to this email address.',
  INVALID_PASSWORD = 'Invalid password.',
  INVALID_LOGIN_CREDENTIALS = 'Invalid email address or password.',
}

export enum AuthFormErrors {
  PASSWORD_IS_TO_SHORT = 'Password must contain at least 8 characters.',
  INVALID_EMAIL = 'Please enter valid email address.',
}

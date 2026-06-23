// src/validators/authValidators.js
// Reusable, pure validation functions – zero dependencies, extremely fast.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_LOWER = /[a-z]/;
const PASSWORD_UPPER = /[A-Z]/;
const PASSWORD_DIGIT = /[0-9]/;
const PASSWORD_SPECIAL = /[^a-zA-Z0-9]/;

export function validateFirstName(value) {
  if (!value || value.trim().length === 0) return 'First name is required.';
  if (value.trim().length < 2) return 'First name must be at least 2 characters.';
  if (value.trim().length > 15) return 'First name must be at most 15 characters.';
  return '';
}

export function validateLastName(value) {
  if (!value || value.trim().length === 0) return 'Last name is required.';
  if (value.trim().length < 2) return 'Last name must be at least 2 characters.';
  if (value.trim().length > 15) return 'Last name must be at most 15 characters.';
  return '';
}

export function validateEmail(value) {
  if (!value || value.trim().length === 0) return 'Email is required.';
  if (value.trim().length > 70) return 'Email must be at most 70 characters.';
  if (!EMAIL_REGEX.test(value.trim())) return 'Please enter a valid email address.';
  return '';
}

export function validatePassword(value) {
  if (!value) return 'Password is required.';
  if (value.length < 12) return 'Password must be at least 12 characters.';
  if (value.length > 16) return 'Password must be at most 16 characters.';
  if (!PASSWORD_LOWER.test(value)) return 'Password must include at least one lowercase letter.';
  if (!PASSWORD_UPPER.test(value)) return 'Password must include at least one uppercase letter.';
  if (!PASSWORD_DIGIT.test(value)) return 'Password must include at least one number.';
  if (!PASSWORD_SPECIAL.test(value)) return 'Password must include at least one special character.';
  return '';
}
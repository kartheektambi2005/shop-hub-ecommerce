const NAME_PATTERN = /^\p{L}[\p{L}\s'.-]*$/u;
const POSTAL_CODE_PATTERN = /^[A-Za-z0-9][A-Za-z0-9\s-]{1,8}[A-Za-z0-9]$/;
const EXPIRY_PATTERN = /^(0[1-9]|1[0-2])\/(\d{2})$/;

function validateText(value, label, { min = 1, max = 100, pattern } = {}) {
  const text = value.trim();
  if (!text) return `${label} is required`;
  if (text.length < min) return `${label} must be at least ${min} characters`;
  if (text.length > max) return `${label} must be at most ${max} characters`;
  if (pattern && !pattern.test(text)) return `${label} contains invalid characters`;
  return '';
}

function passesLuhnCheck(digits) {
  let sum = 0;
  for (let index = 0; index < digits.length; index += 1) {
    let digit = Number(digits[digits.length - 1 - index]);
    if (index % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

function validateCardNumber(value) {
  const digits = value.replace(/[\s-]/g, '');
  if (!digits) return 'Card number is required';
  if (!/^\d{13,19}$/.test(digits) || !passesLuhnCheck(digits)) return 'Enter a valid card number';
  return '';
}

function validateExpiry(value, now = new Date()) {
  const match = EXPIRY_PATTERN.exec(value.trim());
  if (!value.trim()) return 'Expiry date is required';
  if (!match) return 'Use the format MM/YY';
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  // A card is valid through the last day of its expiry month.
  const expiresAt = new Date(year, month, 1);
  return expiresAt > now ? '' : 'This card has expired';
}

function validateCvv(value) {
  if (!value.trim()) return 'CVV is required';
  return /^\d{3,4}$/.test(value.trim()) ? '' : 'CVV must be 3 or 4 digits';
}

function validatePostalCode(value) {
  if (!value.trim()) return 'Postal code is required';
  return POSTAL_CODE_PATTERN.test(value.trim()) ? '' : 'Enter a valid postal code';
}

// Runs each rule and keeps only the fields that failed, in form order.
function collectErrors(rules) {
  return Object.fromEntries(Object.entries(rules).filter(([, message]) => message));
}

export function validateCheckout(values) {
  return collectErrors({
    fullName: validateText(values.fullName, 'Full name', { min: 2, max: 60, pattern: NAME_PATTERN }),
    address: validateText(values.address, 'Street address', { min: 5, max: 100 }),
    city: validateText(values.city, 'City', { min: 2, max: 50, pattern: NAME_PATTERN }),
    postalCode: validatePostalCode(values.postalCode),
    country: validateText(values.country, 'Country', { min: 2, max: 56, pattern: NAME_PATTERN }),
    cardNumber: validateCardNumber(values.cardNumber),
    expiry: validateExpiry(values.expiry),
    cvv: validateCvv(values.cvv),
  });
}

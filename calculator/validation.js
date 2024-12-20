export function validateField(fieldId, errorId, validationFunction) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  const isValid = validationFunction(field.value.trim());

  if (isValid) {
    error.style.display = 'none';
    field.classList.remove('error');
  } else {
    error.style.display = 'block';
    field.classList.add('error');
  }

  validateAllFields();
}

export function validateAllFields() {
  const fields = ['userName', 'userPhone', 'userEmail', 'userZip', 'sqft', 'demoType'];
  const isValid = fields.every(fieldId => {
    const field = document.getElementById(fieldId);
    return field.checkValidity();
  });

  document.getElementById('submitButton').disabled = !isValid;
}

export function validateName(name) {
  return name.length > 0 && /^[A-Za-z\s]+$/.test(name);
}

export function validatePhone(phone) {
  return phone.length === 0 || /^[0-9]{10}$/.test(phone);
}

export function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export function validateZip(zip) {
  return zip.length === 5 && /^[0-9]{5}$/.test(zip);
}

export function validateSqft(sqft) {
  const sqftValue = parseFloat(sqft);
  return !isNaN(sqftValue) && sqftValue >= 100 && sqftValue <= 10000;
}

export function validateDemoType(demoType) {
  return demoType !== '';
}

// validation.js
const REGEX = {
  NAME: /^[A-Za-z\s]{1,30}$/, // Только буквы и пробелы, длиной до 30 символов
  PHONE: /^\d{10}$/,          // Ровно 10 цифр
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Формат email
  ZIP: /^\d{5}$/,             // Ровно 5 цифр
};

const validateField = (input, errorElement, regex) => {
  const value = input.value.trim();
  if (value === '') {
    input.classList.remove('error');
    errorElement.style.display = 'none';
    return false; // Пустое поле считаем невалидным
  } else if (!regex.test(value)) {
    input.classList.add('error');
    errorElement.style.display = 'block';
    return false;
  } else {
    input.classList.remove('error');
    errorElement.style.display = 'none';
    return true;
  }
};

export const validateName = (input, errorElement) => validateField(input, errorElement, REGEX.NAME);
export const validatePhone = (input, errorElement) => validateField(input, errorElement, REGEX.PHONE);
export const validateEmail = (input, errorElement) => validateField(input, errorElement, REGEX.EMAIL);
export const validateZip = (input, errorElement) => validateField(input, errorElement, REGEX.ZIP);

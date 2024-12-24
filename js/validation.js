const REGEX = {
  NAME: /^[A-Za-z\s]{1,30}$/, // Только буквы и пробелы, длиной до 30 символов
  PHONE: /^\d{10}$/,          // Ровно 10 цифр
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Формат email
  ZIP: /^\d{5}$/,             // Ровно 5 цифр
  SQFT: /^\d+$/,              // Только целые числа
};

const validateField = (input, errorElement, regex, minValue = null, maxValue = null) => {
  const value = input.value.trim();

  // Проверка на пустое значение
  if (value === '') {
    input.classList.remove('error');
    errorElement.style.display = 'none';
    return false; // Пустое поле считаем невалидным
  }

  // Проверка на соответствие регулярному выражению
  if (!regex.test(value)) {
    input.classList.add('error');
    errorElement.style.display = 'block';
    return false;
  }

  // Проверка на минимальное и максимальное значение (если указаны)
  if (minValue !== null && maxValue !== null) {
    const numericValue = parseFloat(value);
    if (numericValue < minValue || numericValue > maxValue) {
      input.classList.add('error');
      errorElement.style.display = 'block';
      return false;
    }
  }

  // Если все проверки пройдены
  input.classList.remove('error');
  errorElement.style.display = 'none';
  return true;
};

// Экспортируем функции валидации
export const validateName = (input, errorElement) => validateField(input, errorElement, REGEX.NAME);
export const validatePhone = (input, errorElement) => validateField(input, errorElement, REGEX.PHONE);
export const validateEmail = (input, errorElement) => validateField(input, errorElement, REGEX.EMAIL);
export const validateZip = (input, errorElement) => validateField(input, errorElement, REGEX.ZIP);

// Валидация для поля sqft
export const validateSqft = (input, errorElement) => {
  const minValue = 100;
  const maxValue = 10000;
  return validateField(input, errorElement, REGEX.SQFT, minValue, maxValue);
};

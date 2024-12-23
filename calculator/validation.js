// Функция для валидации отдельного поля
export function validateField(fieldId, errorId, validationFunction) {
  // Получаем поле и элемент ошибки по их ID
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  // Проверяем валидность значения поля с помощью переданной функции
  const isValid = validationFunction(field.value.trim());

  // Если поле валидно, скрываем ошибку и убираем класс ошибки
  if (isValid) {
    error.style.display = 'none';
    field.classList.remove('error');
  } else {
    // Если поле не валидно, показываем ошибку и добавляем класс ошибки
    error.style.display = 'block';
    field.classList.add('error');
  }

  // Вызываем функцию для проверки всех полей
  validateAllFields();
}

// Функция для проверки валидности всех полей
export function validateAllFields() {
  // Список ID полей, которые нужно проверить
  const fields = ['userName', 'userPhone', 'userEmail', 'userZip', 'sqft', 'demoType', 'material'];

  // Проверяем, есть ли поле stairCount и добавляем его в список, если оно видимо
  const stairCountField = document.getElementById('stairCount');
  if (!stairCountField.classList.contains('hidden')) {
    fields.push('stairCount');
  }

  // Проверяем валидность каждого поля
  const isValid = fields.every(fieldId => {
    const field = document.getElementById(fieldId);
    return field.checkValidity();
  });

  // Включаем или отключаем кнопку отправки в зависимости от валидности всех полей
  document.getElementById('submitButton').disabled = !isValid;

  // Если все поля валидны, обновляем Total Cost
  if (isValid) {
    calculateTotalCost();
  } else {
    document.getElementById('totalCost').classList.add('hidden');
  }
}

// Функция для валидации имени
export function validateName(name) {
  // Имя должно быть не пустым и содержать только буквы и пробелы
  return name.length > 0 && /^[A-Za-z\s]+$/.test(name);
}

// Функция для валидации номера телефона
export function validatePhone(phone) {
  // Телефон может быть пустым или должен содержать ровно 10 цифр
  return phone.length === 0 || /^[0-9]{10}$/.test(phone);
}

// Функция для валидации email
export function validateEmail(email) {
  // Проверяем, что email соответствует стандартному формату
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Функция для валидации почтового индекса
export function validateZip(zip) {
  // Почтовый индекс должен содержать ровно 5 цифр
  return zip.length === 5 && /^[0-9]{5}$/.test(zip);
}

// Функция для валидации площади (sqft)
export function validateSqft(sqft) {
  // Преобразуем значение в число
  const sqftValue = parseFloat(sqft);
  // Проверяем, что значение является числом и находится в диапазоне от 100 до 10000
  return !isNaN(sqftValue) && sqftValue >= 100 && sqftValue <= 10000;
}

// Функция для валидации типа демонтажа
export function validateDemoType(demoType) {
  // Тип демонтажа не должен быть пустым
  return demoType !== '';
}

// Функция для валидации количества ступеней
export function validateStairCount(stairCount) {
  const count = parseInt(stairCount, 10);
  return !isNaN(count) && count >= 1 && count <= 25;
}

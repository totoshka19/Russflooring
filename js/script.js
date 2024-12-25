// Импорт функций валидации из validation.js
import { validateName, validatePhone, validateEmail, validateZip, validateSqft, validateStair } from './validation.js';

// Импорт функций для работы с подсказками (tooltip) из tooltip.js
import { createTooltip, showTooltip, hideTooltip } from './tooltip.js';

// Импорт функций для работы с DOM из dom.js
import {
  getForm,
  getUserDataFields,
  getOptionsFields,
  getDependentFields,
  getLabels,
} from './dom.js';

// Импорт функции для расчета длины плинтусов из calculations.js
import { calculateBaseboardLength } from './calculations.js';

// Импорт функции для управления опциями материалов из materialOptions.js
import { toggleMaterialOptions } from './materialOptions.js';

// Ожидание загрузки DOM перед выполнением кода
document.addEventListener('DOMContentLoaded', () => {
  // Получение формы и её элементов
  const form = getForm();
  const userDataFields = getUserDataFields(); // Поля пользовательских данных
  const optionsFields = getOptionsFields();   // Поля опций
  const dependentFields = getDependentFields(); // Зависимые поля
  const labels = getLabels(); // Метки (labels) для зависимых полей

  // Создание подсказки (tooltip) с текстом
  const tooltip = createTooltip('Please fill in the contact details first.');

  // Объект с функциями валидации для каждого поля
  const validateFields = {
    userName: (field) => validateName(field.input, field.error), // Валидация имени
    userPhone: (field) => validatePhone(field.input, field.error), // Валидация телефона
    userEmail: (field) => validateEmail(field.input, field.error), // Валидация email
    userZip: (field) => validateZip(field.input, field.error), // Валидация почтового индекса
    sqft: (field) => validateSqft(field.input, field.error), // Валидация площади (sqft)
    stairCount: (field) => validateStair(field.input, field.error), // Валидация количества ступеней
  };

  // Функция для проверки валидности всей формы
  const validateForm = () => Object.values(userDataFields).every((field) => validateFields[field.input.id](field));

  // Функция для включения/отключения зависимых полей и меток
  const toggleDependentFields = (isEnabled) => {
    dependentFields.forEach((field) => (field.disabled = !isEnabled)); // Включение/отключение полей
    labels.forEach((label) => label.classList.toggle('disabled', !isEnabled)); // Включение/отключение меток
  };

  // Функция для обновления отображения длины плинтусов
  const updateBaseboardLength = () => {
    const sqft = parseFloat(optionsFields.sqft.input.value); // Получение значения площади
    const isSqftValid = !isNaN(sqft) && sqft > 0 && optionsFields.sqft.error.style.display === 'none'; // Проверка валидности sqft
    const hasBaseboardCheckbox = dependentFields.find((field) => field.id === 'hasBaseboard'); // Чекбокс "Нужен ли плинтус"
    const baseboardLengthResult = dependentFields.find((field) => field.id === 'baseboardLengthResult'); // Элемент для отображения результата
    const baseboardLengthSpan = dependentFields.find((field) => field.id === 'baseboardLength'); // Элемент для отображения длины плинтуса

    // Если sqft валидно и чекбокс отмечен, обновляем результат
    if (isSqftValid && hasBaseboardCheckbox.checked) {
      baseboardLengthSpan.textContent = calculateBaseboardLength(sqft); // Расчет длины плинтуса
      baseboardLengthResult.classList.remove('hidden'); // Показываем результат
    } else {
      baseboardLengthResult.classList.add('hidden'); // Скрываем результат
    }
  };

  // Обработчик изменения состояния чекбокса или поля sqft
  const handleBaseboardChange = () => updateBaseboardLength();

  // Обработчик изменения выбора материала
  const handleMaterialChange = (event) => toggleMaterialOptions(event.target.value);

  // Обработчик события input (ввод данных в поля формы)
  form.addEventListener('input', (event) => {
    const field = userDataFields[event.target.id] || optionsFields[event.target.id]; // Получаем поле по ID
    if (field) validateFields[field.input.id](field); // Валидируем поле
    toggleDependentFields(validateForm()); // Включаем/отключаем зависимые поля
    updateBaseboardLength(); // Обновляем длину плинтуса
  });

  // Обработчик события change (изменение состояния чекбоксов или выпадающих списков)
  form.addEventListener('change', (event) => {
    if (event.target.id === 'hasBaseboard' || event.target.id === 'sqft') {
      handleBaseboardChange(); // Обновляем длину плинтуса
    } else if (event.target.id === 'material') {
      handleMaterialChange(event); // Управляем опциями материалов
    } else if (event.target.id === 'hasStairs') {
      const stairsField = dependentFields.find((field) => field.id === 'stairsField'); // Поле для ввода количества ступеней
      stairsField.classList.toggle('hidden', !event.target.checked); // Показываем/скрываем поле
      if (!event.target.checked) optionsFields.stairCount.error.style.display = 'none'; // Скрываем ошибку, если чекбокс не отмечен
    }
  });

  // Обработчик события mouseover (наведение курсора на элемент)
  form.addEventListener('mouseover', (event) => {
    if (dependentFields.includes(event.target) || labels.includes(event.target)) {
      showTooltip(tooltip, event, form); // Показываем подсказку
    }
  });

  // Обработчик события mouseout (уход курсора с элемента)
  form.addEventListener('mouseout', () => hideTooltip(tooltip)); // Скрываем подсказку

  // Изначально блокируем зависимые поля и метки
  toggleDependentFields(false);

  // Изначально обновляем длину плинтуса
  updateBaseboardLength();

  // Изначально скрываем все дополнительные опции материалов
  toggleMaterialOptions('');
});

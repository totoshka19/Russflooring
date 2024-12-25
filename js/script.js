import { validateName, validatePhone, validateEmail, validateZip, validateSqft, validateStair } from './validation.js';
import { createTooltip, showTooltip, hideTooltip } from './tooltip.js';
import {
  getForm,
  getUserDataFields,
  getOptionsFields,
  getDependentFields,
  getLabels,
} from './dom.js';
import { calculateBaseboardLength } from './calculations.js'; // Импорт функции расчета длины плинтусов
import { toggleMaterialOptions } from './materialOptions.js'; // Импорт функции для показа/скрытия опций

document.addEventListener('DOMContentLoaded', () => {
  const form = getForm();

  const userDataFields = getUserDataFields();
  const optionsFields = getOptionsFields();
  const dependentFields = getDependentFields();
  const labels = getLabels();

  // Создаем tooltip
  const tooltip = createTooltip('Please fill in the contact details first.');

  // Объект с функциями валидации
  const validateFields = {
    userName: (field) => validateName(field.input, field.error),
    userPhone: (field) => validatePhone(field.input, field.error),
    userEmail: (field) => validateEmail(field.input, field.error),
    userZip: (field) => validateZip(field.input, field.error),
    sqft: (field) => validateSqft(field.input, field.error),
  };

  // Функция для валидации формы
  const validateForm = () => Object.values(userDataFields).every((field) => validateFields[field.input.id](field));

  // Функция для включения/отключения зависимых полей
  const toggleDependentFields = (isEnabled) => {
    dependentFields.forEach((field) => (field.disabled = !isEnabled));
    labels.forEach((label) => label.classList.toggle('disabled', !isEnabled));
  };

  // Делегирование событий
  form.addEventListener('input', (event) => {
    const field = userDataFields[event.target.id] || optionsFields[event.target.id];

    if (field) {
      validateFields[field.input.id](field);
    }

    // Проверяем, прошла ли форма валидацию
    const isFormValid = validateForm();
    toggleDependentFields(isFormValid);

    // Обновляем состояние текста Approximate Baseboard Length
    updateBaseboardLength();
  });

  // Изначально блокируем зависимые поля и надписи
  toggleDependentFields(false);

  // Добавляем обработчики для показа подсказки
  dependentFields.forEach((field) => {
    field.addEventListener('mouseenter', (event) => showTooltip(tooltip, event, form));
    field.addEventListener('mouseleave', () => hideTooltip(tooltip));
  });

  // Добавляем обработчики для показа подсказки на labels
  labels.forEach((label) => {
    label.addEventListener('mouseenter', (event) => showTooltip(tooltip, event, form));
    label.addEventListener('mouseleave', () => hideTooltip(tooltip));
  });

  // Получаем элементы через dom.js
  const hasBaseboardCheckbox = dependentFields.find((field) => field.id === 'hasBaseboard');
  const sqftInput = optionsFields.sqft.input;
  const baseboardLengthResult = dependentFields.find((field) => field.id === 'baseboardLengthResult');
  const baseboardLengthSpan = dependentFields.find((field) => field.id === 'baseboardLength');
  const materialSelect = dependentFields.find((field) => field.id === 'material');

  // Функция для расчета длины плинтусов
  const calculateBaseboardLengthWrapper = () => {
    const sqft = parseFloat(sqftInput.value);

    // Проверяем, что sqft валидное число, больше нуля, и ошибка валидации скрыта
    const isSqftValid = !isNaN(sqft) && sqft > 0 && optionsFields.sqft.error.style.display === 'none';

    if (!isSqftValid || !hasBaseboardCheckbox.checked) {
      baseboardLengthResult.classList.add('hidden');
      return;
    }

    // Используем функцию из calculations.js для расчета длины плинтусов
    baseboardLengthSpan.textContent = calculateBaseboardLength(sqft);
    baseboardLengthResult.classList.remove('hidden');
  };

  // Функция для обновления состояния текста Approximate Baseboard Length
  const updateBaseboardLength = () => {
    if (hasBaseboardCheckbox.checked) {
      calculateBaseboardLengthWrapper();
    } else {
      baseboardLengthResult.classList.add('hidden');
    }
  };

  // Обработчик изменения чекбокса и поля sqft
  const handleBaseboardChange = () => updateBaseboardLength();
  hasBaseboardCheckbox.addEventListener('change', handleBaseboardChange);
  sqftInput.addEventListener('input', handleBaseboardChange);

  // Изначально скрываем текст, если чекбокс не отмечен или sqft пустое
  updateBaseboardLength();

  // Обработчик изменения выбора материала
  materialSelect.addEventListener('change', (event) => {
    const selectedMaterial = event.target.value;
    toggleMaterialOptions(selectedMaterial); // Используем функцию из materialOptions.js
  });

  // Изначально скрываем все дополнительные опции
  toggleMaterialOptions('');

  // Находим чекбокс и элемент stairsField
  const stairCountField = optionsFields.stairCount;
  const hasStairsCheckbox = document.getElementById('hasStairs');
  const stairsField = document.getElementById('stairsField');

  // Валидация при вводе данных в поле stairCount
  stairCountField.input.addEventListener('input', () => {
    validateStair(stairCountField.input, stairCountField.error);
  });

  // Добавляем обработчик события change на чекбокс
  hasStairsCheckbox.addEventListener('change', () => {
    if (hasStairsCheckbox.checked) {
      // Если чекбокс отмечен, показываем stairsField
      stairsField.classList.remove('hidden');
    } else {
      // Если чекбокс не отмечен, скрываем stairsField
      stairsField.classList.add('hidden');
      stairCountField.error.style.display = 'none'; // Скрываем ошибку
    }
  });
});

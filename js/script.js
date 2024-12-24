import { validateName, validatePhone, validateEmail, validateZip, validateSqft } from './validation.js';
import { createTooltip, showTooltip, hideTooltip } from './tooltip.js';
import {
  getForm,
  getUserDataFields,
  getOptionsFields,
  getDependentFields,
  getLabels,
} from './dom.js';

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

  // Добавляем обработчик для чекбокса "Do you need baseboard replacement?"
  const hasBaseboardCheckbox = document.getElementById('hasBaseboard');
  const sqftInput = document.getElementById('sqft');
  const baseboardLengthResult = document.getElementById('baseboardLengthResult');
  const baseboardLengthSpan = document.getElementById('baseboardLength');

  // Функция для расчета длины плинтусов
  const calculateBaseboardLength = () => {
    const sqft = parseFloat(sqftInput.value);

    // Проверяем, что sqft валидное число, больше нуля, и ошибка валидации скрыта
    const isSqftValid = !isNaN(sqft) && sqft > 0 && optionsFields.sqft.error.style.display === 'none';

    if (!isSqftValid || !hasBaseboardCheckbox.checked) {
      baseboardLengthResult.classList.add('hidden');
      return;
    }

    const baseboardLength = 2 * (Math.sqrt(sqft) * 2 + 100);
    baseboardLengthSpan.textContent = baseboardLength.toFixed(2);
    baseboardLengthResult.classList.remove('hidden');
  };

  // Функция для обновления состояния текста Approximate Baseboard Length
  const updateBaseboardLength = () => {
    if (hasBaseboardCheckbox.checked) {
      calculateBaseboardLength();
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
});

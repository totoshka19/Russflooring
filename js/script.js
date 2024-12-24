// script.js
import { validateName, validatePhone, validateEmail, validateZip, validateSqft } from './validation.js';
import { createTooltip, showTooltip, hideTooltip } from './tooltip.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('costCalculator');

  const userDataFields = {
    userName: { input: document.getElementById('userName'), error: document.getElementById('nameError') },
    userPhone: { input: document.getElementById('userPhone'), error: document.getElementById('phoneError') },
    userEmail: { input: document.getElementById('userEmail'), error: document.getElementById('emailError') },
    userZip: { input: document.getElementById('userZip'), error: document.getElementById('zipError') },
  };

  const optionsFields = {
    sqft: { input: document.getElementById('sqft'), error: document.getElementById('sqftError') },
  };

  const dependentFields = [
    document.getElementById('sqft'),
    document.getElementById('demoType'),
    document.getElementById('material'),
    document.getElementById('vinylOption'),
    document.getElementById('laminateOption'),
    document.getElementById('hardwoodOption'),
    document.getElementById('installationType'),
    document.getElementById('stairCount'),
    document.getElementById('hasBaseboard'), // Добавлено поле "Do you need baseboard replacement"
    document.getElementById('hasStairs'),    // Добавлено поле "Do you have stairs"
  ];

  const labels = [
    document.querySelector('label[for="hasBaseboard"]'), // Надпись для "Do you need baseboard replacement?"
    document.querySelector('label[for="hasStairs"]'),    // Надпись для "Do you have stairs?"
  ];

  // Создаем tooltip
  const tooltip = createTooltip('Please fill in the contact details first.');

  const validateUserData = (field) => {
    switch (field.input.id) {
      case 'userName':
        return validateName(field.input, field.error);
      case 'userPhone':
        return validatePhone(field.input, field.error);
      case 'userEmail':
        return validateEmail(field.input, field.error);
      case 'userZip':
        return validateZip(field.input, field.error);
      default:
        return true;
    }
  };

  const validateOptionsData = (field) => {
    switch (field.input.id) {
      case 'sqft':
        return validateSqft(field.input, field.error);
      default:
        return true;
    }
  };

  const validateForm = () => {
    return Object.values(userDataFields).every(validateUserData);
  };

  const toggleDependentFields = (isEnabled) => {
    dependentFields.forEach((field) => {
      field.disabled = !isEnabled;
    });

    // Блокируем или разблокируем надписи
    labels.forEach((label) => {
      if (isEnabled) {
        label.classList.remove('disabled');
      } else {
        label.classList.add('disabled');
      }
    });
  };

  // Делегирование событий
  form.addEventListener('input', (event) => {
    const userField = userDataFields[event.target.id];
    const optionsField = optionsFields[event.target.id];

    if (userField) {
      validateUserData(userField);
    }

    if (optionsField) {
      validateOptionsData(optionsField);
    }

    // Проверяем, прошла ли форма валидацию
    const isFormValid = validateForm();
    toggleDependentFields(isFormValid);
  });

  // Изначально блокируем зависимые поля и надписи
  toggleDependentFields(false);

  // Добавляем обработчики для показа подсказки
  dependentFields.forEach((field) => {
    field.addEventListener('mouseenter', (event) => showTooltip(tooltip, event, form));
    field.addEventListener('mouseleave', () => hideTooltip(tooltip));
  });

  // Добавляем обработчики для надписей
  labels.forEach((label) => {
    label.addEventListener('mouseenter', (event) => showTooltip(tooltip, event, form));
    label.addEventListener('mouseleave', () => hideTooltip(tooltip));
  });
});

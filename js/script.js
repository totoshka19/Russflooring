// script.js
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

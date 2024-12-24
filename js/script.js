// script.js
import { validateName, validatePhone, validateEmail, validateZip } from './validation.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('costCalculator');

  const fields = {
    userName: { input: document.getElementById('userName'), error: document.getElementById('nameError') },
    userPhone: { input: document.getElementById('userPhone'), error: document.getElementById('phoneError') },
    userEmail: { input: document.getElementById('userEmail'), error: document.getElementById('emailError') },
    userZip: { input: document.getElementById('userZip'), error: document.getElementById('zipError') },
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

  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = 'Please fill in the contact details first.';
  document.body.appendChild(tooltip);

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

  const validateForm = () => {
    return Object.values(fields).every(validateUserData);
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

  // Показываем подсказку при попытке взаимодействия с недоступными полями или надписями
  const showTooltip = (event) => {
    if (event.target.disabled || event.target.classList.contains('disabled')) {
      const formRect = form.getBoundingClientRect(); // Получаем границы формы
      const tooltipWidth = tooltip.offsetWidth; // Ширина подсказки
      const tooltipHeight = tooltip.offsetHeight; // Высота подсказки

      let tooltipX = event.pageX + 10; // Позиция X подсказки
      let tooltipY = event.pageY + 10; // Позиция Y подсказки

      // Проверяем, не выходит ли подсказка за правую границу формы
      if (tooltipX + tooltipWidth > formRect.right) {
        tooltipX = formRect.right - tooltipWidth - 10;
      }

      // Проверяем, не выходит ли подсказка за нижнюю границу формы
      if (tooltipY + tooltipHeight > formRect.bottom) {
        tooltipY = formRect.bottom - tooltipHeight - 10;
      }

      // Проверяем, не выходит ли подсказка за левую границу формы
      if (tooltipX < formRect.left) {
        tooltipX = formRect.left + 10;
      }

      // Проверяем, не выходит ли подсказка за верхнюю границу формы
      if (tooltipY < formRect.top) {
        tooltipY = formRect.top + 10;
      }

      tooltip.style.left = `${tooltipX}px`;
      tooltip.style.top = `${tooltipY}px`;
      tooltip.classList.add('visible');
    }
  };

  // Скрываем подсказку, когда курсор уходит с поля или надписи
  const hideTooltip = () => {
    tooltip.classList.remove('visible');
  };

  // Делегирование событий
  form.addEventListener('input', (event) => {
    const field = fields[event.target.id];
    if (field) {
      validateUserData(field);
    }

    // Проверяем, прошла ли форма валидацию
    const isFormValid = validateForm();
    toggleDependentFields(isFormValid);
  });

  // Изначально блокируем зависимые поля и надписи
  toggleDependentFields(false);

  // Добавляем обработчики для показа подсказки
  dependentFields.forEach((field) => {
    field.addEventListener('mouseenter', showTooltip);
    field.addEventListener('mouseleave', hideTooltip);
  });

  // Добавляем обработчики для надписей
  labels.forEach((label) => {
    label.addEventListener('mouseenter', showTooltip);
    label.addEventListener('mouseleave', hideTooltip);
  });
});

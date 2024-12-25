import { validateName, validatePhone, validateEmail, validateZip, validateSqft, validateStair } from './validation.js';
import { createTooltip, showTooltip, hideTooltip } from './tooltip.js';
import {
  getForm,
  getUserDataFields,
  getOptionsFields,
  getDependentFields,
  getLabels,
} from './dom.js';
import { calculateBaseboardLength, calculateTotalCost } from './calculations.js'; // Импортируем calculateTotalCost
import { toggleMaterialOptions } from './materialOptions.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = getForm();
  const userDataFields = getUserDataFields(); // Первые 4 поля (контактные данные)
  const optionsFields = getOptionsFields();   // Поля опций (sqft, stairCount)
  const dependentFields = getDependentFields(); // Зависимые поля (все остальные поля)
  const labels = getLabels(); // Метки (labels) для зависимых полей
  const tooltip = createTooltip('Please fill in the contact details first.');

  // Получаем кнопку CALCULATE
  const submitButton = document.getElementById('submitButton');

  // Получаем элемент для отображения общей стоимости
  const totalCostElement = document.getElementById('totalCost');
  const costAmountElement = document.getElementById('costAmount');

  // Объект с функциями валидации для каждого поля
  const validateFields = {
    userName: (field) => validateName(field.input, field.error),
    userPhone: (field) => validatePhone(field.input, field.error),
    userEmail: (field) => validateEmail(field.input, field.error),
    userZip: (field) => validateZip(field.input, field.error),
    sqft: (field) => validateSqft(field.input, field.error),
    stairCount: (field) => validateStair(field.input, field.error),
  };

  // Функция для проверки валидности первых 4 полей (контактные данные)
  const validateContactFields = () => {
    return Object.values(userDataFields).every((field) => validateFields[field.input.id](field));
  };

  // Функция для проверки валидности всех обязательных полей
  const validateAllFields = () => {
    // Проверяем первые 4 поля (контактные данные)
    const isContactFieldsValid = validateContactFields();
    if (!isContactFieldsValid) return false; // Если первые 4 поля не валидны, форма не валидна

    // Проверяем поле sqft
    const isSqftValid = validateSqft(optionsFields.sqft.input, optionsFields.sqft.error);
    if (!isSqftValid) return false; // Если поле sqft не валидно, форма не валидна

    // Проверяем поле demoType
    const demoTypeInput = document.getElementById('demoType');
    if (!demoTypeInput.value) return false; // Если поле demoType не заполнено, форма не валидна

    // Проверяем поле material
    const materialInput = document.getElementById('material');
    if (!materialInput.value) return false; // Если поле material не заполнено, форма не валидна

    // Проверяем поле stairCount, если оно видимо
    const stairsField = dependentFields.find((field) => field.id === 'stairsField');
    if (!stairsField.classList.contains('hidden')) {
      const isStairCountValid = validateStair(optionsFields.stairCount.input, optionsFields.stairCount.error);
      if (!isStairCountValid) return false; // Если поле stairCount не валидно, форма не валидна
    }

    // Если все проверки пройдены, форма валидна
    return true;
  };

  // Функция для включения/отключения зависимых полей и меток
  const toggleDependentFields = (isEnabled) => {
    dependentFields.forEach((field) => (field.disabled = !isEnabled)); // Включаем/отключаем поля
    labels.forEach((label) => label.classList.toggle('disabled', !isEnabled)); // Включаем/отключаем метки
  };

  // Функция для обновления отображения длины плинтусов
  const updateBaseboardLength = () => {
    const sqft = parseFloat(optionsFields.sqft.input.value);
    const isSqftValid = !isNaN(sqft) && sqft > 0 && optionsFields.sqft.error.style.display === 'none';
    const hasBaseboardCheckbox = dependentFields.find((field) => field.id === 'hasBaseboard');
    const baseboardLengthResult = dependentFields.find((field) => field.id === 'baseboardLengthResult');
    const baseboardLengthSpan = dependentFields.find((field) => field.id === 'baseboardLength');

    if (isSqftValid && hasBaseboardCheckbox.checked) {
      baseboardLengthSpan.textContent = calculateBaseboardLength(sqft);
      baseboardLengthResult.classList.remove('hidden');
    } else {
      baseboardLengthResult.classList.add('hidden');
    }
  };

  // Обработчик изменения состояния чекбокса или поля sqft
  const handleBaseboardChange = () => updateBaseboardLength();

  // Обработчик изменения выбора материала
  const handleMaterialChange = (event) => toggleMaterialOptions(event.target.value);

  // Обработчик нажатия на кнопку CALCULATE
  submitButton.addEventListener('click', () => {
    const totalCost = calculateTotalCost(); // Используем функцию из calculations.js
    costAmountElement.textContent = totalCost;
    totalCostElement.classList.remove('hidden');
  });

  // Функция для обновления состояния кнопки CALCULATE и скрытия totalCost
  const updateSubmitButton = () => {
    const isFormValid = validateAllFields(); // Проверяем валидность всех обязательных полей
    submitButton.disabled = !isFormValid; // Активируем или деактивируем кнопку

    // Если форма не валидна, скрываем поле totalCost
    if (!isFormValid) {
      totalCostElement.classList.add('hidden');
    }
  };

  // Обработчик события input (ввод данных в поля формы)
  form.addEventListener('input', (event) => {
    const field = userDataFields[event.target.id] || optionsFields[event.target.id];
    if (field) validateFields[field.input.id](field); // Валидируем поле

    // Если первые 4 поля валидны, разблокируем остальные поля
    if (validateContactFields()) {
      toggleDependentFields(true);
    } else {
      toggleDependentFields(false);
    }

    updateBaseboardLength(); // Обновляем длину плинтуса
    updateSubmitButton(); // Обновляем состояние кнопки CALCULATE и скрываем totalCost

    // Скрываем totalCost при любом изменении данных
    totalCostElement.classList.add('hidden');
  });

  // Обработчик события change (изменение состояния чекбоксов или выпадающих списков)
  form.addEventListener('change', (event) => {
    if (event.target.id === 'hasBaseboard' || event.target.id === 'sqft') {
      handleBaseboardChange(); // Обновляем длину плинтуса
    } else if (event.target.id === 'material') {
      handleMaterialChange(event); // Управляем опциями материалов
    } else if (event.target.id === 'hasStairs') {
      const stairsField = dependentFields.find((field) => field.id === 'stairsField');
      stairsField.classList.toggle('hidden', !event.target.checked);
      if (!event.target.checked) optionsFields.stairCount.error.style.display = 'none';
    }
    updateSubmitButton(); // Обновляем состояние кнопки CALCULATE и скрываем totalCost

    // Скрываем totalCost при любом изменении данных
    totalCostElement.classList.add('hidden');
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

  // Изначально деактивируем кнопку CALCULATE
  submitButton.disabled = true;

  // Изначально скрываем поле totalCost
  totalCostElement.classList.add('hidden');
});

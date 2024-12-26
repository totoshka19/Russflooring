import { validateName, validatePhone, validateEmail, validateZip, validateSqft, validateStair } from './validation.js';
import { createTooltip, showTooltip, hideTooltip } from './tooltip.js';
import {
  form,
  userName,
  userPhone,
  userEmail,
  userZip,
  nameError,
  phoneError,
  emailError,
  zipError,
  sqft,
  stairCount,
  sqftError,
  stairCountError,
  demoType,
  material,
  vinylOption,
  laminateOption,
  hardwoodOption,
  installationType,
  hasBaseboard,
  hasStairs,
  baseboardLengthResult,
  baseboardLength,
  vinylOptions,
  laminateOptions,
  hardwoodOptions,
  installationOnlyOptions,
  stairsField,
  labelHasBaseboard,
  labelHasStairs,
} from './dom.js'; // Импортируем константы
import { calculateBaseboardLength, calculateTotalCost } from './calculations.js'; // Импортируем calculateTotalCost
import { toggleMaterialOptions } from './materialOptions.js';

document.addEventListener('DOMContentLoaded', () => {
  const tooltip = createTooltip('Please fill in the contact details first.');

  // Получаем кнопку CALCULATE
  const submitButton = document.getElementById('submitButton');

  // Получаем элемент для отображения общей стоимости
  const totalCostElement = document.getElementById('totalCost');
  const costAmountElement = document.getElementById('costAmount');

  // Объект с функциями валидации для каждого поля
  const validateFields = {
    userName: () => validateName(userName, nameError),
    userPhone: () => validatePhone(userPhone, phoneError),
    userEmail: () => validateEmail(userEmail, emailError),
    userZip: () => validateZip(userZip, zipError),
    sqft: () => validateSqft(sqft, sqftError),
    stairCount: () => validateStair(stairCount, stairCountError),
  };

  // Функция для проверки валидности первых 4 полей (контактные данные)
  const validateContactFields = () => {
    return (
      validateFields.userName() &&
      validateFields.userPhone() &&
      validateFields.userEmail() &&
      validateFields.userZip()
    );
  };

  // Функция для проверки валидности всех обязательных полей
  const validateAllFields = () => {
    // Проверяем первые 4 поля (контактные данные)
    const isContactFieldsValid = validateContactFields();
    if (!isContactFieldsValid) return false; // Если первые 4 поля не валидны, форма не валидна

    // Проверяем поле sqft
    const isSqftValid = validateFields.sqft();
    if (!isSqftValid) return false; // Если поле sqft не валидно, форма не валидна

    // Проверяем поле demoType
    if (!demoType.value) return false; // Если поле demoType не заполнено, форма не валидна

    // Проверяем поле material
    if (!material.value) return false; // Если поле material не заполнено, форма не валидна

    // Проверяем поле stairCount, если оно видимо
    if (!stairsField.classList.contains('hidden')) {
      const isStairCountValid = validateFields.stairCount();
      if (!isStairCountValid) return false; // Если поле stairCount не валидно, форма не валидна
    }

    // Если все проверки пройдены, форма валидна
    return true;
  };

  // Функция для включения/отключения зависимых полей и меток
  const toggleDependentFields = (isEnabled) => {
    const dependentFields = [
      demoType,
      material,
      vinylOption,
      laminateOption,
      hardwoodOption,
      installationType,
      hasBaseboard,
      hasStairs,
      baseboardLengthResult,
      baseboardLength,
      vinylOptions,
      laminateOptions,
      hardwoodOptions,
      installationOnlyOptions,
      stairsField,
    ];
    dependentFields.forEach((field) => (field.disabled = !isEnabled)); // Включаем/отключаем поля
    [labelHasBaseboard, labelHasStairs].forEach((label) => label.classList.toggle('disabled', !isEnabled)); // Включаем/отключаем метки
  };

  // Функция для обновления отображения длины плинтусов
  const updateBaseboardLength = () => {
    const sqftValue = parseFloat(sqft.value);
    const isSqftValid = !isNaN(sqftValue) && sqftValue > 0 && sqftError.style.display === 'none';

    if (isSqftValid && hasBaseboard.checked) {
      baseboardLength.textContent = calculateBaseboardLength(sqftValue);
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
    const fieldId = event.target.id;
    if (validateFields[fieldId]) validateFields[fieldId](); // Валидируем поле

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
      stairsField.classList.toggle('hidden', !event.target.checked);
      if (!event.target.checked) stairCountError.style.display = 'none';
    }
    updateSubmitButton(); // Обновляем состояние кнопки CALCULATE и скрываем totalCost

    // Скрываем totalCost при любом изменении данных
    totalCostElement.classList.add('hidden');
  });

  // Обработчик события mouseover (наведение курсора на элемент)
  form.addEventListener('mouseover', (event) => {
    const dependentFields = [
      demoType,
      material,
      vinylOption,
      laminateOption,
      hardwoodOption,
      installationType,
      hasBaseboard,
      hasStairs,
      baseboardLengthResult,
      baseboardLength,
      vinylOptions,
      laminateOptions,
      hardwoodOptions,
      installationOnlyOptions,
      stairsField,
    ];
    if (dependentFields.includes(event.target) || [labelHasBaseboard, labelHasStairs].includes(event.target)) {
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

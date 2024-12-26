// dom.js

// Функция для получения элемента по ID
const getElementById = (id) => document.getElementById(id);

// Функция для получения формы
export const getForm = () => getElementById('costCalculator');

// Функция для получения полей пользовательских данных
export const getUserDataFields = () => ({
  userName: { input: getElementById('userName'), error: getElementById('nameError') },
  userPhone: { input: getElementById('userPhone'), error: getElementById('phoneError') },
  userEmail: { input: getElementById('userEmail'), error: getElementById('emailError') },
  userZip: { input: getElementById('userZip'), error: getElementById('zipError') },
});

// Функция для получения полей опций
export const getOptionsFields = () => ({
  sqft: { input: getElementById('sqft'), error: getElementById('sqftError') },
  stairCount: { input: getElementById('stairCount'), error: getElementById('stairCountError') },
});

// Функция для получения всех зависимых полей
export const getDependentFields = () => [
  getElementById('sqft'),
  getElementById('demoType'),
  getElementById('material'),
  getElementById('vinylOption'),
  getElementById('laminateOption'),
  getElementById('hardwoodOption'),
  getElementById('installationType'),
  getElementById('stairCount'),
  getElementById('hasBaseboard'), // Добавлено поле "Do you need baseboard replacement"
  getElementById('hasStairs'),    // Добавлено поле "Do you have stairs"
  getElementById('baseboardLengthResult'),
  getElementById('baseboardLength'),
  getElementById('material'),
  getElementById('vinylOptions'),
  getElementById('laminateOptions'),
  getElementById('hardwoodOptions'),
  getElementById('installationOnlyOptions'),
  getElementById('stairsField')
];

// Функция для получения всех labels
export const getLabels = () => [
  document.querySelector('label[for="hasBaseboard"]'), // Надпись для "Do you need baseboard replacement?"
  document.querySelector('label[for="hasStairs"]'),    // Надпись для "Do you have stairs?"
];

// Функция для получения опций материалов
export const getMaterialOptions = () => ({
  vinyl: getElementById('vinylOptions'),
  laminate: getElementById('laminateOptions'),
  hardwood: getElementById('hardwoodOptions'),
  installationOnly: getElementById('installationOnlyOptions'),
});

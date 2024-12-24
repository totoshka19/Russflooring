// dom.js

// Функция для получения элемента по ID
const getElementById = (id) => document.getElementById(id);

export const getForm = () => getElementById('costCalculator');

export const getUserDataFields = () => ({
  userName: { input: getElementById('userName'), error: getElementById('nameError') },
  userPhone: { input: getElementById('userPhone'), error: getElementById('phoneError') },
  userEmail: { input: getElementById('userEmail'), error: getElementById('emailError') },
  userZip: { input: getElementById('userZip'), error: getElementById('zipError') },
});

export const getOptionsFields = () => ({
  sqft: { input: getElementById('sqft'), error: getElementById('sqftError') },
});

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
];

export const getLabels = () => [
  document.querySelector('label[for="hasBaseboard"]'), // Надпись для "Do you need baseboard replacement?"
  document.querySelector('label[for="hasStairs"]'),    // Надпись для "Do you have stairs?"
];

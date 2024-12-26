// Форма
export const form = document.getElementById('costCalculator');

// Поля пользовательских данных
export const userName = document.getElementById('userName');
export const userPhone = document.getElementById('userPhone');
export const userEmail = document.getElementById('userEmail');
export const userZip = document.getElementById('userZip');

// Ошибки пользовательских данных
export const nameError = document.getElementById('nameError');
export const phoneError = document.getElementById('phoneError');
export const emailError = document.getElementById('emailError');
export const zipError = document.getElementById('zipError');

// Поля опций
export const sqft = document.getElementById('sqft');
export const stairCount = document.getElementById('stairCount');

// Ошибки опций
export const sqftError = document.getElementById('sqftError');
export const stairCountError = document.getElementById('stairCountError');

// Зависимые поля
export const demoType = document.getElementById('demoType');
export const material = document.getElementById('material');
export const vinylOption = document.getElementById('vinylOption');
export const laminateOption = document.getElementById('laminateOption');
export const hardwoodOption = document.getElementById('hardwoodOption');
export const installationType = document.getElementById('installationType');
export const hasBaseboard = document.getElementById('hasBaseboard'); // Поле "Do you need baseboard replacement"
export const hasStairs = document.getElementById('hasStairs');       // Поле "Do you have stairs"
export const baseboardLengthResult = document.getElementById('baseboardLengthResult');
export const baseboardLength = document.getElementById('baseboardLength');
export const vinylOptions = document.getElementById('vinylOptions');
export const laminateOptions = document.getElementById('laminateOptions');
export const hardwoodOptions = document.getElementById('hardwoodOptions');
export const installationOnlyOptions = document.getElementById('installationOnlyOptions');
export const stairsField = document.getElementById('stairsField');

// Labels
export const labelHasBaseboard = document.querySelector('label[for="hasBaseboard"]'); // Надпись для "Do you need baseboard replacement?"
export const labelHasStairs = document.querySelector('label[for="hasStairs"]');       // Надпись для "Do you have stairs?"

// Кнопка CALCULATE и элементы для отображения общей стоимости
export const submitButton = document.getElementById('submitButton');
export const totalCostElement = document.getElementById('totalCost');
export const costAmountElement = document.getElementById('costAmount');

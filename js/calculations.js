// Импортируем константы
import {
  BASEBOARD_COST_PER_FOOT,
  STAIR_COST_PER_STEP,
  INSTALLATION_COST_VINYL,
  INSTALLATION_COST_LAMINATE,
  INSTALLATION_COST_HARDWOOD,
  BASEBOARD_LENGTH_MULTIPLIER,
  BASEBOARD_LENGTH_CONSTANT,
} from './constants.js';

// Импортируем DOM-элементы
import {
  sqft,
  demoType,
  material,
  hasBaseboard,
  hasStairs,
  stairCount,
  vinylOption,
  laminateOption,
  hardwoodOption,
  installationType,
} from './dom.js';

/**
 * Вычисляет длину плинтусов на основе площади в квадратных футах.
 * @param {number} sqft - Площадь в квадратных футах.
 * @returns {number} - Длина плинтусов в футах (целое число).
 */
export const calculateBaseboardLength = (sqft) => {
  return Math.round(BASEBOARD_LENGTH_MULTIPLIER * (Math.sqrt(sqft) * 2 + BASEBOARD_LENGTH_CONSTANT));
};

/**
 * Вычисляет общую стоимость проекта на основе введенных данных.
 * @returns {string} - Общая стоимость проекта, округленная до двух знаков после запятой.
 */
export const calculateTotalCost = () => {
  // Получаем данные из формы
  const sqftValue = parseFloat(sqft.value);
  const demoTypeValue = parseFloat(demoType.value);
  const materialValue = material.value;
  const hasBaseboardChecked = hasBaseboard.checked;
  const hasStairsChecked = hasStairs.checked;
  const stairCountValue = hasStairsChecked ? parseFloat(stairCount.value) : 0;

  // Расчет стоимости демонтажа
  const demoCost = sqftValue * demoTypeValue;

  // Расчет стоимости плинтусов
  const baseboardCost = hasBaseboardChecked ? calculateBaseboardLength(sqftValue) * BASEBOARD_COST_PER_FOOT : 0;

  // Расчет стоимости лестниц
  const stairsCost = hasStairsChecked ? stairCountValue * STAIR_COST_PER_STEP : 0;

  // Расчет стоимости материала и установки
  let materialCost = 0;
  let installationCost = 0;

  switch (materialValue) {
    case 'vinyl':
      const vinylOptionValue = parseFloat(vinylOption.value);
      materialCost = sqftValue * vinylOptionValue;
      installationCost = sqftValue * INSTALLATION_COST_VINYL;
      break;
    case 'laminate':
      const laminateOptionValue = parseFloat(laminateOption.value);
      materialCost = sqftValue * laminateOptionValue;
      installationCost = sqftValue * INSTALLATION_COST_LAMINATE;
      break;
    case 'hardwood':
      const hardwoodOptionValue = parseFloat(hardwoodOption.value);
      materialCost = sqftValue * hardwoodOptionValue;
      installationCost = sqftValue * INSTALLATION_COST_HARDWOOD;
      break;
    case 'installationOnly':
      const installationTypeValue = parseFloat(installationType.value);
      installationCost = sqftValue * installationTypeValue;
      break;
    default:
      break;
  }

  // Общая стоимость
  const totalCost = demoCost + baseboardCost + stairsCost + materialCost + installationCost;

  return totalCost.toFixed(2);
};

// calculations.js

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
  const sqft = parseFloat(document.getElementById('sqft').value);
  const demoType = parseFloat(document.getElementById('demoType').value);
  const material = document.getElementById('material').value;
  const hasBaseboard = document.getElementById('hasBaseboard').checked;
  const hasStairs = document.getElementById('hasStairs').checked;
  const stairCount = hasStairs ? parseFloat(document.getElementById('stairCount').value) : 0;

  // Расчет стоимости демонтажа
  const demoCost = sqft * demoType;

  // Расчет стоимости плинтусов
  const baseboardCost = hasBaseboard ? calculateBaseboardLength(sqft) * BASEBOARD_COST_PER_FOOT : 0;

  // Расчет стоимости лестниц
  const stairsCost = hasStairs ? stairCount * STAIR_COST_PER_STEP : 0;

  // Расчет стоимости материала и установки
  let materialCost = 0;
  let installationCost = 0;

  switch (material) {
    case 'vinyl':
      const vinylOption = parseFloat(document.getElementById('vinylOption').value);
      materialCost = sqft * vinylOption;
      installationCost = sqft * INSTALLATION_COST_VINYL;
      break;
    case 'laminate':
      const laminateOption = parseFloat(document.getElementById('laminateOption').value);
      materialCost = sqft * laminateOption;
      installationCost = sqft * INSTALLATION_COST_LAMINATE;
      break;
    case 'hardwood':
      const hardwoodOption = parseFloat(document.getElementById('hardwoodOption').value);
      materialCost = sqft * hardwoodOption;
      installationCost = sqft * INSTALLATION_COST_HARDWOOD;
      break;
    case 'installationOnly':
      const installationType = parseFloat(document.getElementById('installationType').value);
      installationCost = sqft * installationType;
      break;
    default:
      break;
  }

  // Общая стоимость
  const totalCost = demoCost + baseboardCost + stairsCost + materialCost + installationCost;

  return totalCost.toFixed(2);
};

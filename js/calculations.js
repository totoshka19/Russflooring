// calculations.js

/**
 * Вычисляет длину плинтусов на основе площади в квадратных футах.
 * @param {number} sqft - Площадь в квадратных футах.
 * @returns {number} - Длина плинтусов в футах (целое число).
 */
export const calculateBaseboardLength = (sqft) => {
  return Math.round(2 * (Math.sqrt(sqft) * 2 + 100));
};

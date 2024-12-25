/**
 * Вычисляет длину плинтусов на основе площади в квадратных футах.
 * @param {number} sqft - Площадь в квадратных футах.
 * @returns {number} - Длина плинтусов в футах (целое число).
 */
export const calculateBaseboardLength = (sqft) => {
  return Math.round(2 * (Math.sqrt(sqft) * 2 + 100));
};

/**
 * Вычисляет общую стоимость проекта на основе введенных данных.
 * @returns {string} - Общая стоимость проекта, округленная до двух знаков после запятой.
 */
export const calculateTotalCost = () => {
  const sqft = parseFloat(document.getElementById('sqft').value);
  const demoType = parseFloat(document.getElementById('demoType').value);
  const material = document.getElementById('material').value;
  const hasBaseboard = document.getElementById('hasBaseboard').checked;
  const hasStairs = document.getElementById('hasStairs').checked;
  const stairCount = hasStairs ? parseFloat(document.getElementById('stairCount').value) : 0;

  let materialCost = 0;

  if (material === 'vinyl') {
    materialCost = parseFloat(document.getElementById('vinylOption').value);
  } else if (material === 'laminate') {
    materialCost = parseFloat(document.getElementById('laminateOption').value);
  } else if (material === 'hardwood') {
    materialCost = parseFloat(document.getElementById('hardwoodOption').value);
  } else if (material === 'installationOnly') {
    materialCost = parseFloat(document.getElementById('installationType').value);
  }

  const baseboardCost = hasBaseboard ? calculateBaseboardLength(sqft) * 0.5 : 0; // Примерная стоимость плинтуса
  const stairsCost = hasStairs ? stairCount * 50 : 0; // Примерная стоимость ступеней

  const totalCost = (sqft * (demoType + materialCost)) + baseboardCost + stairsCost;

  return totalCost.toFixed(2);
};

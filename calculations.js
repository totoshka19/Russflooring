import {validateAllFields} from "./validation.js";

// TODO отрефакторить тут

// Функция для расчета длины плинтуса
export function calculateBaseboardLength() {
  // Получаем значение площади в квадратных футах и преобразуем его в число
  const sqft = parseFloat(document.getElementById('sqft').value.trim());
  // Проверяем, установлен ли флажок для плинтуса
  const hasBaseboard = document.getElementById('hasBaseboard').checked;

  // Если флажок установлен и площадь валидна
  if (hasBaseboard && !isNaN(sqft)) {
    // Рассчитываем длину плинтуса
    const baseboardLength = 2 * (Math.sqrt(sqft) * 2 + 100);
    // Отображаем округленное значение длины плинтуса
    document.getElementById('baseboardLength').textContent = Math.round(baseboardLength);
    // Показываем результат расчета
    document.getElementById('baseboardLengthResult').classList.remove('hidden');
  } else {
    // Скрываем результат расчета, если флажок не установлен или площадь не валидна
    document.getElementById('baseboardLengthResult').classList.add('hidden');
    // Устанавливаем значение длины плинтуса в 0
    document.getElementById('baseboardLength').textContent = '0';
  }
}

// Функция для переключения видимости поля ввода количества ступеней
export function toggleStairsField() {
  // Проверяем, установлен ли флажок для наличия лестницы
  const hasStairs = document.getElementById('hasStairs').checked;
  // Получаем элемент поля ввода количества ступеней
  const stairsField = document.getElementById('stairsField');
  // Переключаем видимость поля в зависимости от состояния флажка
  stairsField.classList.toggle('hidden', !hasStairs);

  // Если галочка убрана, очищаем поле
  if (!hasStairs) {
    stairCount.value = '';
  }

  // Вызываем валидацию для обновления состояния формы
  validateAllFields();
}

// Функция для обработки выбора материала
export function handleMaterialSelection() {
  // Получаем выбранный материал
  const material = document.getElementById('material').value;

  // Скрываем все опции материалов
  document.getElementById('vinylOptions').classList.add('hidden');
  document.getElementById('laminateOptions').classList.add('hidden');
  document.getElementById('hardwoodOptions').classList.add('hidden');
  document.getElementById('installationOnlyOptions').classList.add('hidden');

  // Показываем опции для выбранного материала
  if (material === "vinyl") {
    document.getElementById('vinylOptions').classList.remove('hidden');
  } else if (material === "laminate") {
    document.getElementById('laminateOptions').classList.remove('hidden');
  } else if (material === "hardwood") {
    document.getElementById('hardwoodOptions').classList.remove('hidden');
  } else if (material === "installationOnly") {
    document.getElementById('installationOnlyOptions').classList.remove('hidden');
  }
}

// Функция для настройки кнопки отправки
export function setupSubmitButton() {
  // Добавляем обработчик события клика на кнопку отправки
  document.getElementById('submitButton').addEventListener('click', () => {
    // Получаем площадь в квадратных футах и преобразуем ее в число
    const sqft = parseFloat(document.getElementById('sqft').value.trim());
    // Получаем значение типа демонтажа (если есть)
    const demoTypeValue = parseFloat(document.getElementById('demoType').value || 0);
    // Проверяем, установлен ли флажок для плинтуса
    const hasBaseboard = document.getElementById('hasBaseboard').checked;
    // Получаем выбранный материал
    const material = document.getElementById('material').value;
    // Получаем количество ступеней (если есть)
    const stairsCount = parseInt(document.getElementById('stairCount')?.value || 0, 10);
    // Инициализируем переменную для стоимости материала
    let materialCost = 0;

    // Устанавливаем стоимость материала в зависимости от выбранного материала
    if (material === "vinyl") {
      materialCost = parseFloat(document.getElementById('vinylOption').value || 0);
    } else if (material === "laminate") {
      materialCost = parseFloat(document.getElementById('laminateOption').value || 0);
    } else if (material === "hardwood") {
      materialCost = parseFloat(document.getElementById('hardwoodOption').value || 0);
    } else if (material === "installationOnly") {
      materialCost = parseFloat(document.getElementById('installationType').value || 0);
    }

    // Рассчитываем стоимость плинтуса
    const baseboardCost = hasBaseboard ? sqft * 0.5 : 0;
    // Рассчитываем стоимость лестницы
    const stairCost = stairsCount > 0 ? stairsCount * 50 : 0;

    // Рассчитываем общую стоимость
    const totalCost = (sqft * (demoTypeValue + materialCost)) + baseboardCost + stairCost;

    // Отображаем общую стоимость с двумя знаками после запятой
    document.getElementById('costAmount').textContent = totalCost.toFixed(2);
    // Показываем результат расчета
    document.getElementById('totalCost').classList.remove('hidden');
  });
}

// Функция для расчета общей стоимости
export function calculateTotalCost() {
  // Проверяем, активна ли кнопка Proceed
  const submitButton = document.getElementById('submitButton');
  const totalCostElement = document.getElementById('totalCost');

  if (submitButton.disabled) {
    totalCostElement.classList.add('hidden');
    return;
  }

  // Получаем площадь в квадратных футах и преобразуем ее в число
  const sqft = parseFloat(document.getElementById('sqft').value.trim());
  // Получаем значение типа демонтажа (если есть)
  const demoTypeValue = parseFloat(document.getElementById('demoType').value || 0);
  // Проверяем, установлен ли флажок для плинтуса
  const hasBaseboard = document.getElementById('hasBaseboard').checked;
  // Получаем выбранный материал
  const material = document.getElementById('material').value;
  // Получаем количество ступеней (если есть)
  const stairsCount = parseInt(document.getElementById('stairCount')?.value || 0, 10);
  // Инициализируем переменную для стоимости материала
  let materialCost = 0;

  // Устанавливаем стоимость материала в зависимости от выбранного материала
  if (material === "vinyl") {
    materialCost = parseFloat(document.getElementById('vinylOption').value || 0);
  } else if (material === "laminate") {
    materialCost = parseFloat(document.getElementById('laminateOption').value || 0);
  } else if (material === "hardwood") {
    materialCost = parseFloat(document.getElementById('hardwoodOption').value || 0);
  } else if (material === "installationOnly") {
    materialCost = parseFloat(document.getElementById('installationType').value || 0);
  }

  // Рассчитываем стоимость плинтуса
  const baseboardCost = hasBaseboard ? sqft * 0.5 : 0;
  // Рассчитываем стоимость лестницы
  const stairCost = stairsCount > 0 ? stairsCount * 100 : 0;

  // Рассчитываем общую стоимость
  const totalCost = (sqft * (demoTypeValue + materialCost)) + baseboardCost + stairCost;

  // Проверяем, что totalCost не равно 0.00 или NaN
  if (totalCost === 0 || isNaN(totalCost)) {
    document.getElementById('totalCost').classList.add('hidden');
  } else {
    // Отображаем общую стоимость с двумя знаками после запятой
    document.getElementById('costAmount').textContent = totalCost.toFixed(2);
    // Показываем результат расчета
    document.getElementById('totalCost').classList.remove('hidden');
  }
}

// Обработчики событий для обновления Total Cost в реальном времени
document.getElementById('sqft').addEventListener('input', calculateTotalCost);
document.getElementById('demoType').addEventListener('change', calculateTotalCost);
document.getElementById('material').addEventListener('change', calculateTotalCost);
document.getElementById('hasBaseboard').addEventListener('change', calculateTotalCost);
document.getElementById('hasStairs').addEventListener('change', calculateTotalCost);
document.getElementById('stairCount').addEventListener('input', calculateTotalCost);
document.getElementById('vinylOption').addEventListener('change', calculateTotalCost);
document.getElementById('laminateOption').addEventListener('change', calculateTotalCost);
document.getElementById('hardwoodOption').addEventListener('change', calculateTotalCost);
document.getElementById('installationType').addEventListener('change', calculateTotalCost);

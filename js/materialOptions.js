// materialOptions.js

import { getDependentFields } from './dom.js'; // Импортируем функцию для получения зависимых полей

export const toggleMaterialOptions = (material) => {
  // Получаем все дополнительные опции через dom.js
  const dependentFields = getDependentFields();
  const vinylOptions = dependentFields.find((field) => field.id === 'vinylOptions');
  const laminateOptions = dependentFields.find((field) => field.id === 'laminateOptions');
  const hardwoodOptions = dependentFields.find((field) => field.id === 'hardwoodOptions');
  const installationOnlyOptions = dependentFields.find((field) => field.id === 'installationOnlyOptions');

  // Скрываем все дополнительные опции
  vinylOptions.classList.add('hidden');
  laminateOptions.classList.add('hidden');
  hardwoodOptions.classList.add('hidden');
  installationOnlyOptions.classList.add('hidden');

  // Показываем только нужные опции
  switch (material) {
    case 'vinyl':
      vinylOptions.classList.remove('hidden');
      break;
    case 'laminate':
      laminateOptions.classList.remove('hidden');
      break;
    case 'hardwood':
      hardwoodOptions.classList.remove('hidden');
      break;
    case 'installationOnly':
      installationOnlyOptions.classList.remove('hidden');
      break;
    default:
      break;
  }
};

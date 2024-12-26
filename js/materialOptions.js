import {
  vinylOptions,
  laminateOptions,
  hardwoodOptions,
  installationOnlyOptions,
} from './dom.js'; // Импортируем константы

export const toggleMaterialOptions = (material) => {
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

// tooltip.js

export const createTooltip = (text) => {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = text;
  document.body.appendChild(tooltip);
  return tooltip;
};

export const showTooltip = (tooltip, event, form) => {
  if (event.target.disabled || event.target.classList.contains('disabled')) {
    const formRect = form.getBoundingClientRect(); // Получаем границы формы
    const tooltipWidth = tooltip.offsetWidth; // Ширина подсказки
    const tooltipHeight = tooltip.offsetHeight; // Высота подсказки

    let tooltipX = event.pageX + 10; // Позиция X подсказки
    let tooltipY = event.pageY + 10; // Позиция Y подсказки

    // Проверяем, не выходит ли подсказка за правую границу формы
    if (tooltipX + tooltipWidth > formRect.right) {
      tooltipX = formRect.right - tooltipWidth - 10;
    }

    // Проверяем, не выходит ли подсказка за нижнюю границу формы
    if (tooltipY + tooltipHeight > formRect.bottom) {
      tooltipY = formRect.bottom - tooltipHeight - 10;
    }

    // Проверяем, не выходит ли подсказка за левую границу формы
    if (tooltipX < formRect.left) {
      tooltipX = formRect.left + 10;
    }

    // Проверяем, не выходит ли подсказка за верхнюю границу формы
    if (tooltipY < formRect.top) {
      tooltipY = formRect.top + 10;
    }

    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${tooltipY}px`;
    tooltip.classList.add('visible');
  }
};

export const hideTooltip = (tooltip) => {
  tooltip.classList.remove('visible');
};

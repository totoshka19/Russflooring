import { validateField, validateAllFields, validateName, validatePhone, validateEmail, validateZip, validateSqft, validateDemoType } from './validation.js';
import { calculateBaseboardLength, toggleStairsField, handleMaterialSelection } from './calculations.js'; // Импортируем функции

// Функция для настройки обработчиков событий
export function setupEventHandlers() {
    // Общая функция для обработки валидации поля
    function handleFieldValidation(fieldId, errorId, validationFunction) {
        // Получаем поле и элемент ошибки по их ID
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        // Получаем значение поля и удаляем лишние пробелы
        const value = field.value.trim();

        // Если поле пустое, скрываем ошибку и убираем класс ошибки
        if (value === '') {
            error.style.display = 'none';
            field.classList.remove('error');
        } else {
            // Если значение проходит валидацию, скрываем ошибку и убираем класс ошибки
            if (validationFunction(value)) {
                error.style.display = 'none';
                field.classList.remove('error');
            } else {
                // Если значение не проходит валидацию, показываем ошибку и добавляем класс ошибки
                error.style.display = 'block';
                field.classList.add('error');
            }
        }

        // Вызываем функцию для проверки всех полей
        validateAllFields();
    }

    // Обработчик события ввода для поля имени
    document.getElementById('userName').addEventListener('input', () => {
        handleFieldValidation('userName', 'nameError', validateName);
    });

    // Обработчик события потери фокуса для поля имени
    document.getElementById('userName').addEventListener('blur', () => {
        handleFieldValidation('userName', 'nameError', validateName);
    });

    // Обработчик события ввода для поля email
    document.getElementById('userEmail').addEventListener('input', () => {
        const emailField = document.getElementById('userEmail');
        const emailError = document.getElementById('emailError');

        // Скрываем ошибку и убираем класс ошибки при вводе
        emailError.style.display = 'none';
        emailField.classList.remove('error');

        // Вызываем функцию для проверки всех полей
        validateAllFields();
    });

    // Обработчик события потери фокуса для поля email
    document.getElementById('userEmail').addEventListener('blur', () => {
        handleFieldValidation('userEmail', 'emailError', validateEmail);
    });

    // Обработчик события ввода для поля телефона
    document.getElementById('userPhone').addEventListener('input', () => {
        const phoneField = document.getElementById('userPhone');
        const phoneError = document.getElementById('phoneError');
        const phoneValue = phoneField.value.trim();

        // Проверяем, что значение соответствует формату номера телефона
        if (/^[0-9]{0,10}$/.test(phoneValue)) {
            phoneError.style.display = 'none';
            phoneField.classList.remove('error');
        } else {
            phoneError.style.display = 'block';
            phoneField.classList.add('error');
        }

        // Вызываем функцию для проверки всех полей
        validateAllFields();
    });

    // Обработчик события потери фокуса для поля телефона
    document.getElementById('userPhone').addEventListener('blur', () => {
        validateField('userPhone', 'phoneError', validatePhone);
    });

    // Обработчик события ввода для поля почтового индекса
    document.getElementById('userZip').addEventListener('input', () => {
        const zipField = document.getElementById('userZip');
        const zipError = document.getElementById('zipError');
        const zipValue = zipField.value.trim();

        // Проверяем, что значение соответствует формату почтового индекса
        if (zipValue.length === 0 || /^[0-9]{0,5}$/.test(zipValue)) {
            zipError.style.display = 'none';
            zipField.classList.remove('error');
        } else {
            zipError.style.display = 'block';
            zipField.classList.add('error');
        }

        // Вызываем функцию для проверки всех полей
        validateAllFields();
    });

    // Обработчик события потери фокуса для поля почтового индекса
    document.getElementById('userZip').addEventListener('blur', () => {
        handleFieldValidation('userZip', 'zipError', validateZip);
    });

    // Обработчик события ввода для поля sqft
    document.getElementById('sqft').addEventListener('input', () => {
        const sqftField = document.getElementById('sqft');
        const sqftError = document.getElementById('sqftError');

        // Скрываем ошибку при вводе
        sqftError.style.display = 'none';
        sqftField.classList.remove('error');

        // Вызываем функцию для проверки всех полей
        validateAllFields();
    });

    // Обработчик события потери фокуса для поля sqft
    document.getElementById('sqft').addEventListener('blur', () => {
        handleFieldValidation('sqft', 'sqftError', validateSqft);
    });

    // Обработчик события изменения чекбокса для плинтуса
    document.getElementById('hasBaseboard').addEventListener('change', calculateBaseboardLength);

    // Обработчик события изменения чекбокса для лестниц
    document.getElementById('hasStairs').addEventListener('change', toggleStairsField);

    // Обработчик события изменения выбора материала
    document.getElementById('material').addEventListener('change', handleMaterialSelection);

    // Обработчик события изменения поля sqft
    document.getElementById('sqft').addEventListener('input', calculateBaseboardLength);
}

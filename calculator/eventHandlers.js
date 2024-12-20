import { validateField, validateAllFields, validateName, validatePhone, validateEmail, validateZip } from './validation.js';

export function setupEventHandlers() {
    function handleFieldValidation(fieldId, errorId, validationFunction) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        const value = field.value.trim();

        if (value === '') {
            error.style.display = 'none';
            field.classList.remove('error');
        } else {
            if (validationFunction(value)) {
                error.style.display = 'none';
                field.classList.remove('error');
            } else {
                error.style.display = 'block';
                field.classList.add('error');
            }
        }

        validateAllFields();
    }

    document.getElementById('userName').addEventListener('input', () => {
        handleFieldValidation('userName', 'nameError', validateName);
    });

    document.getElementById('userName').addEventListener('blur', () => {
        handleFieldValidation('userName', 'nameError', validateName);
    });

    document.getElementById('userEmail').addEventListener('input', () => {
        const emailField = document.getElementById('userEmail');
        const emailError = document.getElementById('emailError');

        emailError.style.display = 'none';
        emailField.classList.remove('error');

        validateAllFields();
    });

    document.getElementById('userEmail').addEventListener('blur', () => {
        handleFieldValidation('userEmail', 'emailError', validateEmail);
    });

    document.getElementById('userPhone').addEventListener('input', () => {
        const phoneField = document.getElementById('userPhone');
        const phoneError = document.getElementById('phoneError');
        const phoneValue = phoneField.value.trim();

        if (/^[0-9]{0,10}$/.test(phoneValue)) {
            phoneError.style.display = 'none';
            phoneField.classList.remove('error');
        } else {
            phoneError.style.display = 'block';
            phoneField.classList.add('error');
        }

        validateAllFields();
    });

    document.getElementById('userPhone').addEventListener('blur', () => {
        validateField('userPhone', 'phoneError', validatePhone);
    });

    document.getElementById('userZip').addEventListener('input', () => {
        const zipField = document.getElementById('userZip');
        const zipError = document.getElementById('zipError');
        const zipValue = zipField.value.trim();

        if (zipValue.length === 0 || /^[0-9]{0,5}$/.test(zipValue)) {
            zipError.style.display = 'none';
            zipField.classList.remove('error');
        } else {
            zipError.style.display = 'block';
            zipField.classList.add('error');
        }

        validateAllFields();
    });

    document.getElementById('userZip').addEventListener('blur', () => {
        handleFieldValidation('userZip', 'zipError', validateZip);
    });
}

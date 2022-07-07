export let isInputValid;

const isRequired = (value, mandatoryValue="false") => (value === '' && mandatoryValue == 'true') ? false : true;
const isLessThanMin = (length, min, mandatoryValue="false") => length < min && mandatoryValue == 'true' ? false : true;
const isMoreThanMax = (length, max, mandatoryValue="false") => length > max && mandatoryValue == 'true' ? false: true;
const isEmailValid = (emailValue) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailValue);
}

export const showError = (input, message) => {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    error.textContent = message;
    input.removeAttribute('valid');
}

export const showSuccess = (input) => {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    error.textContent = '';
    input.setAttribute('valid', '');
}

export const checkFormControl = (input) => {
    let valid = false;
    const minValue = input.getAttribute('min');
    const maxValue = input.getAttribute('max');
    const mandatoryValue = input.getAttribute('mandatory');
    const value = input.value.trim();
    
    if(!isRequired(value, mandatoryValue)) {
        showError(input, `${input.name} is required.`)
    }

    else if(!isLessThanMin(value.length, minValue, mandatoryValue) && minValue) {
        showError(input, `${input.name} must be greater than ${minValue} characters.`);
    }
    
    else if(!isMoreThanMax(value.length, maxValue, mandatoryValue) && maxValue) {
        showError(input , `${input.name} must be lesser than ${maxValue} characters.`)
    }
    
    else {
        showSuccess(input);
        valid = true;
    }
    return valid;
}

const checkEmail = (emailInput) => {
    let valid = false;
    const emailValue = emailInput.value;
    const mandatoryValue = emailInput.getAttribute('mandatory');
    if(!isRequired(emailValue, mandatoryValue)) {
        showError(emailInput, `Email is required`);
    }

    else if(!isEmailValid(emailValue)) {
        showError(emailInput, `Email is invalid.`)
    }

    else {
        showSuccess(emailInput);
        valid = true;
    }
    return valid;
};

export const debounce = (fn, delay=500) => {
    let timeOutId;
    return (...args) => {
        if(timeOutId) {
            clearTimeout();
        }
        timeOutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay)
    };
};

const removeErrorIndicator = (e) => {
    if(isInputValid) {
        e.target.classList.remove('error-input')
    }
};

export function formValidation() {
    const form = document.querySelector('form');
    if(form) {
        form.addEventListener('input', debounce(function (e) {
            switch(e.target.type) {
                case 'text':
                    isInputValid = checkFormControl(e.target);
                    removeErrorIndicator(e);
                    break;

                case 'email':
                    isInputValid = checkEmail(e.target);
                    removeErrorIndicator(e);
                    break;

                case 'number':
                    isInputValid = checkFormControl(e.target);
                    removeErrorIndicator(e);
                    break;
                
                case 'date':
                    isInputValid = checkFormControl(e.target);
                    removeErrorIndicator(e);
                    break;

                case 'datetime-local':
                    isInputValid = checkFormControl(e.target);
                    removeErrorIndicator(e);
                    break;

                case 'textarea':
                    isInputValid = checkFormControl(e.target);
                    removeErrorIndicator(e);
                    break;

                case 'time':
                    isInputValid = checkFormControl(e.target);
                    removeErrorIndicator(e);
                    break;
            }
        }))
    }
}

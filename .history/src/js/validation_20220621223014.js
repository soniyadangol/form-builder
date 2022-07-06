// const input = document.querySelector('.form-control');

// let mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// const validateEmail = (element, value) => {
//     const errorMessage = element.nextElementSibling;

//     if(element.value && !value.match(mailFormat)) {
//         element.setAttribute('isValid', false);
//         errorMessage.innerHTML = `
//             <p>Email is invalid. Please fill valid email address.</p>
//         `;
//         return false;
//     } 
//     else if(element.getAttribute('mandatory') === 'true' && element.value === ''){
//         errorMessage.innerHTML = `
//             <p>Email is required.</p>
//         `;
//         return false;
//     }
// };

// export const addValidation = (element => {
//     let valid = false;

//     let minValue = element.getAttribute('min');
//     let maxValue = element.getAttribute('max');
//     let mandatoryValue = element.getAttribute('mandatory');
//     let value = element.value.trim();
    
//     const errorMessage = element.nextElementSibling;
//     switch(true) {
//         case mandatoryValue || value === '':
//             errorMessage.innerText = `
//                 ${element.name} is required.
//             `;
//             break;
//         case mandatoryValue || minValue || (element.value.length < minValue):
//             errorMessage.innerText = `
//                 Please lengthen the value more than ${minValue}.
//             `;
//             break;
//         case mandatoryValue && maxValue && element.value.length > maxValue:
//             errorMessage.innerText = `
//                 Please make sure input value is less than ${maxValue}.
//             `;
//             break;
//         case element.type === 'email':
//             validateEmail(element, element.value);
//             break;
//         default:
//             return false;
//     }
// });

// export const removeValidation = element => {
//     if(element.parentElement.querySelector('.error-message')) {
//         element.parentElement.querySelector('.error-message').textContent = '';
//     }
// };

// export const addValidationOnKeyUp = input => {
//     let minValue = input.getAttribute('min');
//     let maxValue = input.getAttribute('max');
//     let mandatoryValue = input.getAttribute('mandatory');
//     let inputType = input.getAttribute('type');

//     input.addEventListener('keyup', event => {
//         switch(true) {
//             case input.nextElementSibling.textContent === '':
//                 break;
            
//             case mandatoryValue && maxValue && input.value.length > maxValue:
//                 addValidation(input);
//                 break;

//             case mandatoryValue && minValue && input.value.length < minValue:
//                 addValidation(input);
//                 break;

//             case input.value.length > 0:
//                 removeValidation(event.target);
//                 break;

//             case inputType == 'email' && input && input.match(mailFormat):
//                 removeValidation(event.target);
//                 break;

//             default:
//                 return false;
//         }
//     });
// };

import { formContainer } from "./form";

const form = document.querySelector('form');
export let valid = false;
const submitButton = document.querySelector('button[type="submit"]');
submitButton.setAttribute('disabled', '');

const isRequired = (value, mandatoryValue) => (value === '' && mandatoryValue == 'true') ? false : true;
const isLessThanMin = (length, min, mandatoryValue) => length < min && mandatoryValue == 'true' ? false : true;
const isMoreThanMax = (length, max, mandatoryValue) => length > max && mandatoryValue == 'true' ? false: true;

export const showError = (input, message) => {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    error.textContent = message;

    submitButton.setAttribute('disabled', '');
}

export const showSuccess = (input) => {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    error.textContent = '';

    submitButton.removeAttribute('disabled');
}

export const checkFormControl = (input) => {
    const minValue = input.getAttribute('min');
    const maxValue = input.getAttribute('max');
    const mandatoryValue = input.getAttribute('mandatory');
    const value = input.value.trim();
    
    if(!isRequired(value, mandatoryValue)) {
        showError(input, `${input.name} is required.`)
    }

    else if(!isLessThanMin(value.length, minValue, mandatoryValue)) {
        showError(input, `${input.name} must be greater than ${minValue} characters.`)
    }
    
    else if(!isMoreThanMax(value.length, maxValue, mandatoryValue)) {
        showError(input , `${input.name} must be lesser than ${maxValue} characters.`)
    }
    else {
        showSuccess(input);
        valid = true;
    }
    return valid;
}

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

if(form) {
    console.log('form')
    form.addEventListener('input', debounce(function (e) {
        switch(e.target.type) {
            case 'text':
                checkFormControl(e.target);
                break;
        }
    }))
}

if(formContainer) {
    console.log('formContainer')
    formContainer.addEventListener('input', debounce(function (e) {
        switch(e.target.type) {
            case 'text':
                checkFormControl(e.target);
                break;
        }
    }))
}


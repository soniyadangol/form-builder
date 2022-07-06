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

export let isTextInputValid;
const submitButton = document.querySelector('button[type="submit"]');

const isRequired = (value, mandatoryValue="false") => (value === '' && mandatoryValue == 'true') ? false : true;
const isLessThanMin = (length, min, mandatoryValue) => length < min && mandatoryValue == 'true' ? false : true;
const isMoreThanMax = (length, max, mandatoryValue) => length > max && mandatoryValue == 'true' ? false: true;
const isEmailValid = (emailValue) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailValue);
}

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

export function formValidation() {
    const form = document.querySelector('form');
    if(form) {
        if(submitButton) {
            console.log(submitButton)
            const submitButton = document.querySelector('button[type="submit"]');
            submitButton.setAttribute('disabled', '');
        }
        form.addEventListener('input', debounce(function (e) {
            switch(e.target.type) {
                case 'text':
                    isTextInputValid = checkFormControl(e.target);
                    break;

                case 'email':
                    checkEmail(e.target);
                    break;

                case 'number':
                    checkFormControl(e.target);
                    break;
                
                case 'date':
                    checkFormControl(e.target);
                    break;
            }
        }))
    }
}


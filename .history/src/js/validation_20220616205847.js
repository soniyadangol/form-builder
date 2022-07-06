// const input = document.querySelector('.form-control');

let mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmail = (element, value) => {
    const errorMessage = element.nextElementSibling;

    if(element.value && !value.match(mailFormat)) {
        element.setAttribute('isValid', false);
        errorMessage.innerHTML = `
            <p>Email is invalid. Please fill valid email address.</p>
        `;
        return false;
    } 
    else if(element.getAttribute('mandatory') === 'true' && element.value === ''){
        errorMessage.innerHTML = `
            <p>Email is required.</p>
        `;
        return false;
    }
};

export const addValidation = (element => {
    let minValue = element.getAttribute('min');
    let maxValue = element.getAttribute('max');
    let value = element.value;

    const errorMessage = element.nextElementSibling;
    switch(true) {
        case value === '' && element.getAttribute('mandatory') === 'true':
            errorMessage.innerText = `
                ${element.name} is required.
            `;
            break;
        case minValue && element.value.length < minValue:
            errorMessage.innerText = `
                Please lengthen the value more than ${minValue}.
            `;
            break;
        case maxValue && element.value.length > maxValue:
            errorMessage.innerText = `
                Please make sure input value is less than ${maxValue}.
            `;
            break;
        case element.type === 'email':
            validateEmail(element, element.value);
            break;
        default:
            return false;
    }
});

export const removeValidation = element => {
    if(element.parentElement.querySelector('.error-message')) {
        element.parentElement.querySelector('.error-message').textContent = '';
    }
};

export const addValidationOnKeyUp = input => {
    console.log(input.getAttribute('mandatory'));
    let minValue = input.getAttribute('min');
    let maxValue = input.getAttribute('max');
    let requiredValue = input.getAttribute('mandatory');

    input.addEventListener('keyup', event => {
        switch(true) {
            case input.nextElementSibling.textContent === '':
                break;
            
            case requiredValue == true, maxValue && input.value.length > maxValue:
                addValidation(input);
                break;

            case requiredValue == true, minValue && input.value.length < minValue:
                addValidation(input);
                break;

            case requiredValue == true, input.value:
                removeValidation(event.target);
                break;

            case input && input.match(mailFormat):
                removeValidation(event.target);
                break;

            default:
                return false;
        }
    });
};
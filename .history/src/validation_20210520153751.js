const input = document.querySelector('.form-control');

export const addValidation = (element => {
    let minValue = element.getAttribute('min');
    let maxValue = element.getAttribute('max');

    const errorMessage = element.nextElementSibling;
    let html;
    switch(true) {
        case (element.value === ''):
            html = `
                <p>${element.name} is required.</p>
            `;
            errorMessage.innerHTML = html;
            break;
        case (minValue && element.value.length < minValue):
            html = `
                <p>Please lengthen the value more than ${minValue}</p>
            `;
            errorMessage.innerHTML = html;
            break;
        case (maxValue && element.value.length > maxValue):
            html = `
                <p>Please make sure input value is less than ${maxValue}</p>
            `;
            errorMessage.innerHTML = html;
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
    let minValue = input.getAttribute('min');
    let maxValue = input.getAttribute('max');

    input.addEventListener('keyup', event => {
        if(maxValue && input.value.length > maxValue) {
            addValidation(input);
        }
        
        else if(minValue && input.value.length < minValue) {
            addValidation(input);
        }
        else if(input.getAttribute('mandatory') == 'true') {
            removeValidation(event.target);
        }
    });
};
addValidationOnKeyUp(input)
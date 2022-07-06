const input = document.querySelector('.form-control');
const pattern = /^[a-zA-Z]{2,}$/;


export const addValidation = (element => {
    let minValue = element.getAttribute('min');
    let maxValue = element.getAttribute('max');

    const errorMessage = element.nextElementSibling;
    
    if(element.value < minValue) {
        const html = `
            <p>Please lengthen the value more than ${minValue}</p>
        `;
    }

    else if(element.value > maxValue) {
        const html = `
            <p>Please value should not exceed ${maxValue} value</p>
        `;
    }

    else if(!element.value) {
        const html = `
            <p>${element.name} is required.</p>
        `;
    }

    errorMessage.innerHTML = html;

});

export const removeValidation = element => {
    if(element.parentElement.querySelector('.error-message')) {
        element.parentElement.querySelector('.error-message').textContent = '';
    }
};

export const addKeyUpEvent = input => {
    let minValue = input.getAttribute('min');
    let maxValue = input.getAttribute('max');

    input.addEventListener('keyup', event => {
        if(input.value.length > maxValue) {
            addValidation(input);
        }
        
        else if(input.value.length < minValue) {
            addValidation(input);
        }
        else if(input.getAttribute('mandatory') == 'true') {
            removeValidation(event.target);
        }
    });
};

addKeyUpEvent(input);
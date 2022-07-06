const input = document.querySelector('.form-control');

export const addValidation = (element => {
    let minValue = element.getAttribute('min');
    let maxValue = element.getAttribute('max');

    const errorMessage = element.nextElementSibling;

    if(element.value === '') {
        const html = `
            <p>${element.name} is required.</p>
        `;

        errorMessage.innerHTML = html;
    }
    
    else if(element.value.length < minValue) {
        const html = `
            <p>Please lengthen the value more than ${minValue}</p>
        `;
        errorMessage.innerHTML = html;
    }

    else if(element.value.length > maxValue) {
        const html = `
            <p>Please make sure input value is less than ${maxValue}</p>
        `;
        errorMessage.innerHTML = html;
    }
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
const input = document.querySelector('.form-control');
const pattern = /^[a-zA-Z]{2,}$/;

export const addValidation = (element => {
    const errorMessage = element.nextElementSibling;
    const html = `
        <p>${element.name} is required.</p>
    `;
    errorMessage.innerHTML = html;
});

export const removeValidation = element => {
    if(element.parentElement.querySelector('.error-message')) {
        element.parentElement.querySelector('.error-message').remove();
    }
};

export const addKeyUpEvent = input => {
    if(input.getAttribute('mandatory') == 'true') {
        input.addEventListener('keyup', event => {
            removeValidation(event.target);
        });
    }
};
addKeyUpEvent(input);

// check min text content
export const minInputContentCheck = element => {
    let minValue = element.getAttribute('min');
    let maxValue = element.getAttribute('max');

    if(minValue || element.value.length < minValue) {
        const errorMessage = element.nextElementSibling;
        console.length(errorMessage)
        const html = `
            <p>Please input needs to be more than ${minValue} value.</p>
        `;
        errorMessage.innerHTML = html;
        return false;
    } else if (maxValue || element.value.length > maxValue) {
        console.log(`Please input less than ${maxValue} value`);
        return false;
    }
};


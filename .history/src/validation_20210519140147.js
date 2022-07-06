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
    console.log(element.getAttribute('min'));
    let minValue = element.getAttribute('min');
    let maxValue = element.getAttribute('max');
    if(element.value.length < minValue) {
        console.log(`Please input the ${element.name} more than ${minValue} value`);
        return false;
    } else if (element.value.length > maxValue) {
        console.log(`Please input the ${element.name} less than ${maxValue} value`);
        return false;
    }
};

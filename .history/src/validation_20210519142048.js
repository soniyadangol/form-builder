const input = document.querySelector('.form-control');
const pattern = /^[a-zA-Z]{2,}$/;

export const addValidation = (element, max, min => {
    let minValue = element.getAttribute('min');
    let maxValue = element.getAttribute('max');

    const errorMessage = element.nextElementSibling;
    const html = `
        <p>${element.name} is required.</p>
    `;
    if(maxValue) {
        const html = `
            <p>Please input value should not exceeds ${maxValue}.</p>
        `;
    }
    else if(minValue) {
        const html = `
            <p>Please lengthen the value more than ${minValue}.</p>
        `;
    }
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

// check min text content
export const minInputContentCheck = element => {


    // if(minValue || element.value.length < minValue) {
    //     const errorMessage = element.nextElementSibling;
    //     const html = `
    //         <p>Input needs to be more than ${minValue} value.</p>
    //     `;
    //     errorMessage.innerHTML = html;
    //     addKeyUpEvent(input);
    // } else if (maxValue || element.value.length > maxValue) {
    //     const errorMessage = element.nextElementSibling;
    //     const html = `
    //         <p>Input needs to be less than ${maxValue} value.</p>
    //     `;
    //     errorMessage.innerHTML = html;
    //     addKeyUpEvent(input);
    // }
};


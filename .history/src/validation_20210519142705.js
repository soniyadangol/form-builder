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
    let minValue = input.getAttribute('min');
    let maxValue = input.getAttribute('max');

    input.addEventListener('keyup', event => {
        if(input.getAttribute('mandatory') == 'true') {
            removeValidation(event.target);
        };
            else if(input.value > maxValue) {
                console.log('max')
            }
        
            else if(input.value < minValue) {
                console.log('min')
            }
    });
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


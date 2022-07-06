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
export const minInputContent = element => {
    console.log(element.getAttribute('min'));
    pattern = /^[a-zA-Z]{2, }$/;
    console.log(pattern.test(element.value))
};


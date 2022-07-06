const formBuilder = document.querySelector('.form-builder');
const input = document.querySelector('.form-control');
const selectInputType = document.getElementById('select-input-type');
const inputWrapper = document.querySelector('.input-wrapper');

const addValidation = (element => {
    const errorMessage = element.nextElementSibling;
    const html = `
        <p>${element.name} is required.</p>
    `;
    errorMessage.innerHTML = html;
});

const removeValidation = element => {
    if(element.parentElement.querySelector('.error-message')) {
        element.parentElement.querySelector('.error-message').remove();
    }
};

const addKeyUpEvent = input => {
    if(input.getAttribute('mandatory') == 'true') {
        input.addEventListener('keyup', event => {
            removeValidation(event.target);
        });
    }
};
addKeyUpEvent(input);



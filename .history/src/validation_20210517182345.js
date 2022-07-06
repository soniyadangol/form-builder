const formBuilder = document.querySelector('.form-builder');
const formGroup = document.querySelector('.form-group');
const nameInput = document.querySelector('.name-input');

const addValidation = (element => {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    const html = `
        <p>${element.name} is required.</p>
    `
    errorMessage.innerHTML = html;
    element.parentElement.appendChild(errorMessage);
});

const removeValidation = (element => {

});

formBuilder.addEventListener('submit', event => {
    event.preventDefault();
    if(event.target.name.value === '') {
        addValidation(event.target.name)
    }
})

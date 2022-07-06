const formBuilder = document.querySelector('.form-builder');
const nameInput = document.querySelector('.name-input');
const selectInputType = document.querySelector('#select-input-type');

const addValidation = (element => {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    const html = `
        <p>${element.name} is required.</p>
    `
    errorMessage.innerHTML = html;
    element.parentElement.appendChild(errorMessage);
});

const removeValidation = element => {
    console.log(element.value);
    if(element.parentElement.querySelector('.error-message')) {
        element.parentElement.querySelector('.error-message').remove();
    }
};

nameInput.addEventListener('keyup', event => {
    removeValidation(event.target);
});

formBuilder.addEventListener('submit', event => {
    event.preventDefault();
    if(event.target.name.value === '') {
        addValidation(event.target.name)
    }
});


const getInputType = () => {
    console.log(selectInputType.options[selectInputType.selectedIndex].text)
};

getInputType();
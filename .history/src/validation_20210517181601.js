const formBuilder = document.querySelector('.form-builder');
const formGroup = document.querySelector('.form-group');

const addValidation = (element => {
    console.log(element.parentElement);
    const errorMessage = document.createElement('p');
    const html = `
        <p>Name is required.</p>
    `
    errorMessage.innerHTML = html;
    element.parentElement.innerHTML += errorMessage;
});

formBuilder.addEventListener('submit', event => {
    event.preventDefault();
    if(event.target.name.value === '') {
        addValidation(event.target.name)
    }
})

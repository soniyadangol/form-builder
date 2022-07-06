const formBuilder = document.querySelector('.form-builder');
const formGroup = document.querySelector('.form-group');

const addValidation = (element => {
    console.log(element)
});

formBuilder.addEventListener('submit', event => {
    event.preventDefault();
    if(event.target.name.value === '') {
        addValidation(event.target.name)
    }
})

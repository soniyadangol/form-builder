const formBuilder = document.querySelector('.form-builder');
const formControl = document.querySelectorAll('.form-control');

const addValidation = (element => {
    console.log(element);
});

formBuilder.addEventListener('submit', event => {
    event.preventDefault();
    if(event.target.name === '') {
        addValidation(event.target.name)
    }
})

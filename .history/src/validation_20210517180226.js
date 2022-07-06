const formBuilder = document.querySelector('.form-builder');
const formControl = document.querySelectorAll('.form-control');

const addValidation = (element => {
    console.log(element);
});

formBuilder.addEventListener('submit', event => {
    event.preventDefault();
    console.log(event.target.name)
    if(event.target.name.value === '') {
        addValidation(event.target.name)
    }
})

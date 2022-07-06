const formBuilder = document.querySelector('.form-builder');

addValidation(element) {
    console.log(element);
}

formBuilder.addEventListener('submit', event => {
    event.preventDefault();
    if(event.target.name === '') {
        addValidation(event.target.name)
    }
})

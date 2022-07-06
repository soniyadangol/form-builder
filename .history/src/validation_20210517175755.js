const formBuilder = document.querySelector('.form-builder');

formBuilder.addEventListener('submit', event => {
    event.preventDefault();
    console.log(event.target)
})

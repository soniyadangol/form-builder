const formBuilder = document.querySelector('.form-builder');
const formGroup = document.querySelector('.form-group');

const addValidation = (element => {
    const newElement = document.createElement('p');
    element.target.name += newElement; 
    const html = `
        <p>Name is required</p>
    `;
    newElement.innerHTML = html;
});

formBuilder.addEventListener('submit', event => {
    event.preventDefault();
    console.log(event.target.name)
    if(event.target.name.value === '') {
        addValidation(event.target.name)
    }
})

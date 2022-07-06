const formBuilder = document.querySelector('.form-builder');
const formControl = document.querySelectorAll('.form-control');

const addValidation = (element => {
    const newElement = document.createElement('p');
    const html = `
        <p>${element.name} is required</p>
    `;
    newElement.innerHTML = html;
    element.target.name += newElement; 
});

formBuilder.addEventListener('submit', event => {
    event.preventDefault();
    console.log(event.target.name)
    if(event.target.name.value === '') {
        addValidation(event.target.name)
    }
})

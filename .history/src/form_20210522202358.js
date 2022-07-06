import { cInput, cInputTextarea } from "./shared";
import { addValidation, addValidationOnKeyUp } from "./validation";

const body = document.querySelector('body .container');

export const newForm = (data => {
    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    body.appendChild(formContainer);

    const heading = `
        <h1 class="display-4 text-center my-3 text-primary">${data.title ? data.title : 'Untitled Form'}</h1>
        <p class="text-center text-secondary">${data.description}</p>
    `;
    formContainer.innerHTML += heading;

    const form = document.createElement('form');
    formContainer.appendChild(form);
    
    
    data.forEach(input => {
        console.log(input);
        switch(input.type) {
            case 'textarea':
                let formField = cInputTextarea(input.label, input.rows, input.cols);
                form.innerHTML += formField;
                break;
            default:
                formField = cInput(input.label, input.type);
                form.innerHTML += formField;
                if(input.isRequired) {
                    addValidation(form.querySelector('.form-control'));
                    addValidationOnKeyUp(form.querySelector('.form-control'))
                }
                break;
        }
    });
});


import { cInput, cInputTextarea } from "./shared";

const body = document.querySelector('body .container');

const fillFormField = (() => {
    
});

export const newForm = (data => {
    const div = document.createElement('div');
    div.classList.add('form-container');
    body.appendChild(div);

    const heading = `
        <h1 class="display-4 text-center my-3 text-primary">${data.title ? data.title : 'Untitled Form'}</h1>
        <p class="text-center text-secondary">${data.description}</p>
    `;
    div.innerHTML += heading;

    const form = document.createElement('form');
    div.appendChild(form);

    data.forEach(input => {
        console.log(input);
        if(input.type !== 'textarea') {
            const formField = cInput(input.label, input.type);
            form.innerHTML += formField;
        } else {
            const formField = cTextarea(input.label, input.rows, input.cols);
            input.setAttribute('row', input.row);
            input.setAttribute('column', input.column);
            form.innerHTML += formField;
        }
    });
});


import { cInput } from "./shared";

const body = document.querySelector('body .container');

const fillFormField = (() => {
    
});

export const newForm = (() => {
    const div = document.createElement('div');
    div.classList.add('form-container');
    body.appendChild(div);
    const heading = `
        <h1 class="display-4 my-4 text-primary">Untitled Form</h1>
    `;
    div.appendChild(heading);
    const form = document.createElement('form');
    div.appendChild(form);
    const formField = cInput('Name', 'text');
    form.innerHTML += formField;
});


import { cInput } from "./shared";

const body = document.querySelector('body .container');

const fillFormField = (() => {
    
});

export const newForm = (data => {
    const div = document.createElement('div');
    div.classList.add('form-container');
    body.appendChild(div);

    const heading = `
        <h1 class="display-5 text-center my-4 text-primary">${data.title}</h1>
        <p class="my-2 display-8">${data.description}</p>
    `;
    div.innerHTML += heading;

    const form = document.createElement('form');
    div.appendChild(form);

    data.forEach(input => {
        console.log(input);
        const formField = cInput(data.label, data.type);
        form.innerHTML += formField;
    });
});


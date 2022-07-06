import { cInput } from "./shared";

const body = document.querySelector('body .container');

const newForm = (() => {
    const div = document.createElement('div');
    div.classList.add('form-container');
    body.appendChild(div);
    const form = document.createElement('form');
    div.appendChild(form);
    cInput('Label', 'input');
})();


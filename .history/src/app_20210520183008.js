import { addValidation, addValidationOnKeyUp } from './validation';
import { cInput, cRequiredCheck, cMinMax, cAddItemButton } from './shared';

const formBuilderForm = document.querySelector('.form-builder');
const selectInputType = document.getElementById('select-input-type');
const inputWrapper = document.querySelector('.input-wrapper');
const listWrapper = document.querySelector('.list-wrapper');
const formControl = document.querySelectorAll('.form-control');
const submitButton = document.querySelector('.submit-button');

let formObject = {
    title: '',
    description: '',
    label: '',
    placeholder: '',
    isRequired: false,
    max: null,
    min: null
};

selectInputType.addEventListener('change', () => {
    console.log(selectInputType.value)
    switch(selectInputType.value) {
        case 'text': 
            getInputText();
            break;
        case 'textarea':
            getTextarea();
            break;
        default:
            return null;
    }
});

const getInputText = () => {
    const inputWrapper = document.querySelector('.input-wrapper');
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('label')}
        ${cInput('placeholder')}
        ${cRequiredCheck()}
        ${cMinMax()}
        ${cAddItemButton()}
    `;
    inputWrapper.innerHTML = html;
};

// check if input type is required or not
const checkRequired = () => {
    const required = inputWrapper.querySelector('.required');
    if(required.checked) {
        formObject['isRequired'] = true;
    }
};

// set input value to an InputObject
inputWrapper.addEventListener('click', event => {
    checkRequired();

    if(event.target.classList.contains('add-item')) {
        const formControl = inputWrapper.querySelectorAll('.form-control');

        formControl.forEach(input => {
            let obj = {};
            obj[input.name] = input.value;
            formObject = {...formObject, ...obj};
        });
        showInputValueOnDom(formObject);
    }
});

// show object value on dom
const showInputValueOnDom = (value => {
    console.log(value)
    inputWrapper.innerHTML = '';
    inputWrapper.classList.remove('show');
    const listWrapper = document.querySelector('.list-wrapper');

    const html = `
        <div class="form-group">
            <label for="${value.label}">${value.label}</label>
            <input type="text" placeholder="${value.placeholder}" name="label" class="form-control" disabled>
        </div>
    `;
    listWrapper.innerHTML += html;
});

const title = document.getElementById('title');
const description = document.getElementById('description');

const enableSubmit = (() => {
    formBuilderForm.addEventListener('change', () => {
        const value = title.value ? submitButton.setAttribute('disabled', false) : submitButton.setAttribute('disabled', true);
        console.log(value);
    console.log(listWrapper.innerHTML !== '')

    });
})();

formBuilderForm.addEventListener('submit', event => {
    event.preventDefault();

    addValidation(title);

    if(title && listWrapper.innerHTML !== '') {
        submitButton.setAttribute('disabled', false);
        formObject.title = title.value;
        formObject.description = description.value;

        console.log(formObject)
        // window.location.href = "index.html";
        return false;
    }
});
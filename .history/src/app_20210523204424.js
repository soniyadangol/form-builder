import { addValidation, addValidationOnKeyUp } from './validation';
import { getInputType } from './input-type';
import { newForm } from './form';

const formBuilder = document.querySelector('.form-builder');
const formBuilderForm = document.querySelector('.form-builder-form');
const inputWrapper = document.querySelector('.input-wrapper');
const listWrapper = document.querySelector('.list-wrapper');

const formControl = document.querySelectorAll('.form-control');

const title = document.getElementById('title');
const description = document.getElementById('description');

export const inputArray = [];

export let formObject = {
    type: '',
    label: '',
    placeholder: '',
    isRequired: false,
    max: null,
    min: null,
};

console.log(formObject);

// check if input type is required or not
const checkRequired = () => {
    const required = inputWrapper.querySelector('.required');
    if(required.checked) {
        formObject['isRequired'] = true;
    }
};


// set input value to an InputObject
function stateHandleForInputWrapper(event) {
    checkRequired();

    if(event.target.classList.contains('add-item')) {
        const formControl = inputWrapper.querySelectorAll('.form-control');

        formControl.forEach(input => {
            let obj = {};
            obj[input.name] = input.value;
            formObject = {...formObject, ...obj};
        });
console.log(formObject);

        showInputValueOnDom(formObject);
    }
}

// show object value on dom
const showInputValueOnDom = (value => {
    const listWrapper = document.querySelector('.list-wrapper');

    inputWrapper.innerHTML = '';
    inputWrapper.classList.remove('show');

    const html = `
        <div class="form-group">
            <label for="${value.label}">${value.label}</label>
            <input type="text" placeholder="${value.placeholder}" name="label" class="form-control" disabled>
        </div>
    `;
    listWrapper.innerHTML += html;
});

// opens the new form 
function onSubmit(event) {
    event.preventDefault();

    if(listWrapper.innerHTML !== '') {
        inputArray.title = title.value;
        inputArray.description = description.value;
        
        formBuilder.remove();
        console.log(inputArray)
        newForm(inputArray);
    }
}

inputWrapper.addEventListener('click', stateHandleForInputWrapper);
formBuilderForm.addEventListener('submit', onSubmit);
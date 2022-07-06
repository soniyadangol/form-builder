import { addValidation, addValidationOnKeyUp } from './validation';
import { getInputType } from './input-type';
import { cButton, cSelect } from './shared';
import { newForm } from './form';

const formBuilder = document.querySelector('.form-builder');
const formBuilderForm = document.querySelector('.form-builder-form');
const inputWrapper = document.querySelector('.input-wrapper');
const listWrapper = document.querySelector('.list-wrapper');
const selectInputType = document.getElementById('select-input-type');

const formControl = document.querySelectorAll('.form-control');

const title = document.getElementById('title');
const description = document.getElementById('description');
const submitButton = document.querySelector('.submit-button');

submitButton.disabled = true;

export const inputArray = [];

export let formObject = {
    type: '',
    label: '',
    placeholder: '',
    isRequired: false,
    max: null,
    min: null,
};

// check if input type is required or not
const checkRequired = () => {
    const required = inputWrapper.querySelectorAll('.required');
    required.forEach(data => {
        if(data.checked) {
            formObject.isRequired = true;
        } else {
            formObject.isRequired = false;
        }
    });
};

selectInputType.addEventListener('change', getInputType);

// set input value to an InputObject
function stateHandleForInputWrapper(event) {
    checkRequired();

    if(event.target.classList.contains('add-item')) {
        const formControl = inputWrapper.querySelectorAll('.form-control');
        const type = inputWrapper.getAttribute('data-type');

        formControl.forEach(input => {
            let obj = {};
            obj.type = type;
            obj[input.name] = input.value;
            formObject = {...formObject, ...obj};
        });
        console.log(formObject);
        inputArray.push(formObject);
        console.log(inputArray);

        submitButton.disabled = false;
        selectInputType.selectedIndex = 0;
        
        showInputValueOnDom(formObject);
    }
}

const showCheckboxAndRadio = (value, type) => {
    value.data.map(data => {
        const html = `
            <input type="${type}" name="${data.name}" value="${data.name}" disabled>
            <label for="${data.name}"> ${data.value}</label><br>
        `;
        listWrapper.innerHTML += html;
    });

    submitButton.disabled = false;
    selectInputType.selectedIndex = 0;
};

const showDropdown = value => {
    value.data.map(data => {
        const html = `
            ${cSelect(data)}
        `;
        listWrapper.innerHTML += html;
    })
};

// show object value on dom
export const showInputValueOnDom = (value => {
    console.log(value.type)
    const listWrapper = document.querySelector('.list-wrapper');

    inputWrapper.innerHTML = '';
    inputWrapper.classList.remove('show');

    switch(value.type) {
        case 'button': 
            let html = `
                ${cButton(value.value)}
            `;
            listWrapper.innerHTML += html;
            break;

        case 'submit': 
            html = `
                ${cButton(value.value)}
            `;
            listWrapper.innerHTML += html;
            break;
        
        case 'checkbox':
            showCheckboxAndRadio(value, value.type);
            break;
        
        case 'radio':
            showCheckboxAndRadio(value, value.type);
            break;
        
        case 'dropdown':
            console.log(value);
            showDropdown(value);
            break;

        default: 
            html = `
                <div class="form-group">
                    <label for="${value.label}">${value.label}</label>
                    <input type="text" placeholder="${value.placeholder}" name="label" class="form-control" disabled>
                </div>
            `;
            listWrapper.innerHTML += html;
            break;
    }

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
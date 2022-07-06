import { addValidation, addValidationOnKeyUp } from './validation';

const formBuilder = document.querySelector('.form-builder');
const selectInputType = document.getElementById('select-input-type');
const inputWrapper = document.querySelector('.input-wrapper');
const listWrapper = document.querySelector('.list-wrapper');
const formControl = inputWrapper.querySelectorAll('.form-control');

let inputObject = {
    label: '',
    placeholder: '',
    isRequired: false,
    max: null,
    min: null
};

formBuilder.addEventListener('submit', event => {
    event.preventDefault();
    addValidation(event.target.name);

    if(event.target.name && listWrapper.innerHTML !== '') {
        localStorage.setItem('inputObject', inputObject);
        window.location.href = "index.html";
        return false;
    }
});

selectInputType.addEventListener('change', () => {
    console.log(selectInputType.value)
    switch(selectInputType.value) {
        case 'text': 
            getInputText();
            break;
        default:
            return null;
    }
});

const getInputText = () => {
    const inputWrapper = document.querySelector('.input-wrapper');
    inputWrapper.classList.add('show');
    const html = `
        <div class="form-group">
            <label for="label">Enter Label</label>
            <input type="text" placeholder="Enter Label" class="form-control" name="label">
        </div>
        <div class="form-group">
            <label for="label">Enter Placeholder</label>
            <input type="text" placeholder="Enter placeholder" class="form-control" name="placeholder">
        </div>
        <div class="form-group">
            <input type="checkbox" name="required" class="required">
            <label for="checkbox">Required</label>
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Max</span>
            </div>
            <input type="text" class="form-control" placeholder="Enter max value" name="maxValue">
            <div class="input-group-prepend">
                <span class="input-group-text">Min</span>
            </div>
            <input type="text" class="form-control" placeholder="Enter min value" name="minValue">
        </div>
        <div class="form-group">
            <button class="btn btn-primary btn-sm add-item" type="button">
                Done
            </button>
        </div>
    `;
    inputWrapper.innerHTML = html;
};

// check if input type is required or not
const checkRequired = () => {
    const required = inputWrapper.querySelector('.required');
    console.log(required.checked);
    if(required.checked) {
        inputObject['isRequired'] = true;
    }
};

// set input value to an InputObject
inputWrapper.addEventListener('click', event => {
    checkRequired();

    if(event.target.classList.contains('add-item')) {
        console.log(formControl)
        formControl.forEach(input => {
            let obj = {};
            obj[input.name] = input.value;
            inputObject = {...inputObject, ...obj};
        });
        console.log({...inputObject})
        showInputValueOnDom({...inputObject});
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
import { addValidation, addValidationOnKeyUp } from './validation';

const formBuilder = document.querySelector('.form-builder');
const selectInputType = document.getElementById('select-input-type');
const inputWrapper = document.querySelector('.input-wrapper');
const listWrapper = document.querySelector('.list-wrapper');
const formControl = document.querySelectorAll('.form-control');

let formObject = {
    title: '',
    description: '',
    label: '',
    placeholder: '',
    isRequired: false,
    max: null,
    min: null
};

const cInput = (name) => {
    const html = `
        <div class="form-group">
            <label for="label">Enter ${name}</label>
            <input type="text" placeholder="Enter Label" class="form-control" name="${name}">
        </div>
    `;
    return html;
};

const cRequiredCheck = () => {
    const html = `
        <div class="form-group">
            <input type="checkbox" name="required" class="required">
            <label for="checkbox">Required</label>
        </div>
    `
    return html;
};

const cMinMax = () => {
    const html = `
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Max</span>
            </div>
            <input type="text" class="form-control" placeholder="Enter max value" name="max">
            <div class="input-group-prepend">
                <span class="input-group-text">Min</span>
            </div>
            <input type="text" class="form-control" placeholder="Enter min value" name="min">
        </div>
    `;
    return html;
};

const cAddItemButton = () => {
    const html = `
        <div class="form-group">
            <button class="btn btn-primary btn-sm add-item" type="button">
                Done
            </button>
        </div>
    `;
    return html;
}

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

formBuilder.addEventListener('submit', event => {
    event.preventDefault();
    addValidation(event.target.name);

    if(event.target.name && listWrapper.innerHTML !== '') {
        formObject['title'] = event.target.name.value;
        formObject['description'] = event.target.description.value;

        console.log(formObject)
        // window.location.href = "index.html";
        return false;
    }
});
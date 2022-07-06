import { addValidation, addValidationOnKeyUp } from './validation';
import { cInput, cRequiredCheckBox, cMinMax, cAddItemButton } from './shared';

const formBuilderForm = document.querySelector('.form-builder');
const selectInputType = document.getElementById('select-input-type');
const inputWrapper = document.querySelector('.input-wrapper');
const listWrapper = document.querySelector('.list-wrapper');
const formControl = document.querySelectorAll('.form-control');
const submitButton = document.querySelector('.submit-button');
const title = document.getElementById('title');
const description = document.getElementById('description');

submitButton.disabled = true;

let formObject = {
    title: '',
    description: '',
    label: '',
    placeholder: '',
    isRequired: false,
    max: null,
    min: null
};

// sets the template if the user selected input type text
const getInputText = () => {
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('label', 'input')}
        ${cInput('placeholder', 'input')}
        ${cRequiredCheckBox()}
        ${cMinMax()}
        ${cAddItemButton()}
    `;
    inputWrapper.innerHTML = html;
    submitButton.disabled = false;
};

// get Text area template
const getTextArea = () => {
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('label')}
        ${cInput('placeholder')}
        ${cRequiredCheckBox()}
        ${cMinMax()}
        ${cAddItemButton()}
    `;
    inputWrapper.innerHTML = html;
    submitButton.disabled = false;
};

// detect the selected input type by the user
function getInputType() {
    console.log(selectInputType.value)
    switch(selectInputType.value) {
        case 'text': 
            getInputText();
            break;
        case textarea:
            getTextarea();
            break;
        default:
            return null;
    }
}

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
        showInputValueOnDom(formObject);
    }
}

// show object value on dom
const showInputValueOnDom = (value => {
    console.log(value)
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
    // addValidation(title);

    if(title && listWrapper.innerHTML !== '') {
        formObject.title = title.value;
        formObject.description = description.value;

        console.log(formObject)
        // window.location.href = "index.html";
        return false;
    }
}

selectInputType.addEventListener('change', getInputType);
inputWrapper.addEventListener('click', stateHandleForInputWrapper);
formBuilderForm.addEventListener('submit', onSubmit);
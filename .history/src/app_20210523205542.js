import { addValidation, addValidationOnKeyUp } from './validation';
// import { getInputType } from './input-type';
import { cInput, cRequiredCheckBox, cMinMax, cAddItemButton } from './shared';
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
            obj['type'] = inputType;
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



// dom
const selectInputType = document.getElementById('select-input-type');
// const inputWrapper = document.querySelector('.input-wrapper');
const submitButton = document.querySelector('.submit-button');
selectInputType.addEventListener('change', getInputType);
submitButton.disabled = true;

// sets the template if the user selected input type text
const getInputText = type => {
    const inputType = type;
    console.log(inputType)
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('label', 'text')}
        ${cInput('placeholder', 'text')}
        ${cRequiredCheckBox()}
        ${cMinMax()}
        ${cAddItemButton()}
    `;
    inputWrapper.innerHTML = html;
    submitButton.disabled = false;
};

// get Text area template
const getTextArea = type => {
    const inputType = type;
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('label', 'text')}
        ${cInput('placeholder', 'text')}
        ${cInput('rows', 'number')}
        ${cInput('cols', 'number')}
        ${cRequiredCheckBox()}
        ${cMinMax()}
        ${cAddItemButton()}
    `;
    inputWrapper.innerHTML = html;
    submitButton.disabled = false;
};

// detect the selected input type by the user
function getInputType() {
    switch(selectInputType.value) {
        case 'text': 
            getInputText(selectInputType.value);
            break;
        case 'textarea':
            getTextArea(selectInputType.value);
            // selectInputType.selectedIndex = 0;
            break;
        default:
            return null;
    }
}



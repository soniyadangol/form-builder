import { addValidation, removeValidation, addKeyUpEvent, minInputContentCheck } from './validation';

const formBuilder = document.querySelector('.form-builder');
const selectInputType = document.getElementById('select-input-type');
const inputWrapper = document.querySelector('.input-wrapper');

addKeyUpEvent(event.target.name);
formBuilder.addEventListener('submit', event => {
    event.preventDefault();
    if(event.target.name.value === '') {
        addValidation(event.target.name)
    } 
});

selectInputType.addEventListener('change', () => {
    if(selectInputType.value === 'text') {
        getInputText();
    }
});

const getInputText = () => {
    const inputwrapper = document.querySelector('.input-wrapper');
    const html = `
        <div class="form-group">
            <label for="label">Enter Label<span class="required">*</span></label>
            <input type="text" placeholder="Enter Label" class="form-control" name="label" mandatory="true">
            <p class="error-message"></p>
        </div>

        <div class="form-group">
            <label for="label">Enter Placeholder(optional)</label>
            <input type="text" placeholder="Enter placeholder" class="form-control" name="placeholder">
        </div>

        <button class="btn btn-primary btn-sm add-item" type="button">
            Done
        </button>
    `;
    inputwrapper.innerHTML = html;
};

// set input value to array
inputWrapper.addEventListener('click', event => {
    const formControl = inputWrapper.querySelectorAll('.form-control');
    
    if(event.target.tagName == 'BUTTON') {
        let inputObject = {};
        formControl.forEach(input => {
            if(input.getAttribute('mandatory') === 'true' && !input.value) {
                addValidation(input);
            }
            let obj = {};
            obj[input.name] = input.value;
            inputObject = {...inputObject, ...obj};
        });
        const objValue = Object.values(inputObject);
        if(!objValue.includes("")) {
            showInputValueOnDom(inputObject);
        }
    }

    if(event.target.tagName == 'INPUT') {
        event.target.addEventListener('keyup', event => {
            addKeyUpEvent(event.target)
        });
    }
});

// show array value on dom
const showInputValueOnDom = (value => {
    inputWrapper.innerHTML = '';
    const listWrapper = document.querySelector('.list-wrapper');

    const html = `
        <div class="form-group">
            <label for="${value.label}">${value.label}</label>
            <input type="text"placeholder="${value.placeholder}" name="label" class="form-control" disabled>
        </div>
    `;
    listWrapper.innerHTML += html;
});
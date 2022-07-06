import { addValidation, addKeyUpEvent } from './validation';

const formBuilder = document.querySelector('.form-builder');
const selectInputType = document.getElementById('select-input-type');
const inputWrapper = document.querySelector('.input-wrapper');

formBuilder.addEventListener('submit', event => {
    event.preventDefault();
    addValidation(event.target.name)
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
            <input type="text" placeholder="Enter Label" class="form-control" name="label">
        </div>
        <div class="form-group">
            <input type="checkbox" placeholder="" name="checkbox">
            <label for="checkbox">Required</label>
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Max</span>
            </div>
            <input type="text" class="form-control" placeholder="Enter max value">
            <div class="input-group-prepend">
                <span class="input-group-text">Min</span>
            </div>
            <input type="text" class="form-control" placeholder="Enter min value">
        </div>

        <div class="form-group">
            <label for="label">Enter Placeholder</label>
            <input type="text" placeholder="Enter placeholder" class="form-control" name="placeholder">
        </div>
        <div class="form-group">
            <input type="checkbox" placeholder="" name="checkbox">
            <label for="checkbox">Required</label>
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Max</span>
            </div>
            <input type="text" class="form-control" placeholder="Enter max value">
            <div class="input-group-prepend">
                <span class="input-group-text">Min</span>
            </div>
            <input type="text" class="form-control" placeholder="Enter min value">
        </div>
        <div class="form-group">
            <button class="btn btn-primary btn-sm add-item" type="button">
                Done
            </button>
        </div>
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
        showInputValueOnDom(inputObject);
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
            <input type="text" placeholder="${value.placeholder}" name="label" class="form-control" disabled>
        </div>
    `;
    listWrapper.innerHTML += html;
});
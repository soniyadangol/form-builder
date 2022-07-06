import { addValidation, addKeyUpEvent } from './validation';

const formBuilder = document.querySelector('.form-builder');
const selectInputType = document.getElementById('select-input-type');
const inputWrapper = document.querySelector('.input-wrapper');
const listWrapper = document.querySelector('.list-wrapper');

formBuilder.addEventListener('submit', event => {
    event.preventDefault();
    addValidation(event.target.name);

    if(event.target.name && listWrapper.innerHTML !== '') {
        window.location.href = "index.html";
        return false;
    }
});

selectInputType.addEventListener('change', () => {
    if(selectInputType.value === 'text') {
        getInputText();
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
            <input type="checkbox" name="required" class="required form-control">
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
            <input class="btn btn-primary btn-sm add-item" type="submit">
                Done
            </input>
        </div>
    `;
    inputWrapper.innerHTML = html;
};

// set input value to array
inputWrapper.addEventListener('click', event => {
    const formControl = inputWrapper.querySelectorAll('.form-control');
    
    if(event.target.tagName == 'BUTTON') {
        let inputObject = {};
        formControl.forEach(input => {
            // if(input.getAttribute('mandatory') === 'true' && !input.value) {
            //     addValidation(input);
            // }
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
    if(event.target.className === 'required') {
        console.log('asdf')
    }
});

// show array value on dom
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
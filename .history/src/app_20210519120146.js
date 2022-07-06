import { addValidation, removeValidation, addKeyUpEvent } from "./validation";
import { getInputText, showInputValueOnDom } from './ui';

const formBuilder = document.querySelector('.form-builder');
const selectInputType = document.getElementById('select-input-type');
const inputWrapper = document.querySelector('.input-wrapper');

// on form submit
formBuilder.addEventListener('submit', event => {
    event.preventDefault();
    if(event.target.name.value === '') {
        addValidation(event.target.name)
    }
});

// detect the input type
selectInputType.addEventListener('change', () => {
    if(selectInputType.value === 'text') {
        getInputText();
    }
});

// set input value to object on btn click
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
        console.log(inputObject);
        showInputValueOnDom(inputObject)
    }

    if(event.target.tagName == 'INPUT') {
        event.target.addEventListener('keyup', event => {
            addKeyUpEvent(event.target)
        });
    }
});
import { cInput, cRequiredCheckBox, cMinMax, cAddItemButton } from './shared';
import { formObject, inputArray } from './app';


const inputWrapper = document.querySelector('.input-wrapper');
const submitButton = document.querySelector('.submit-button');

submitButton.disabled = true;

// sets the template if the user selected input type text
const getInputText = () => {
    const type = selectInputType.value;
    inputWrapper.setAttribute('data-type', type);

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
const getTextArea = () => {
    const type = selectInputType.value;
    inputWrapper.setAttribute('data-type', type);

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


export { getInputText, getTextArea };
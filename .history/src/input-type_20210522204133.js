import { cInput, cRequiredCheckBox, cMinMax, cAddItemButton } from './shared';
import { formObject } from './app';

const selectInputType = document.getElementById('select-input-type');
const inputWrapper = document.querySelector('.input-wrapper');
const submitButton = document.querySelector('.submit-button');

submitButton.disabled = true;

// sets the template if the user selected input type text
const getInputText = () => {
    inputWrapper.classList.add('show');
    formObject.type = 'text';
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
    inputWrapper.classList.add('show');
    formObject.type = 'textarea';
    const html = `
        ${cInput('label', 'text')}
        ${cInput('placeholder', 'text')}
        ${cInput('rows', 'number')}
        ${cInput('cols', 'number')}
        ${cRequiredCheckBox()}
        ${cAddItemButton()}
    `;
    inputWrapper.innerHTML = html;
    submitButton.disabled = false;
};

// detect the selected input type by the user
function getInputType() {
    switch(selectInputType.value) {
        case 'text': 
            getInputText();
            selectInputType.selectedIndex = 0;
            break;
        case 'textarea':
            getTextArea();
            selectInputType.selectedIndex = 0;
            break;
        default:
            return null;
    }
}

selectInputType.addEventListener('change', getInputType);


export { getInputText, getTextArea, getInputType };
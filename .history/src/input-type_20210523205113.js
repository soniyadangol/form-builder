import { cInput, cRequiredCheckBox, cMinMax, cAddItemButton } from './shared';
import { formObject, inputArray } from './app';

const selectInputType = document.getElementById('select-input-type');
const inputWrapper = document.querySelector('.input-wrapper');
const submitButton = document.querySelector('.submit-button');

submitButton.disabled = true;

// sets the template if the user selected input type text


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

selectInputType.addEventListener('change', getInputType);


export { getInputText, getTextArea, getInputType };
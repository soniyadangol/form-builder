import { cInput, cRequiredCheckBox, cMinMax, cAddItemButton } from './shared';

const selectInputType = document.getElementById('select-input-type');
const inputWrapper = document.querySelector('.input-wrapper');

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
};

// detect the selected input type by the user
function getInputType() {
    switch(selectInputType.value) {
        case 'text': 
            getInputText();
            break;
        case 'textarea':
            getTextArea();
            break;
        default:
            return null;
    }
}

export { getInputText, getTextArea, getInputType };
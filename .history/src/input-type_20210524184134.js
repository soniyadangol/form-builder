import { cInput, cRequiredCheckBox, cMinMax, cAddItemButton } from './shared';

const selectInputType = document.getElementById('select-input-type');
const inputWrapper = document.querySelector('.input-wrapper');

const dataType = (value => {
    value = selectInputType.value;
    inputWrapper.setAttribute('data-type', value);
});

// sets the template if the user selected input type text
const getInputText = () => {
    dataType(selectInputType.value);

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
    dataType(selectInputType.value);
    
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

const getInputNumber = () => {
    dataType(selectInputType.value);
    
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

const getInputEmail = () => {
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('label', 'text')}
        ${cInput('placeholder', 'text')}
        ${cRequiredCheckBox()}
        ${cAddItemButton()}
    `;
    inputWrapper.innerHTML = html;
};

const getInputSubmit = () => {
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('value', 'text')}
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
        case 'number':
            getInputNumber();
            break;
        case 'email':
            getInputEmail();
            break;
        case 'submit':
            getInputSubmit();
            break;
        case 'checkbox':
            getInputCheckbox();
            break;
        case 'radio':
            getInputRadio();
            break;
        case 'select':
            getSelect();
            break;
        case 'toggle':
            getToggle();
            break;
        case 'date':
            getInputDate();
            break;
        case 'time':
            getInputTime();
            break;
        case 'date-time':
            getInputDateTime();
            break;
        default:
            return null;
    }
}

export { getInputText, getTextArea, getInputType };
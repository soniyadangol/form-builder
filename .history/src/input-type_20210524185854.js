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

const getInputButton = () => {
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('value', 'text')}
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

const getInputCheckbox = () => {
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('Value', 'text')}
        ${cInput('label', 'text')}
        ${cAddItemButton()}
    `;
    inputWrapper.innerHTML = html;
};

const getInputRadio = () => {
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('Value', 'text')}
        ${cInput('label', 'text')}
        ${cAddItemButton()}
    `;
    inputWrapper.innerHTML = html;
};

const getDropdown = () => {
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('label', 'text')}
        ${cInput('Value', 'text')}
        ${cAddItemButton()}
    `;
    inputWrapper.innerHTML = html;
};

const getToggle = () => {
    dataType('checkbox');
    
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('label', 'text')}
        ${cInput('Value', 'text')}
        ${cAddItemButton()}
    `;
    inputWrapper.innerHTML = html;
};

// detect the selected input type by the user
function getInputType() {
    console.log(selectInputType.value)
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
        case 'button':
            getInputButton();
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
        case 'dropdown':
            getDropdown();
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
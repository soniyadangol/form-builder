import { inputArray, showInputValueOnDom } from './app';
import { cInput, cRequiredCheckBox, cMinMax, cAddItemButton, cButton } from './shared';

const selectInputType = document.getElementById('select-input-type');
const inputWrapper = document.querySelector('.input-wrapper');

let fillFieldObject = {
    data: []
};

const dataType = (value => {
    value = selectInputType.value;
    inputWrapper.setAttribute('data-type', value);
});

// sets the template if the user selected input type text
const getInputText = () => {
    dataType(selectInputType.value);

    inputWrapper.classList.add('show');
    inputWrapper.innerHTML = `
        ${cInput('label', 'text')}
        ${cInput('placeholder', 'text')}
        ${cRequiredCheckBox()}
        ${cMinMax()}
        ${cAddItemButton()}
    `;
};

// get Text area template
const getTextArea = () => {
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    inputWrapper.innerHTML = `
        ${cInput('label', 'text')}
        ${cInput('placeholder', 'text')}
        ${cInput('rows', 'number')}
        ${cInput('cols', 'number')}
        ${cRequiredCheckBox()}
        ${cMinMax()}
        ${cAddItemButton()}
    `;
};

const getInputNumber = () => {
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    inputWrapper.innerHTML = `
        ${cInput('label', 'text')}
        ${cInput('placeholder', 'text')}
        ${cRequiredCheckBox()}
        ${cMinMax()}
        ${cAddItemButton()}
    `;
};

const getInputEmail = () => {
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    inputWrapper.innerHTML = `
        ${cInput('label', 'text')}
        ${cInput('placeholder', 'text')}
        ${cRequiredCheckBox()}
        ${cAddItemButton()}
    `;
};

const getInputButton = () => {
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    inputWrapper.innerHTML = `
        ${cInput('value', 'text')}
        ${cAddItemButton()}
    `;
};

const getInputSubmit = () => {
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    inputWrapper.innerHTML = `
        ${cInput('value', 'text')}
        ${cAddItemButton()}
    `;
};

const onSubmitAfterFillingFields = (event, type) => {
    event.preventDefault();
    const radioLabel = inputWrapper.querySelector('.radio-label');
    const inputs = inputWrapper.querySelectorAll('.field-container .form-control');
    fillFieldObject = {
        data: []
    };

    fillFieldObject.type = selectInputType.value;

    if(type === 'dropdown') {
        fillFieldObject.name = radioLabel.value;
    }
    if(inputs.value !== '') {
        for (let i = 0; i < inputs.length; i++) {
            fillFieldObject.data.push({
                name: `${type}${(i+1)}`,
                value: inputs[i].value
            });
        }
        inputArray.push(fillFieldObject);
        console.log(inputArray);
        showInputValueOnDom(fillFieldObject);
    }
};

const stateHandleToFillFields = (event, type) => {
    event.preventDefault();

    const container = inputWrapper.querySelector('.field-container');
    const number = inputWrapper.querySelector('.number-input').value;

    while(container.hasChildNodes()) {
        container.removeChild(container.last-child);
    }
    if(number !== '') {
        for(let i=0; i < number; i++) {
            const html = `
                ${type === 'dropdown' ? cInput('Option' + (i+1), 'text') : cInput('Field ' + (i+1), 'text')}
            `;
            container.innerHTML += html;
        }

        const html = `
            ${cButton('Submit', 'submit-button btn-sm',)}
        `;
        container.innerHTML += html;
    
        const submitButton = container.querySelector('.submit-button');
        submitButton.addEventListener('click', event => {
            onSubmitAfterFillingFields(event, type);
        });
    }
};

const getFieldsFromUser = type => {
    inputWrapper.classList.add('show');
    inputWrapper.innerHTML = `
        ${type === 'dropdown' ? cInput('Label', 'text', 'radio-label') : ''} 
        ${cInput('No. of fields', 'number', 'number-input')}
        ${cButton('Fill Fields', 'fill-field-button btn-sm')}
        <div class="field-container"></div>
    `;
    
    const fillButton = inputWrapper.querySelector('.fill-field-button');
    fillButton.addEventListener('click', event => {
        stateHandleToFillFields(event, type);
    });
};

const getInputCheckbox = () => {
    dataType(selectInputType.value);
    getFieldsFromUser(selectInputType.value);
};

const getInputRadio = () => {
    dataType(selectInputType.value);
    getFieldsFromUser(selectInputType.value);
};

const getDropdown = () => {
    dataType(selectInputType.value);
    
    getFieldsFromUser(selectInputType.value);
};

const getToggle = () => {
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    console.log(selectInputType.value)
    showInputValueOnDom(selectInputType.value);
};

const getInputDate = () => {
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    inputWrapper.innerHTML = `
        ${cInput('label', 'text')}
        ${cInput('placeholder', 'text')}
        ${cAddItemButton()}
    `;
};

const getInputTime = () => {
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    inputWrapper.innerHTML = `
        ${cInput('label', 'text')}
        ${cInput('placeholder', 'text')}
        ${cAddItemButton()}
    `;
};

const getInputDateTimeLocal = () => {
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    inputWrapper.innerHTML = `
        ${cInput('label', 'text')}
        ${cInput('placeholder', 'text')}
        ${cAddItemButton()}
    `;
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
        case 'toggle-switch':
            getToggle();
            break;
        case 'date':
            getInputDate();
            break;
        case 'time':
            getInputTime();
            break;
        case 'datetime-local':
            getInputDateTimeLocal();
            break;
        default:
            return null;
    }
}

export { getInputText, getTextArea, getInputType };
import { inputArray, showInputValueOnDom } from './app';
import { cInput, cRequiredCheckBox, cMinMax, cAddItemButton, cButton } from './shared';

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
    // let checkboxObj = {};
    const checkBox = [];
    
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('No. of fields', 'number')}
        ${cButton('Fill Fields', 'fill-field-button btn-sm')}
        <div class="field-container"></div>
    `;
    inputWrapper.innerHTML = html;

    const fillButton = inputWrapper.querySelector('.fill-field-button');
    const container = inputWrapper.querySelector('.field-container');
    fillButton.addEventListener('click', event => {
        event.preventDefault();
        const number = inputWrapper.querySelector('.form-control').value;

        while(container.hasChildNodes()) {
            container.removeChild(container.last-child);
        }
        if(number !== '') {
            for(let i=0; i < number; i++) {
                const html = `
                    ${cInput('Field ' + (i+1), 'text')}
                `;
                container.innerHTML += html;
            }
    
            const html = `
                ${cButton('Submit', 'submit-button btn-sm',)}
            `;
            container.innerHTML += html;
        
        const submitButton = container.querySelector('.submit-button');
        const inputs = inputWrapper.querySelectorAll('.field-container .form-control');
            submitButton.addEventListener('click', event => {
                event.preventDefault();
                checkBox.type = selectInputType.value;
                if(inputs.value !== '') {
                    const checkBoxObj = {};
                    // inputs.forEach((input, index) => {
                    //     console.log(index)
                    // });
                    for (const input of inputs) {
                            checkBoxObj.name = 'asf';
                            checkBoxObj.value = input.value;
                            checkBox.push(checkBoxObj);
                        // console.log(input)
                    }
                    console.log(checkBox);
                    // showInputValueOnDom(checkBox);
                }
            });
        }

    });

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
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('label', 'text')}
        ${cAddItemButton()}
    `;
    inputWrapper.innerHTML = html;
};

const getInputDate = () => {
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('label', 'text')}
        ${cInput('placeholder', 'text')}
        ${cAddItemButton()}
    `;
    inputWrapper.innerHTML = html;
};

const getInputTime = () => {
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('label', 'text')}
        ${cInput('placeholder', 'text')}
        ${cAddItemButton()}
    `;
    inputWrapper.innerHTML = html;
};

const getInputDateTimeLocal = () => {
    dataType(selectInputType.value);
    
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('label', 'text')}
        ${cInput('placeholder', 'text')}
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
        case 'datetime-local':
            getInputDateTimeLocal();
            break;
        default:
            return null;
    }
}

export { getInputText, getTextArea, getInputType };
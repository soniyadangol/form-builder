import {
    formObject,
    inputArray,
    showInputValueOnDom,
    showEditedValueonDom
} from './app';
import {
    cInput,
    cCheckBox,
    cMinMax,
    cAddItemButton,
    cButton,
    cHeading,
    uuidv4
} from './shared';

const selectInputType = document.getElementById('select-input-type');
const inputWrapper = document.querySelector('.input-wrapper');
const inputTypeButton = document.querySelectorAll('.fb-secondary-button');

const submitButton = document.querySelector('.submit-button');

const mainWrapper = document.querySelector('.main-wrapper');
const sectionWrapper = document.querySelector('.section-wrapper');
const editSubmitButton = document.querySelector('.add-item');

let fillFieldObject = {
    data: []
};

const dataType = (value => {
    // value = event.target.getAttribute('data-type');
    sectionWrapper.setAttribute('data-type', value);
});

// sets the template if the user selected input type text
const getInputText = (value = '', state='add') => {
    return `
        <section class="fb-input-wrapper">
            ${value.type ? cHeading(value.type) : cHeading(value)}
            <div class="row">
                <div class="col-lg-4">
                    ${cInput('label', 'text', null, null, null, value.label)}
                </div>
                <div class="col-lg-4">
                    ${cInput('placeholder', 'text', null, null, null, value.placeholder)}
                </div>
                <div class="col-lg-4">
                    <label for="name" class="fb-label">Additional Validation</label>
                    <div class="fb-row">
                        ${cMinMax(value.min, value.max)}
                        <div class="fb-col">
                            ${cCheckBox('required', 'Required', 'required')}
                        </div>
                    </div>
                </div>
            </div>
            ${cAddItemButton(state, value)}
        </section>
    `;
};

// get Text area template
const getTextArea = (value = '', state='add') => {
    return `
        <section class="fb-input-wrapper">
            ${value.type ? cHeading(value.type) : cHeading(value)}
            <div class="row">
                <div class="col-lg-4">
                    ${cInput('label', 'text', null, null, null, value.label)}
                </div>
                <div class="col-lg-4">
                    ${cInput('placeholder', 'text', null, null, null, value.placeholder)}
                </div>
                <div class="col-lg-4">
                    <div class="fb-row">
                        <div class="fb-col">
                            ${cInput('rows', 'number', null, null, null, value.rows)}
                        </div>
                        <div class="fb-col">
                            ${cInput('cols', 'number', null, null, null, value.cols)}
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <label for="name" class="fb-label">Additional Validation</label>
                    <div class="fb-row">
                        ${cMinMax(value.min, value.max)}
                        <div class="fb-col">
                            ${cCheckBox('required', 'Required', 'required')}
                        </div>
                    </div>
                </div>
            </div>
            ${cAddItemButton(state, value)}
        </section>
    `;
};

const getInputNumber = (value = '', state='add') => {
    return `
        <section class="fb-input-wrapper">
            ${value.type ? cHeading(value.type) : cHeading(value)}
            <div class="row">
                <div class="col-lg-4">
                    ${cInput('label', 'text', null, null, null, value.label)}
                </div>
                <div class="col-lg-4">
                    ${cInput('placeholder', 'text', null, null, null, value.placeholder)}
                </div>
                <div class="col-lg-4">
                    <label for="name" class="fb-label">Additional Validation</label>
                    <div class="fb-row">
                        ${cMinMax(value.min, value.max)}
                        <div class="fb-col">
                            ${cCheckBox('required', 'Required', 'required')}
                        </div>
                    </div>
                </div>
            </div>
            ${cAddItemButton(state, value)}
        </section>
    `;
};

const getInputEmail = (value = '', state='add') => {
    return `
        <section class="fb-input-wrapper">
            ${value.type ? cHeading(value.type) : cHeading(value)}
            <div class="row">
                <div class="col-lg-4">
                    ${cInput('label', 'text', null, null, null, value.label)}
                </div>
                <div class="col-lg-4">
                    ${cInput('placeholder', 'text', null, null, null, value.placeholder)}
                </div>
                <div class="col-lg-4">
                    <label for="name" class="fb-label">Additional Validation</label>
                    <div class="fb-row">
                        ${cMinMax(value.min, value.max)}
                        <div class="fb-col">
                            ${cCheckBox('required', 'Required', 'required')}
                        </div>
                    </div>
                </div>
            </div>
            ${cAddItemButton(state, value)}
        </section>
    `;
};

const getInputButton = (value = '', state='add') => {
    return `
        <section class="fb-input-wrapper">
            ${value.type ? cHeading(value.type) : cHeading(value)}
            <div class="row">
                <div class="col-lg-4">
                    ${cInput('value', 'text', null, null, null, value.value)}
                </div>
            </div>
            ${cAddItemButton(state, value)}
        </section>
    `;
};

const getInputSubmit = (value = '', state='add') => {
    return `
        <section class="fb-input-wrapper">
            ${value.type ? cHeading(value.type) : cHeading(value)}
            <div class="row">
                <div class="col-lg-4">
                    ${cInput('value', 'text', null, null, null, value.value)}
                </div>
            </div>
            ${cAddItemButton(state, value)}
        </section>
    `;
};

const onSubmitAfterFillingFields = (event, type, list, state) => {
    event.preventDefault();
    const label = list.querySelector('.label');
    const inputs = list.querySelectorAll('.field-container .form-control');
    fillFieldObject = {
        data: []
    };

    fillFieldObject.type = type;
    fillFieldObject.name = label.value;
    if(state === 'add') {
        fillFieldObject.id = uuidv4();
    } else {
        const id = list.getAttribute('data-id');
        fillFieldObject.id = id;
    }

    if (inputs.value !== '') {
        for (let i = 0; i < inputs.length; i++) {
            fillFieldObject.data.push({
                name: `${type}${(i+1)}`,
                value: inputs[i].value
            });
        }
        if(state == 'add') {
            inputArray.push(fillFieldObject);
            showInputValueOnDom(fillFieldObject);
        } else {
            list.remove();
            showEditedValueonDom(fillFieldObject);
        }
        
    }
};

const stateHandleToFillFields = (event, type, list, state) => {
    event.preventDefault();
    const container = list.querySelector('.field-container');
    container.classList.add('row');
    const number = list.querySelector('.number-input').value;

    while (container.hasChildNodes()) {
        container.removeChild(container.last - child);
    }
    if (number !== '') {
        for (let i = 0; i < number; i++) {
            const html = `
                <div class="col-md-4">
                    ${type === 'dropdown' ? cInput('Option' + (i+1), 'text') : cInput('Field ' + (i+1), 'text')}
                </div>
            `;
            container.innerHTML += html;
        }
        if (state == 'add') {
            const html = `
                <div class="col-md-4">
                    ${cButton('Submit', type, 'submit-button')}
                </div>
            `;
            container.innerHTML += html;
        }
        else {
            const html = `
                <div class="col-md-4">
                    ${cButton('Submit', type, 'submit-button edit-item')}
                </div>
            `;
            container.innerHTML += html;
        }

        const submitButton = container.querySelector('.submit-button');
        submitButton.addEventListener('click', event => {
            onSubmitAfterFillingFields(event, type, list, state);
        });
    }
};

const getFieldsFromUser = (type, list, state) => {
    list.insertAdjacentHTML('beforeend',  `
        ${cHeading(type)}
        <div class="row">
            <div class="col-lg-4">
                ${cInput('Label', 'text', 'label')} 
            </div>
            <div class="col-lg-4">
                ${cInput('No. of fields', 'number', 'number-input')}
            </div>
        </div>
        ${cButton('Fill Fields', 'button', 'fill-field-button fb-tertiary-button')}
        
        <div class="field-container"></div>
    `);

    const fillButton = list.querySelector('.fill-field-button');
    fillButton.addEventListener('click', event => {
        stateHandleToFillFields(event, type, list, state);
    });
};

const getInputCheckbox = (type, list, state='add') => {
    getFieldsFromUser(type, list, state);
};

const getInputRadio = (type, list, state='add') => {
    getFieldsFromUser(type, list, state);
};

const getDropdown = (type, list, state='add') => {
    getFieldsFromUser(type, list, state);
};

const getToggle = (value='', state='add') => {
    return `
        <section class="fb-input-wrapper">
            ${value.type ? cHeading(value.type) : cHeading(value)}
            <div class="row">
                <div class="col-lg-4">
                    ${cInput('label', 'text', null, null, null, value.label)}
                </div>
            </div>
            ${cAddItemButton(state, value)}
        </section>
    `;
};

const getInputDate = (value='', state='add') => {
    return `
        <section class="fb-input-wrapper">
            ${value.type ? cHeading(value.type) : cHeading(value)}
            <div class="row">
                <div class="col-lg-4">
                    ${cInput('label', 'text', null, null, null, value.label)}
                </div>
                <div class="col-lg-4">
                    ${cInput('placeholder', 'text', null, null, null, value.placeholder)}
                </div>
                <div class="col-lg-4">
                    <label for="name" class="fb-label">Additional Validation</label>
                    <div class="fb-row">
                        ${cMinMax(value.min, value.max)}
                        <div class="fb-col">
                            ${cCheckBox('required', 'Required', 'required')}
                        </div>
                    </div>
                </div>
            </div>
            ${cAddItemButton(state, value)}
        </section>
    `;
};

const getInputTime = (value='', state='add') => {
    return `
        <section class="fb-input-wrapper">
            ${value.type ? cHeading(value.type) : cHeading(value)}
            <div class="row">
                <div class="col-lg-4">
                    ${cInput('label', 'text', null, null, null, value.label)}
                </div>
                <div class="col-lg-4">
                    ${cInput('placeholder', 'text', null, null, null, value.placeholder)}
                </div>
                <div class="col-lg-4">
                    <label for="name" class="fb-label">Additional Validation</label>
                    <div class="fb-row">
                        ${cMinMax(value.min, value.max)}
                        <div class="fb-col">
                            ${cCheckBox('required', 'Required', 'required')}
                        </div>
                    </div>
                </div>
            </div>
            ${cAddItemButton(state, value)}
        </section>
    `;
};

const getInputDateTimeLocal = (value='', state='add') => {
    return `
        <section class="fb-input-wrapper">
            ${value.type ? cHeading(value.type) : cHeading(value)}
            <div class="row">
                <div class="col-lg-4">
                    ${cInput('label', 'text', null, null, null, value.label)}
                </div>
                <div class="col-lg-4">
                    ${cInput('placeholder', 'text', null, null, null, value.placeholder)}
                </div>
                <div class="col-lg-4">
                    <label for="name" class="fb-label">Additional Validation</label>
                    <div class="fb-row">
                        ${cMinMax(value.min, value.max)}
                        <div class="fb-col">
                            ${cCheckBox('required', 'Required', 'required')}
                        </div>
                    </div>
                </div>
            </div>
            ${cAddItemButton(state, value)}
        </section>
    `;
};

inputTypeButton.forEach((button) => {
    button.addEventListener('click', getInputType);
});

function getInputType() {
    const type = event.target.getAttribute('data-type');
    const sideBarMain = document.querySelector('.side-bar__main');
    const noteWrapper = document.querySelector('.note-wrapper');
    
    if(noteWrapper) {
        noteWrapper.remove();
    }

    sectionWrapper.classList.add('show');
    sideBarMain.classList.add('no-pointer')
    sectionWrapper.hidden = false;

    submitButton.disabled = true;

    switch (type) {
        case 'text':
            dataType(type);
            sectionWrapper.innerHTML += getInputText(type);
            break;

        case 'textarea':
            dataType(type);
            sectionWrapper.innerHTML += getTextArea(type);
            break;

        case 'number':
            dataType(type);
            sectionWrapper.innerHTML += getInputNumber(type);
            break;

        case 'email':
            dataType(type);
            sectionWrapper.innerHTML += getInputEmail(type);
            break;

        case 'button':
            dataType(type);
            sectionWrapper.innerHTML += getInputButton(type);
            break;

        case 'submit':
            dataType(type);
            sectionWrapper.innerHTML += getInputSubmit(type);
            break;

        case 'checkbox':
            getInputCheckbox(type, sectionWrapper);
            break;

        case 'radio':
            getInputRadio(type, sectionWrapper);
            break;

        case 'dropdown':
            getDropdown(type, sectionWrapper);
            break;

        case 'toggle-switch':
            dataType(type);
            sectionWrapper.innerHTML += getToggle(type);
            break;

        case 'date':
            dataType(type);
            sectionWrapper.innerHTML += getInputDate(type);
            break;

        case 'time':
            dataType(type);
            sectionWrapper.innerHTML += getInputTime(type);
            break;

        case 'datetime-local':
            dataType(type);
            sectionWrapper.innerHTML += getInputDateTimeLocal(type);
            break;

        default:
            return null;
    }
}

const editInputType = (selectedField, list) => {
    // sectionWrapper.classList.add('show');
    // sectionWrapper.hidden = false;
    console.log(editInputType)
    submitButton.disabled = true;
    list.querySelector('.edit-button').disabled = true;
    
    switch (selectedField.type) {
        case 'text':
            list.insertAdjacentHTML('beforeend',  getInputText(selectedField, 'edit'));
            break;
        case 'textarea':
            list.insertAdjacentHTML('beforeend',  getTextArea(selectedField, 'edit'));
            break;
        case 'number':
            list.insertAdjacentHTML('beforeend', getInputNumber(selectedField, 'edit'));
            break;
        case 'email':
            list.insertAdjacentHTML('beforeend', getInputEmail(selectedField, 'edit'));
            break;
        case 'button':
            list.insertAdjacentHTML('beforeend', getInputButton(selectedField, 'edit'));
            break;
        case 'submit':
            list.insertAdjacentHTML('beforeend', getInputSubmit(selectedField, 'edit'));
            break;
        case 'checkbox':
            getInputCheckbox(selectedField.type, list, 'edit');
            break;
        case 'radio':
            getInputRadio(selectedField.type, list, 'edit');
            break;
        case 'dropdown':
            getDropdown(selectedField.type, list, 'edit');
            break;
        case 'toggle-switch':
            list.insertAdjacentHTML('beforeend', getToggle(selectedField, 'edit'));
            break;
        case 'date':
            list.insertAdjacentHTML('beforeend', getInputDate(selectedField, 'edit'));
            break;
        case 'time':
            list.insertAdjacentHTML('beforeend',getInputTime(selectedField, 'edit'));
            break;
        case 'datetime-local':
            list.insertAdjacentHTML('beforeend',getInputDateTimeLocal(selectedField, 'edit'));
            break;
        default:
            return null;
    }
}

export {
    getInputText,
    getTextArea,
    getInputType,
    editInputType
};
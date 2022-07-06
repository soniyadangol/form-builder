import { getInputType, editInputType } from './input-type';
import { cInput, cCheckBox, cToggleSwitch, cSelect, cButton, cHeadingSecondary, cHeading, cRadioButton } from './shared';
import { newForm } from './form';
import { addValidation, addValidationOnKeyUp } from './validation';

const formBuilder = document.querySelector('.form-builder');
const formBuilderForm = document.querySelector('.form-builder-form');
const inputWrapper = document.querySelector('.section-wrapper');
const listWrapper = document.querySelector('.list-wrapper');
const selectInputType = document.getElementById('select-input-type');

const formControl = document.querySelectorAll('.form-control');

const title = document.getElementById('title');
const description = document.getElementById('description');
const submitButton = document.querySelector('.submit-button');

export const inputArray = [];
let inputId = 0;

export let formObject = {
    type: '',
    label: '',
    placeholder: '',
    isRequired: false,
    max: null,
    min: null,
};

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

const noContentDisplayTemplate = () => {
    if(inputArray.length === 0) {
        submitButton.hidden = true;

        const mainWrapper = document.querySelector('.main-wrapper');
        const noteWrapper = document.createElement('div');
        noteWrapper.classList.add('note-wrapper');

        const html = `
            <section class="note">
                <div class="note__main">
                    <img src="images/empty-box.png" alt="empty box" class="note__image">
                </div>
                <div class="note__content">
                    <h2 class="note__title">
                        No content yet!!!
                    </h2>
                    <p class="note__text">
                        Please add any input type that you prefer.
                    </p>
                </div>
            </section>
        `;

        noteWrapper.innerHTML = html;
        mainWrapper.appendChild(noteWrapper);
    } 
};

window.addEventListener('load', (event) => {
    noContentDisplayTemplate();
});

if(submitButton) {
    submitButton.disabled = true;
}

// check if input type is required or not
const checkRequired = () => {
    const required = inputWrapper.querySelectorAll('.required');
    required.forEach(data => {
        if(data.checked) {
            formObject.isRequired = true;
        } else {
            formObject.isRequired = false;
        }
    });
};

// selectInputType.addEventListener('change', getInputType);
if(inputWrapper) {
	inputWrapper.addEventListener('click', stateHandleForInputWrapper);
}

// set input value to an InputObject
function stateHandleForInputWrapper(event) {
	if(event.target.classList.contains('add-item')) {
		stateHandlerForAddItem();
    }
    // if(event.target.classList.contains('edit-item')) {
    //     stateHandlerForEditItem(event);
    // }
}

function stateHandlerForAddItem() {
    submitButton.hidden = false;

    const formControl = inputWrapper.querySelectorAll('.form-control');
    const type = inputWrapper.getAttribute('data-type');

    formControl.forEach((input) => {
        let obj = {};
        obj.type = type;
        obj.id = uuidv4();
        obj[input.name] = input.value;
        formObject = {...formObject, ...obj};
    });

    checkRequired();
    // console.log(formObject)
    inputArray.push(formObject);
    // console.log(inputArray)
    
    submitButton.disabled = false;
    // selectInputType.selectedIndex = 0;
    
    showInputValueOnDom(formObject);
}

const showCheckboxAndRadio = (value, state) => {
    const list = document.createElement('div');
    list.classList.add('list-item');
    list.setAttribute('data-id', value.id);
    list.innerHTML +=  `
        <div class="list__section">
            ${cHeadingSecondary(value)}

    `;
    list.innerHTML += `<p class="heading">${value.name}</p>`;
    value.data.map(data => {
        if(value.type === 'checkbox') {
            const html = `
                ${cCheckBox(data.name, data.value)}
            `;

            list.insertAdjacentHTML('beforeend', html);
        } else {
            const html = `
                ${cRadioButton(data.name, data.value)}
            `;

            list.insertAdjacentHTML('beforeend', html);
        }
        
    });


    list.innerHTML += '</div>';

    listWrapper.appendChild(list);

    submitButton.disabled = false;
    // selectInputType.selectedIndex = 0;
};

const showDropdown = value => {
    console.log(value)
    const list = document.createElement('div');
    list.classList.add('list-item');
    list.setAttribute('data-id', value.id);
    list.innerHTML +=  `
        <div class="list__section">
            ${cHeadingSecondary(value)}

    `;
    const html = `
            ${cSelect(value)}
        </div>
    `;
    list.innerHTML += html;
    const selectFields = list.querySelectorAll('select');
    selectFields.forEach(select => {
        select.setAttribute('disabled', true);
    });

    listWrapper.appendChild(list);

    submitButton.disabled = false;
    // selectInputType.selectedIndex = 0;
};

// toggle switch
const showToggleSwitch = value => {
    const list = document.createElement('div');
    list.classList.add('list-item');
    list.setAttribute('data-id', value.id);
    list.innerHTML +=  `
        <div class="form-group list__section">
            ${cHeadingSecondary(value)}
            ${cToggleSwitch(value.label)}
        </div>
    `;

    const togglebtn = list.querySelector('.switch input[type="checkbox"]');
    togglebtn.disabled = true;
    // list.innerHTML += showAdditionalButton();

    listWrapper.appendChild(list);
    
    submitButton.disabled = false;
    // selectInputType.selectedIndex = 0;
};

// delete the list items 
const removeListItem = (selectedField, list) => {
    list.remove();
    const index = inputArray.indexOf(selectedField);

    inputArray.splice(index, 1);

    if(inputArray.length === 0) {
        noContentDisplayTemplate();
    }
};

if(listWrapper) {
    listWrapper.addEventListener('click', stateHandlerForEditButton);
    listWrapper.addEventListener('click', stateHandlerForDeleteButton);
}

function stateHandlerForEditButton(e) {
    if(e.target.parentElement.classList.contains('edit-button')) {
        console.log(e.target.parentElement)
        let list = e.target.parentElement.closest('.list-item');
        const id = list.getAttribute('data-id');
        const selectedField = inputArray.find((input) => input.id === id);
        editInputType(selectedField, list);
        
        const editItem = list.querySelector('.edit-item');
        if(editItem) {
            editItem.addEventListener('click', function(event) {
                stateHandlerForEditItem(selectedField, event, list);
            })
        }
    }
}

function stateHandlerForDeleteButton(e) {
    if(e.target.parentElement.classList.contains('delete-button')) {
        let list = e.target.parentElement.closest('.list-item');
        const id = list.getAttribute('data-id');
        const selectedField = inputArray.find((input) => input.id === id);
        removeListItem(selectedField, list);
    }  
}

function stateHandlerForEditItem(value, event, list) {
    const inputId = event.target.getAttribute('data-id');
    const selectedField = inputArray.find((input) => input.id === inputId);
    const editInputWrapper = list.querySelector('.fb-input-wrapper');
    const formGroup = list.querySelector('.form-group');
    const formControl = editInputWrapper.querySelectorAll('.form-control');

    formControl.forEach((input) => {
        let obj = {};
        obj.type = value.type;
        obj.id = uuidv4();
        obj[input.name] = input.value;
        formObject = {...formObject, ...obj};
    });

    selectedField.label = formObject.label;
    selectedField.placeholder = formObject.placeholder;
    selectedField.max = formObject.max;  
    selectedField.min = formObject.min;
    selectedField.value = formObject.value;
    checkRequired();

    list.querySelector('.edit-button').disabled = false;
    formGroup.remove();
    editInputWrapper.remove();

    showEditedValueonDom(selectedField, list);
    // showInputValueOnDom(selectedField)
}

export function showEditedValueonDom(selectedField, list) {
    switch(selectedField.type) {
        case 'button':
            list.insertAdjacentHTML('beforeend', `
                <div class="form-group list__section">
                    ${cButton(selectedField.value, 'button')}
                </div> 
            `);
        break;
        
        case 'submit':
            list.insertAdjacentHTML('beforeend', `
                <div class="form-group list__section">
                    ${cButton(selectedField.value, 'button')}
                </div> 
            `);
        break;

        case 'checkbox':
            showCheckboxAndRadio(selectedField);
            break;

        case 'radio':
            showCheckboxAndRadio(selectedField);
            break;

        case 'dropdown':
            showDropdown(selectedField);
            break;

        case 'toggle-switch':
            showToggleSwitch(selectedField)
            break;

        default:
            list.insertAdjacentHTML('beforeend', `
                    <div class="form-group list__section">
                        <label for="${selectedField.label}" class="fb-label">${selectedField.label}</label>
                        <input
                            type="text"
                            placeholder="${selectedField.placeholder}"
                            class="form-control fb-input"
                            disabled
                        />
                    </div>
                `
            );
            break;
    }
}

// show object value on dom
export const showInputValueOnDom = (value => {
    const listWrapper = document.querySelector('.list-wrapper');
    const sideBarMain = document.querySelector('.side-bar__main');

    inputWrapper.hidden = true;
    inputWrapper.setAttribute('data-type', '');

    inputWrapper.innerHTML = '';
    inputWrapper.classList.remove('show');
    sideBarMain.classList.remove('no-pointer');

    switch(value.type) {
        case 'button':
            let html = `
                <div class="list-item" data-id="${value.id}">
                    <div class="list__section">
                        ${cHeadingSecondary(value)}
                        ${cButton(value.value, 'button')}
                    </div>
                </div>  
            `;
            listWrapper.innerHTML += html;
            break;

        case 'submit':
            html = `
                <div class="list-item" data-id="${value.id}">
                    <div class="list__section">
                        ${cHeadingSecondary(value)}
                        ${cButton(value.value, 'button')}
                    </div>
                </div> 
            `;
            listWrapper.innerHTML += html;
            break;
        
        case 'checkbox':
            showCheckboxAndRadio(value);
            break;
        
        case 'radio':
            showCheckboxAndRadio(value, value.type);
            break;
        
        case 'dropdown':
            showDropdown(value);
            break;

        case 'toggle-switch':
            showToggleSwitch(value);
            break;

        default: 
            html = `
                <div class="list-item " data-id="${value.id}">
                    <div class="list__section">
                        ${cHeadingSecondary(value)}
                        <div class="form-group">
                            <label for="${value.label}" class="fb-label">${value.label}</label>
                            <input
                                type="text"
                                placeholder="${value.placeholder}"
                                class="form-control fb-input"
                                disabled
                            />
                        </div>
                    </div>
                </div>
            `;
            listWrapper.insertAdjacentHTML('beforeend', html);
            break; 
    }
    
    // stateHandlerForListItem(value);
    // stateHandlerEditButton(value);
});

// opens the new form 
function onSubmit(event) {
    event.preventDefault();
    const sideBarMain = document.querySelector('.side-bar__main');

    if(listWrapper.innerHTML !== '') {
        inputArray.title = localStorage.getItem("title");
        inputArray.description = localStorage.getItem("description");
        
        listWrapper.remove();
        submitButton.remove();
        sideBarMain.remove();
        newForm(inputArray);
    }
}

if(submitButton) {
    submitButton.addEventListener('click', onSubmit);
}

function onLandingPageFormSubmit(event) {
    console.log('asdf')
    event.preventDefault();
    if(!title.value) {
        addValidation(title);
        addValidationOnKeyUp(title);
    } else {
        console.log('test')
        localStorage.setItem("title", title.value);
        localStorage.setItem("description", description.value);
        inputArray.title = title.value; 
        inputArray.description = description.value;
        console.log('inputArray' , inputArray);
        window.location.href = "/dashboard.html";
    }
}

if(formBuilderForm) {
	formBuilderForm.addEventListener('submit', onLandingPageFormSubmit);
}






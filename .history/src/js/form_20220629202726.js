import { cButton, cSubmitButton, cCheckBox, fetchStepper, cSelect, cToggleSwitch } from "./shared";
import { isTextInputValid, formValidation } from "./validation";

const body = document.querySelector('body .main-wrapper');
export const formContainer = document.createElement('div');

let tabularObject = {};
let tabularArray = [];

const inputButton = (form, input) => {
    const formField = cSubmitButton(input.value, input.type);
    form.innerHTML += formField;
};

const showTextArea = (form, input) => {
    const formField = `
        <div class="form-group">
            <label for="${input.label}" class="fb-label">${input.label}</label>
            <textarea placeholder="${input.placeholder}" class="form-control fb-input" name="${input.label}" max="${input.max}" min="${input.min}" mandatory="${input.isRequired}"></textarea>
            <p class="error-message"></p>
        </div>
    `;
    form.innerHTML += formField;
};

const showCheckBox = (form, input) => {
    const label = input.name;
    
    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.classList.add('checkbox-wrapper');
    form.appendChild(checkboxWrapper);

    checkboxWrapper.innerHTML += `
        <div class="checkbox-label">${label}</div>
    `;
    input.data.map(data => {
        const formField = cCheckBox(data.name, data.value, input.type)
        checkboxWrapper.innerHTML += formField;
    })
};

const showRadioButton = (form, input, index) => {
    const label = input.name;
    const radioBoxWrapper = document.createElement('div');
    radioBoxWrapper.classList.add('radio-wrapper');
    form.appendChild(radioBoxWrapper);

    radioBoxWrapper.innerHTML += `
        <div class="radio-label">${label}</div>
    `;

    input.data.map(data => {
        const formField = `
            <label class="radio-container">${data.value}
                <input type="radio" name="radio${index}" value="${data.value}" class="radio">
                <span class="checkmark"></span>
            </label>
        `
        radioBoxWrapper.innerHTML += formField;
    });
};

const showDropdown = (form, input) => {
    const formField = cSelect(input);
    form.innerHTML += formField;
    const dropdowns = formContainer.querySelectorAll('select');

    dropdowns.forEach((select, index) => {
        select.id = `select${index+1}`
    });
};

const showToggleSwitch = (form, input) => {
    const formField = cToggleSwitch(input.label);
    form.innerHTML += formField;
};

const defaultInput = (form, input) => {
    const formField = `
        <div class="form-group">
            <label for="${input.label}" class="fb-label">${input.label}</label>
            <input type="${input.type}" placeholder="${input.placeholder}" class="form-control fb-input" name="${input.label ? input.label : 'Field'}" max="${input.max}" min="${input.min}" mandatory="${input.isRequired}">
            <p class="error-message"></p>
        </div>
    `;
    form.innerHTML += formField;
};

const showFormInputs = (form, data) => {
    data.forEach((input, index) => {
        switch(input.type) {
            case 'button':
                inputButton(form, input);
                break;

            case 'submit':
                inputButton(form, input);
                break;

            case 'textarea':
                showTextArea(form, input);
                break;

            case 'checkbox': 
                showCheckBox(form, input);
                break;

            case 'radio': 
                showRadioButton(form, input, index);
                break;

            case 'dropdown': 
                showDropdown(form, input);
                break;

            case 'toggle-switch': 
                showToggleSwitch(form, input);
                break;

            default:
                defaultInput(form, input);
                break;
        }
    });
};

const checkSelectedItem = () => {
    const checkboxWrapper = formContainer.querySelectorAll('.checkbox-wrapper');
    let obj = {};

    checkboxWrapper.forEach(wrapper => {
        const checkBoxes = wrapper.querySelectorAll('.checkbox');
        const label = wrapper.querySelector('.checkbox-label');

        obj.name = label.innerText;
        
        checkBoxes.forEach(checkbox => {
            if(checkbox.checked) {
                obj.value = checkbox.value;
                tabularObject = {...tabularObject, ...obj};
                tabularArray.push(tabularObject); 
            }
        });
    })
};

const checkSelectedRadioItem = () => {
    const radioWrapper = formContainer.querySelectorAll('.radio-wrapper');
    let obj = {};

    radioWrapper.forEach(wrapper => {
        const radioButtons = wrapper.querySelectorAll('.radio');
        const label = wrapper.querySelector('.radio-label');

        obj.name = label.innerText;

        radioButtons.forEach(button => {
            if(button.checked) {
                obj.value = button.value;
                tabularObject = {...tabularObject, ...obj};
                tabularArray.push(tabularObject);
            }
        });
    });
};

const checkSelectedDropdownItem = () => {
    const dropdowns = formContainer.querySelectorAll('select');
    dropdowns.forEach(dropdown => {
        const obj = {};
        obj.name = dropdown.name
        obj.value = dropdown.value;
        tabularArray.push(obj);
    });
};

const checkSwitchState = () => {
    const togglebtns = formContainer.querySelectorAll('.switch input[type="checkbox"]');
    togglebtns.forEach(btn => {
        const obj = {};
        obj.name = btn.name;
        obj.value = btn.checked;
        tabularArray.push(obj);
    });
};

const checkValidInput = (tabularObject, data) => {
    const formControl = formContainer.querySelectorAll('.form-control');
    
    formControl.forEach(input => {
        let obj = {};
        obj.name = input.name;
        obj.value = input.value;
        obj.isvalid = input.getAttribute('isvalid');
        tabularObject = {...tabularObject, ...obj};
    
        tabularArray.push(tabularObject);
        tabularArray.title = data.title;
        tabularArray.description = data.description;
        
    });
    
    checkSelectedItem();
    checkSelectedRadioItem();
    checkSelectedDropdownItem();
    checkSwitchState();
}

export const newForm = (data => {
    formContainer.classList.add('form-container');
    body.appendChild(formContainer);

    const container = document.createElement('div');
    container.classList.add('container','container--md');
    formContainer.appendChild(container);

    container.innerHTML += fetchStepper();

    const heading = `
        <h1 class="form-container__title">${data.title ? data.title : 'Untitled Form'}</h1>
        <p class="form-container__description">${data.description}</p>
    `;
    container.innerHTML += heading;

    const form = document.createElement('form');
    form.classList.add('new-form');
    form.setAttribute('novalidate', true);
    container.appendChild(form);

    showFormInputs(form, data);
    formValidation();

    const formControl = formContainer.querySelectorAll('.form-control');

    // formControl.forEach(input => {
    //     addValidation(input);
    //     addValidationOnKeyUp(input);
    // });

    // for(let i=0; i < formControl.length; i++) {
    //     if(formControl[i].nextElementSibling.textContent === '') {
    //         formControl[i].setAttribute('isvalid', true);
            
    //     } else {
    //         formControl[i].setAttribute('isvalid', false);
    //         return false;
    //     }
    // }

    for(let i=0; i < formControl.length; i++) {
        if(formControl[i].getAttribute('mandatory') == 'false') {
            formControl[i].setAttribute('valid', true);
            
        } else {
            formControl[i].setAttribute('valid', false);
        }
    }

    console.log(mainForm.querySelectorAll('.form-control'))

    const mainForm = formContainer.querySelector('.new-form');
    mainForm.addEventListener('submit', event => {
        event.preventDefault();
        
        onMainFormSubmit(data);
    });
});

function onInvalid(e) {
    e.target.classList('error-input');
}

function onMainFormSubmit(data) {
    if(isFormValid) {
        checkValidInput(tabularObject, data);
    
        const tableContainer = document.createElement('div');
        tableContainer.classList.add('table-container');
        body.appendChild(tableContainer);
        
        document.querySelector('.table-container')
            .insertAdjacentHTML(
                'afterbegin', 
                createTable(tabularArray)
            )
    } else {
        alert('Form is invalid');
    }
}

function createTable(content) {
    let tableHead =  `
        <table class="table table-striped">
            <thead>
                <tr>
    `;

    let tableBody = `
                </tr>
            </thead>
        <tbody>
            <tr>
    `;

    const tableFoot = `
                </tr>
            </tbody>
        </table>
    `;

    content.forEach(data => {
        let name = data.name;
        let value = data.value;
        tableHead += `
            <th>${name ? name : ''}</th>
        `;
        tableBody += `
            <td>${value}</td>
        `;
    });
    return tableHead + tableBody+ tableFoot;
}





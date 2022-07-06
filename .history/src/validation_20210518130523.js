const formBuilder = document.querySelector('.form-builder');
const nameInput = document.querySelector('.name-input');
const selectInputType = document.getElementById('select-input-type');
const inputWrapper = document.querySelector('.input-wrapper');

const addValidation = ((element, errorMsg) => {
    console.log(element, errorMsg)
    const html = `
        <p>${element.name} is required.</p>
    `;

    errorMsg.innerHTML = html;
});

const removeValidation = element => {
    if(element.parentElement.querySelector('.error-message')) {
        element.parentElement.querySelector('.error-message').remove();
    }
};

nameInput.addEventListener('keyup', event => {
    removeValidation(event.target);
});

formBuilder.addEventListener('submit', event => {
    event.preventDefault();
    errorMsg = document.querySelector('.error-message');

    if(event.target.name.value === '') {
        addValidation(event.target.name, errorMsg);
    }
});

selectInputType.addEventListener('change', () => {
    if(selectInputType.value === 'text') {
        getInputText();
    }
});

const getInputText = () => {
    const inputwrapper = document.querySelector('.input-wrapper');
    const html = `
        <div class="form-group">
            <label for="label">Enter Label<span class="required">*</span></label>
            <input type="text" placeholder="Enter Label" class="form-control" name="label">
            <p class="error-message"></p>
        </div>

        <div class="form-group">
            <label for="label">Enter Placeholder(optional)</label>
            <input type="text" placeholder="Enter placeholder" class="form-control" name="placeholder">
            <p class="error-message"></p>
        </div>

        <button class="btn btn-primary btn-sm add-item" type="button">
            Done
        </button>
    `;
    inputwrapper.innerHTML = html;
};

// set input value to array
inputWrapper.addEventListener('click', (event) => {
    inputValue = [];
    const formControl = inputWrapper.querySelectorAll('.form-control');
    const errorMsg = inputWrapper.querySelectorAll('.error-message');
    
    if(event.target.tagName == 'BUTTON') {
        formControl.forEach(input => {
            if(input.value) {
                inputValue.push(input.value);
            } 
            else {
                addValidation(input, errorMsg);
            }
        });
        console.log(inputValue);
    }
});
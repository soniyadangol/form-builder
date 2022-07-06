const formBuilder = document.querySelector('.form-builder');
const inputs = document.querySelector('.form-control');
const selectInputType = document.getElementById('select-input-type');
const inputWrapper = document.querySelector('.input-wrapper');

const addValidation = (element => {
    const errorMessage = element.nextElementSibling;
    const html = `
        <p>${element.name} is required.</p>
    `;
    errorMessage.innerHTML = html;
});

const removeValidation = element => {
    console.log(element.value);
    if(element.parentElement.querySelector('.error-message')) {
        element.parentElement.querySelector('.error-message').remove();
    }
};

const removeValidationOnKeyUp = inputs => {
    console.log('asf')
    inputs.addEventListener('keyup', event => {
        removeValidation(event.target);
    });
};

formBuilder.addEventListener('submit', event => {
    event.preventDefault();
    if(event.target.name.value === '') {
        addValidation(event.target.name)
    }
});
removeValidationOnKeyUp(inputs);

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
            <input type="text" placeholder="Enter Label" class="form-control" name="label" required="required">
            <p class="error-message"></p>
        </div>

        <div class="form-group">
            <label for="label">Enter Placeholder(optional)</label>
            <input type="text" placeholder="Enter placeholder" class="form-control" name="placeholder">
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
    
    if(event.target.tagName == 'BUTTON') {
        formControl.forEach(input => {
            if(input.value) {
                removeValidationOnKeyUp(input);
                inputValue.push(input.value);
            }
            if(input.getAttribute('required') === 'required') {
                addValidation(input);
            }
        });
        console.log(inputValue);
    }
});
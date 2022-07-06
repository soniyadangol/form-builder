// sets the template if the user selected input type text
const getInputText = () => {
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('label', 'input')}
        ${cInput('placeholder', 'input')}
        ${cRequiredCheckBox()}
        ${cMinMax()}
        ${cAddItemButton()}
    `;
    inputWrapper.innerHTML = html;
    submitButton.disabled = false;
};

// get Text area template
const getTextArea = () => {
    inputWrapper.classList.add('show');
    const html = `
        ${cInput('label', 'input')}
        ${cInput('placeholder', 'input')}
        ${cRequiredCheckBox()}
        ${cMinMax()}
        ${cAddItemButton()}
    `;
    inputWrapper.innerHTML = html;
    submitButton.disabled = false;
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

export { getInputText, getTextArea };
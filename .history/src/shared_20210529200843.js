const cInput = (name, type, className, min, max) => { 
    return `
        <div class="form-group">
            <label for="${name}">${name}</label>
            <input type="${type}" placeholder="${name}" class="form-control ${className}" name="${name}" max="${max}" min="${min}">
            <p class="error-message"></p>
        </div>
    `;
};

const cInputTextarea = (name, rows, cols, max, min) => {
    return `
        <div class="form-group">
            <label for="${name}">${name}</label>
            <textarea name="${name}" rows="${rows}" cols="${cols}" class="form-control" max="${max}" min="${min}"></textarea>
            <p class="error-message"></p>
        </div>
    `;
};

const cRequiredCheckBox = () => {
    return `
        <div class="form-group">
            <input type="checkbox" name="required" class="required">
            <label for="checkbox">Required</label>
        </div>
    `
};

const cMinMax = () => {
    return `
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Max</span>
            </div>
            <input type="text" class="form-control" placeholder="Enter max value" name="max">
            <div class="input-group-prepend">
                <span class="input-group-text">Min</span>
            </div>
            <input type="text" class="form-control" placeholder="Enter min value" name="min">
        </div>
    `;
};

const cAddItemButton = () => {
    return `
        <div class="form-group">
            <button class="btn btn-primary btn-sm add-item" type="button">
                Done
            </button>
        </div>
    `;
}

const cButton = (value, className) => {
    return `
        <div class="form-group">
            <button class="btn btn-primary ${className}" type="button">
                ${value}
            </button>
        </div>
    `;
}

const cSelect = value => {
    return `
        <label for="${value.name}">
        <select name="${value.name}">
            ${value.data.map(data => 
                `<option value="${data.name}">${data.value}</option>`
            )}
        </select>`;
}

export { cInput, cRequiredCheckBox, cMinMax, cAddItemButton, cInputTextarea, cSelect, cButton };
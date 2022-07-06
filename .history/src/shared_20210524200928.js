const cInput = (name, type, min, max) => { 
    const html = `
        <div class="form-group">
            <label for="${name}">${name}</label>
            <input type="${type}" placeholder="${name}" class="form-control" name="${name}" max="${max}" min="${min}">
            <p class="error-message"></p>
        </div>
    `;
    return html;
};

const cInputTextarea = (name, rows, cols, max, min) => {
    const html = `
        <div class="form-group">
            <label for="${name}">${name}</label>
            <textarea name="${name}" rows="${rows}" cols="${cols}" class="form-control" max="${max}" min="${min}"></textarea>
            <p class="error-message"></p>
        </div>
    `;
    return html;
};

const cRequiredCheckBox = () => {
    const html = `
        <div class="form-group">
            <input type="checkbox" name="required" class="required">
            <label for="checkbox">Required</label>
        </div>
    `
    return html;
};

const cMinMax = () => {
    const html = `
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
    return html;
};

const cAddItemButton = () => {
    const html = `
        <div class="form-group">
            <button class="btn btn-primary btn-sm add-item" type="button">
                Done
            </button>
        </div>
    `;
    return html;
}

const cButton = (value, className) => {
    const html = `
        <div class="form-group">
            <button class="btn btn-primary ${className}" type="button">
                ${value}
            </button>
        </div>
    `;
    return html;
}

const cSelect = (name, ...value) => {
    const html = `
        <select name="${name}">
            <option value="">Volvo</option>
            <option value="">Saab</option>
            <option value="">Mercedes</option>
            <option value="">Audi</option>
        </select>
    `;
    return html;
}

export { cInput, cRequiredCheckBox, cMinMax, cAddItemButton, cInputTextarea, cSelect, cButton };
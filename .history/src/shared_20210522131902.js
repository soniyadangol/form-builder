const cInput = name => {
    const html = `
        <div class="form-group">
            <label for="${name}">Enter ${name}</label>
            <input type="text" placeholder="Enter ${name}" class="form-control" name="${name}">
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

export { cInput, cRequiredCheckBox, cMinMax, cAddItemButton };
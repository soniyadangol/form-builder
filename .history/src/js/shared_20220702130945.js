const cInput = (name, type, className, min, max, value='') => { 
    return `
		<div class="form-group">
			<label for="${name}" class="fb-label">${name}</label>
			<input
				type="${type}"
				placeholder="${name}"
				class="form-control fb-input ${className}"
				name="${name}" 
				max="${max}" 
				min="${min}" 
				value="${value}"
			/>
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

const cCheckBox = (name, value, className) => {
    return `
		<label class="checkbox-container">${value}
			<input type="checkbox" name="${name}" value="${value}" class="${className}">
			<span class="checkmark"></span>
		</label>
    `
};

const cRadioButton = (name, value, className) => {
    return `
        <label class="radio-container">${value}
            <input type="radio" name="${name}" class="${className}">
            <span class="checkmark"></span>
        </label>
    `
};

const cMinMax = (minValue = '', maxValue = '') => {
    return `
		<div class="fb-col">
            <div class="form-group">
                <input
                    type="number"
                    placeholder="Max"
                    class="form-control fb-input"
                    value="${maxValue}"
                    name="max"
                />
            </div>
		</div>
		<div class="fb-col">
            <div class="form-group">
                <input
                    type="number"
                    placeholder="Min"
                    class="form-control fb-input"
                    value="${minValue}"
                    name="min"
                />
            </div>
		</div>
    `;
};

const cAddItemButton = (state, value) => {
    if(state === 'add') {
        return `
            <button class="fb-tertiary-button add-item" type="button">
                Done
            </button>
        `;
    } else {
        return `
            <button class="fb-tertiary-button edit-item" type="button" data-id="${value.id}">
                Done
            </button>
        `;
    }
}

const cButton = (value, type, className = '') => {
    return `
        <div class="form-group">
            <button class="${className} fb-tertiary-button" type="${type}">
                ${value}
            </button>
        </div>
    `;
}

const cSubmitButton = (value, type, className = '') => {
    return `
        <button type="${type}" class="fb-button ${className}">${value}</button>
    `;
}

const cSelect = value => {
    return `
        <label for="${value.name}">${value.name}</label>
        <div class="fb-select">
            <select name="${value.name}">
                ${value.data.map(data => 
                    `<option value="${data.value}">${data.value}</option>`
                )}
            </select>
        </div>
    `;
}

const cToggleSwitch = name => {
    return `
        <div class="fb-toggle">
            <p class="fb-toggle__text">${name}</p>
            <label class="switch">
                <input type="checkbox" name="${name}">
                <span class="slider round"></span>
            </label>
        </div>
    `;
}

const cHeading = type => {
	return `
		<p class="heading">
			Input Type - <span class="heading__emphasized">${type}</span>
		</p>
	`;
};

const cHeadingSecondary = value => {
	return `
		<div class="heading heading--secondary">
			<p>Input Type - <span class="heading__emphasized">${value.type}</span></p> 
			<div class="action-button-wrapper">
				<button type="button" class="action-button edit-button" title="Edit">
					<img src="images/edit.png" alt="edit" class="action-button-icon">
				</button>
				<button type="button" class="action-button delete-button" title="Delete">
					<img src="images/trash.png" alt="edit" class="action-button-icon">
				</button>
			</div>
		</div>
	`;
}

export function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const fetchStepper = (value) => {
    return `
        <ul class="stepper">
            <li class="stepper__item ${value === 'formActive' ? 'active' : ''}">
                <span class="stepper__number">1</span>
                <p class="stepper__text">Main Form</p>
            </li>
            <li class="stepper__item">
                <span class="stepper__number ${value == 'detailActive' ? 'active' : ''}">2</span>
                <p class="stepper__text">Detail Information</p>
            </li>
        </ul>
    `;
}

export { cInput, cCheckBox, cMinMax, cAddItemButton, cInputTextarea, cSelect, cButton, cSubmitButton, cRadioButton, cToggleSwitch, cHeading, cHeadingSecondary, fetchStepper };
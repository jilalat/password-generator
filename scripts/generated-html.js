export const generateInputs = (inputsList, passwordType) => {
  return inputsList
    .map(
      ({ content, isChecked, helper }) => `
      <label class="switch">
        <input
          id="${content.toLowerCase()}${
        passwordType === 'random' ? 'Random' : 'Memorable'
      }Switch"
          type="${passwordType === 'random' ? 'checkbox' : 'radio'}"
          name="${passwordType === 'memorable' ? 'memorable' : ''}"
          ${isChecked ? 'checked' : ''}>
        <span class="slider"></span>
        ${content}
        ${helper ? `<span class="helper">${helper}</span>` : ''}
      </label>
    `
    )
    .join('');
};

export const generateTabs = (keys, passwordType) => {
  return keys
    .map(key => {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      return `
      <input type="radio" id="${key}-tab" name="tab" 
      ${key === passwordType ? 'checked' : ''}>
      <label for="${key}-tab">
      ${capitalizedKey}
      </label>
      `;
    })
    .join('');
};

export const generatePasswordLengthRange = value => {
  return `
    <input type="range" id="passwordLengthMeter" value="${value}" min="1" max="64" aria-labelledby="passwordLength" /><input id="passwordLengthInput" type="number" value="${value}" min="1" max="64" />
  `;
};

export const generatePasswordCopiedPopUp = () => {
  const popup = document.createElement('div');
  popup.id = 'copyNotification';
  popup.textContent = 'Password copied';
  return popup;
};

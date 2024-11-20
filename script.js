import { inputsList } from './data.js';
import {
  generateInputs,
  generatePasswordLengthRange,
  generateTabs,
} from './generated-html.js';
import {
  fetchRandomWords,
  getAvailableCharacters,
  getAvailableWords,
  memorableSwitchsListeners,
  randomSwitchsListeners,
} from './helpers.js';

const LIMIT_OF_GENERATED_WORDS = 1000;
const GENERATED_WORDS = await fetchRandomWords(LIMIT_OF_GENERATED_WORDS);

let password = [];
let passwordType = 'random';
let passwordLengthValue = 31;

const output = document.querySelector('output');

const regeneratePassword = document.querySelector('#regenerateBtn');
const copyPassword = document.querySelector('#copyBtn');

const passwordLengthRange = document.querySelector('#passwordLengthRange');
const decrementPasswordLength = document.querySelector(
  '#decrementPasswordLength'
);
const incrementPasswordLength = document.querySelector(
  '#incrementPasswordLength'
);

const tabs = document.querySelector('#tabs');

tabs.innerHTML = generateTabs(Object.keys(inputsList), passwordType);
const randomTab = document.querySelector('#random-tab');
const memorableTab = document.querySelector('#memorable-tab');

const inputs = document.querySelector('#inputs');
const updateInputs = passwordType => {
  inputs.innerHTML = generateInputs(inputsList[passwordType], passwordType);
};

const updatePasswordLengthRange = passwordLengthValue => {
  passwordLengthRange.innerHTML =
    generatePasswordLengthRange(passwordLengthValue);
};

const generatePassword = (passwordType, passwordLength) => {
  password = [];
  const filteredPassword =
    passwordType === 'random'
      ? getAvailableCharacters(inputsList)
      : getAvailableWords(inputsList, GENERATED_WORDS);
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * filteredPassword.length);
    password.push(filteredPassword[randomIndex]);
  }
  output.textContent = password.join(passwordType === 'random' ? '' : ' - ');
};

updatePasswordLengthRange(passwordLengthValue);
updateInputs(passwordType);
generatePassword(passwordType, passwordLengthValue);
randomSwitchsListeners(inputsList, () =>
  generatePassword(passwordType, passwordLengthValue)
);

randomTab.addEventListener('click', () => {
  passwordType = 'random';
  passwordLengthValue = 31;
  passwordLengthInput.value = passwordLengthValue;
  passwordLengthMeter.value = passwordLengthValue;
  updateInputs(passwordType);
  generatePassword(passwordType, passwordLengthValue);
  randomSwitchsListeners(inputsList, () =>
    generatePassword(passwordType, passwordLengthValue)
  );
});

memorableTab.addEventListener('click', () => {
  passwordType = 'memorable';
  passwordLengthValue = 6;
  passwordLengthInput.value = passwordLengthValue;
  passwordLengthMeter.value = passwordLengthValue;
  updateInputs(passwordType);
  generatePassword(passwordType, passwordLengthValue);
  memorableSwitchsListeners(inputsList, password, output);
});

const passwordLengthMeter = document.querySelector('#passwordLengthMeter');
const passwordLengthInput = document.querySelector('#passwordLengthInput');

passwordLengthMeter.addEventListener('input', e => {
  passwordLengthValue = +e.target.value;
  generatePassword(passwordType, e.target.value);
  passwordLengthInput.value = e.target.value;
});

passwordLengthInput.addEventListener('input', e => {
  const value = Math.max(1, Math.min(64, parseInt(e.target.value, 10)));
  e.target.value = passwordLengthValue = value;
  passwordLengthValue = value;
  generatePassword(passwordType, value);
  passwordLengthMeter.value = value;
});

decrementPasswordLength.addEventListener('click', () => {
  if (passwordLengthValue === 1) {
    return;
  } else {
    passwordLengthValue -= 1;
    passwordLengthInput.value = passwordLengthValue;
    passwordLengthMeter.value = passwordLengthValue;
    generatePassword(passwordType, passwordLengthValue);
  }
});

incrementPasswordLength.addEventListener('click', () => {
  if (passwordLengthValue === 64) {
    return;
  } else {
    passwordLengthValue += 1;
    passwordLengthInput.value = passwordLengthValue;
    passwordLengthMeter.value = passwordLengthValue;
    generatePassword(passwordType, passwordLengthValue);
  }
});

regeneratePassword.addEventListener('click', () => {
  let generationCount = 0;
  copyPassword.disabled = true;
  const passwordGenerationInterval = setInterval(() => {
    generatePassword(passwordType, passwordLengthValue);
    if (++generationCount >= 5) {
      clearInterval(passwordGenerationInterval);
      copyPassword.disabled = false;
    }
  }, 50);
});

copyPassword.addEventListener('click', () => {
  navigator.clipboard.writeText(output.textContent);
});

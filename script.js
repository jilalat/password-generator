const output = document.getElementById('output');
const passwordLengthRange = document.querySelector('.password-length-range');
const decrementPasswordLength = document.querySelector('.decrement-length');
const incrementPasswordLength = document.querySelector('.increment-length');

const randomPasswordUppercase = document.getElementById(
  'random-password-uppercase'
);
const randomPasswordLowercase = document.getElementById(
  'random-password-lowercase'
);
const randomPasswordNumbers = document.getElementById(
  'random-password-numbers'
);
const randomPasswordSymbols = document.getElementById(
  'random-password-symbols'
);

const RANDOM_PASSWORD_INPUTS = [
  randomPasswordUppercase,
  randomPasswordLowercase,
  randomPasswordNumbers,
  randomPasswordSymbols,
];

const getRandomCharacters = (start, end) => {
  let Characters = '';
  for (i = start; i <= end; i++) {
    Characters += String.fromCharCode(i);
  }
  return Characters;
};

let passwordLength = 16;
const UPPERCASE_CHARACTERS = getRandomCharacters(65, 90);
const LOWERCASE_CHARACTERS = UPPERCASE_CHARACTERS.toLowerCase();
const NUMBERS_CHARACTERS = getRandomCharacters(48, 57);
const SYMBOLS_CHARACTERS = getRandomCharacters(33, 47)
.concat(getRandomCharacters(58, 64))
.concat(getRandomCharacters(91, 96))
.concat(getRandomCharacters(123, 126));

const getAvailableCharacters = () => {
  let availableCharacters = ""
  const areAllChecked = RANDOM_PASSWORD_INPUTS.every(item => !item.checked);
  if (areAllChecked) randomPasswordUppercase.checked = "checked"

  if(randomPasswordUppercase.checked) availableCharacters += UPPERCASE_CHARACTERS
  if(randomPasswordLowercase.checked) availableCharacters += LOWERCASE_CHARACTERS
  if(randomPasswordNumbers.checked) availableCharacters += NUMBERS_CHARACTERS
  if(randomPasswordSymbols.checked) availableCharacters += SYMBOLS_CHARACTERS;

  return availableCharacters
};

(generatePassword = () => {
  let password = '';
  let availableCharacters = getAvailableCharacters();
  for (i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * availableCharacters.length);
    password += availableCharacters[randomIndex];
  }
  output.value = password;
})();



passwordLengthRange.addEventListener('change', (e) => {
  passwordLength = e.target.value;
    generatePassword();
});

incrementPasswordLength.addEventListener('click', (e) => {
  passwordLength <  100  && passwordLength ++;
  getAvailableCharacters();
  generatePassword();
  passwordLengthRange.value = passwordLength
});
decrementPasswordLength.addEventListener('click', (e) => {
  passwordLength > 1 && passwordLength --;
  getAvailableCharacters();
  generatePassword();
  passwordLengthRange.value = passwordLength
});

RANDOM_PASSWORD_INPUTS.forEach(item => {
  item.addEventListener('change', () => {
    getAvailableCharacters();
    generatePassword();
  });
});

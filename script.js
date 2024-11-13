const introParagraph = document.querySelector('.intro-paragraph');

const output = document.getElementById('output');
const regeneratePassword = document.querySelector('.regenerate-password');
const copyPassword = document.querySelector('.copy-password');
const showCopiedPopUp = document.querySelector('.show-copied-pop-up');
const showCopiedPopUpTriangle = document.querySelector(
  '.show-copied-pop-up-triangle'
);

const passwordTab = document.getElementById('password-tab');
const passwordTabContent = document.querySelector('.password-tab-content');
const passphraseTab = document.getElementById('passphrase-tab');
const passphraseTabContent = document.querySelector('.passphrase-tab-content');

const passwordLength = document.querySelector('.password-length');
const showPasswordLength = document.querySelector('.show-password-length');
const decrementPasswordLength = document.querySelector('.decrement-length');
const incrementPasswordLength = document.querySelector('.increment-length');

const passwordUppercase = document.getElementById('password-uppercase');
const passwordLowercase = document.getElementById('password-lowercase');
const passwordNumbers = document.getElementById('password-numbers');
const passwordSymbols = document.getElementById('password-symbols');

const passPhraseLowercase = document.getElementById('passphrase-lowercase');
const passPhraseUppercase = document.getElementById('passphrase-uppercase');
const passPhraseCapitalize = document.getElementById('passphrase-capitalize');
const passPhraseMixedCase = document.getElementById('passphrase-mixed-case');

const LIMIT_OF_GENERATED_WORDS = 1000;

const getRandomCharactersFromCharCode = (start, end) => {
  let Characters = '';
  for (i = start; i <= end; i++) {
    Characters += String.fromCharCode(i);
  }
  return Characters;
};

let wordsList = [];
let passPhraseCase = [];
let casedPassPhrase = [];

fetch(
  `https://random-word-api.herokuapp.com/word?number=${LIMIT_OF_GENERATED_WORDS}`
)
  .then(response => response.json())
  .then(wordsData => {
    for (word in wordsData) {
      wordsList.push(wordsData[word]);
    }
  });

const PASSWORD_CHECKBOXES = [
  passwordUppercase,
  passwordLowercase,
  passwordNumbers,
  passwordSymbols,
];

const UPPERCASE_CHARACTERS = getRandomCharactersFromCharCode(65, 90);
const LOWERCASE_CHARACTERS = UPPERCASE_CHARACTERS.toLowerCase();
const NUMBERS_CHARACTERS = getRandomCharactersFromCharCode(48, 57);
const SYMBOLS_CHARACTERS = getRandomCharactersFromCharCode(33, 47)
  .concat(getRandomCharactersFromCharCode(58, 64))
  .concat(getRandomCharactersFromCharCode(91, 96))
  .concat(getRandomCharactersFromCharCode(123, 126));

const introParagraphText =
  'Instantly generate a secure, random password or passphrase, with zero effort';
let introParagraphTextIndex = 0;

const typing = () => {
  if (introParagraphTextIndex <= introParagraphText.length) {
    introParagraph.innerHTML = introParagraphText.substring(
      0,
      introParagraphTextIndex
    );
    introParagraphTextIndex++;
  }
};
setTimeout(setInterval(typing, 100), 0);

const getAvailableCharacters = () => {
  let availableCharacters = '';

  if (PASSWORD_CHECKBOXES.every(item => !item.checked))
    passwordLowercase.checked = 'checked';
  if (passwordLowercase.checked) availableCharacters += LOWERCASE_CHARACTERS;
  if (passwordUppercase.checked) availableCharacters += UPPERCASE_CHARACTERS;
  if (passwordNumbers.checked) availableCharacters += NUMBERS_CHARACTERS;
  if (passwordSymbols.checked) availableCharacters += SYMBOLS_CHARACTERS;

  return availableCharacters;
};

const capitalizeWords = wordsList =>
  wordsList.map(
    word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

const setWordInMixedCase = word => {
  let mixedCaseWord = '';
  for (let i = 0; i < word.length; i++) {
    Math.random() < 0.5
      ? (mixedCaseWord += word.charAt(i).toUpperCase())
      : (mixedCaseWord += word.charAt(i).toLowerCase());
  }
  return mixedCaseWord;
};
const setWordsInMixedCase = wordsList => wordsList.map(setWordInMixedCase);

const getPassPhraseCase = () => {
  if (passPhraseLowercase.checked) passPhraseCase = wordsList;
  if (passPhraseUppercase.checked)
    passPhraseCase = wordsList.map(word => word.toUpperCase());
  if (passPhraseCapitalize.checked) passPhraseCase = capitalizeWords(wordsList);
  if (passPhraseMixedCase.checked)
    passPhraseCase = setWordsInMixedCase(wordsList);
  return passPhraseCase;
};

const addBackgroundClassToBodyInCasePasswordTabIsChecked = () => {
  return `flex min-h-screen bg-[${
    passwordLength.value >= 1 && passwordLength.value <= 3
      ? '#d1364e'
      : passwordLength.value >= 4 && passwordLength.value <= 7
      ? '#ff3f46'
      : passwordLength.value >= 8 && passwordLength.value <= 11
      ? '#fe6f35'
      : passwordLength.value >= 12 && passwordLength.value <= 15
      ? '#fcae1e'
      : passwordLength.value >= 16 && passwordLength.value <= 19
      ? '#9dce5b'
      : passwordLength.value >= 31 && passwordLength.value <= 63
      ? '#3ded97'
      : '#00b4d8'
  }]`;
};
const addBackgroundClassToBodyInCasePassPhraseTabIsChecked = () => {
  return `flex min-h-screen bg-[${
    passwordLength.value == 1
      ? '#d1364e'
      : passwordLength.value == 2
      ? '#ff3f46'
      : passwordLength.value == 3
      ? '#fe6f35'
      : passwordLength.value == 4
      ? '#fcae1e'
      : passwordLength.value == 5
      ? '#9dce5b'
      : passwordLength.value == 6
      ? '#3ded97'
      : '#00b4d8'
  }]`;
};

const checkPasswordStrength = () => {
  document.body.classList = passwordTab.checked
    ? addBackgroundClassToBodyInCasePasswordTabIsChecked()
    : addBackgroundClassToBodyInCasePassPhraseTabIsChecked();
  showPasswordLength.style.left = `${passwordLength.value - 1}%`;
  showPasswordLength.nextElementSibling.style.left = `${
    passwordLength.value < 50
      ? passwordLength.value - 4
      : passwordLength.value - 3
  }%`;
};

(generatePassword = () => {
  let password = '';
  let filteredCharacters = getAvailableCharacters();
  showPasswordLength.textContent = passwordLength.value;
  passwordLength.setAttribute('value', passwordLength.value);
  checkPasswordStrength();
  for (i = 0; i < passwordLength.value; i++) {
    const randomIndex = Math.floor(Math.random() * filteredCharacters.length);
    password += filteredCharacters[randomIndex];
  }
  output.textContent = password;
})();

const generatePassPhrase = () => {
  let PassPhrase = [];
  let filteredPassPhraseCase = getPassPhraseCase();
  showPasswordLength.textContent = passwordLength.value;
  passwordLength.setAttribute('value', passwordLength.value);
  checkPasswordStrength();
  for (i = 0; i < passwordLength.value; i++) {
    const randomIndex = Math.floor(
      Math.random() * filteredPassPhraseCase.length
    );
    PassPhrase.push(filteredPassPhraseCase[randomIndex]);
  }
  casedPassPhrase = PassPhrase;
  output.textContent = PassPhrase.join(' - ');
};

const isRandomPasswordOrPassPhrase = () => {
  passwordTab.checked ? generatePassword() : generatePassPhrase();
};

const toggleClass = (element1, element2, toggledClass = 'hidden') => {
  element1.classList.toggle(toggledClass);
  element2.classList.toggle(toggledClass);
};

const toggleTabsClasses = () => {
  toggleClass(passwordTabContent, passphraseTabContent);
  toggleClass(passwordTabContent, passphraseTabContent, 'flex');
  output.classList.toggle('tracking-[3px]');
  output.classList.toggle('break-keep');
  output.classList.toggle('tracking-wider');
};

regeneratePassword.addEventListener('click', () => {
  isRandomPasswordOrPassPhrase();
});

copyPassword.addEventListener('click', () => {
  navigator.clipboard.writeText(output.textContent);
  toggleClass(showCopiedPopUp, showCopiedPopUpTriangle);
  setTimeout(() => {
    toggleClass(showCopiedPopUp, showCopiedPopUpTriangle);
  }, 1310);
});

passwordTab.addEventListener('click', () => {
  passwordLength.value = 20;
  generatePassword();
  toggleTabsClasses();
});

passphraseTab.addEventListener('click', () => {
  passwordLength.value = 6;
  generatePassPhrase();
  toggleTabsClasses();
});

passwordLength.addEventListener('input', () => {
  isRandomPasswordOrPassPhrase();
});

incrementPasswordLength.addEventListener('click', () => {
  if (passwordLength.value < 100) {
    passwordLength.value++;
    isRandomPasswordOrPassPhrase();
  }
});

decrementPasswordLength.addEventListener('click', () => {
  if (passwordLength.value > 1) {
    passwordLength.value--;
    isRandomPasswordOrPassPhrase();
  }
});

PASSWORD_CHECKBOXES.forEach(item => {
  item.addEventListener('change', () => {
    generatePassword();
  });
});

passPhraseLowercase.addEventListener('change', () => {
  output.textContent = casedPassPhrase
    .map(word => word.toLowerCase())
    .join(' - ');
});

passPhraseUppercase.addEventListener('change', () => {
  output.textContent = casedPassPhrase
    .map(word => word.toUpperCase())
    .join(' - ');
});

passPhraseCapitalize.addEventListener('change', () => {
  output.textContent = capitalizeWords(casedPassPhrase).join(' - ');
});

passPhraseMixedCase.addEventListener('change', () => {
  output.textContent = setWordsInMixedCase(casedPassPhrase).join(' - ');
});

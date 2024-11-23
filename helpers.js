const getRandomCharactersFromCharCode = (start, end) => {
  let Characters = '';
  for (let i = start; i <= end; i++) {
    Characters += String.fromCharCode(i);
  }
  return Characters;
};

export const fetchRandomWords = async maxWords => {
  try {
    const response = await fetch(
      `https://api.datamuse.com/words?ml=random&max=${maxWords}`
    );
    const wordsData = await response.json();
    return wordsData
      .map(item => item.word)
      .filter(word => !word.includes(' ') && !word.includes('-'));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const UPPERCASE_CHARACTERS = getRandomCharactersFromCharCode(65, 90);
const LOWERCASE_CHARACTERS = UPPERCASE_CHARACTERS.toLowerCase();
const NUMBERS_CHARACTERS = getRandomCharactersFromCharCode(48, 57);
const SYMBOLS_CHARACTERS = getRandomCharactersFromCharCode(33, 47)
  .concat(getRandomCharactersFromCharCode(58, 64))
  .concat(getRandomCharactersFromCharCode(91, 96))
  .concat(getRandomCharactersFromCharCode(123, 126));

export const getAvailableCharacters = inputsList => {
  const characterTypes = {
    lowercase: LOWERCASE_CHARACTERS,
    UPPERCASE: UPPERCASE_CHARACTERS,
    Numbers: NUMBERS_CHARACTERS,
    Symbols: SYMBOLS_CHARACTERS,
  };

  return Object.keys(characterTypes).reduce((availableCharacters, type) => {
    const isChecked = inputsList.random.some(
      item => item.content === type && item.isChecked
    );
    return isChecked
      ? availableCharacters + characterTypes[type]
      : availableCharacters;
  }, '');
};

const transformWord = (word, type) => {
  const transforms = {
    lowercase: word => word.toLowerCase(),
    uppercase: word => word.toUpperCase(),
    capitalize: word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    mixed: word =>
      [...word]
        .map(char =>
          Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase()
        )
        .join(''),
  };
  return transforms[type](word);
};

export const getAvailableWords = (inputsList, generatedWords) => {
  const transformationTypes = ['lowercase', 'UPPERCASE', 'Capitalize', 'MiXEd'];

  const availableWords = transformationTypes.reduce((words, type) => {
    const isChecked = inputsList.memorable.some(
      item => item.content === type && item.isChecked
    );
    return isChecked
      ? words.map(word => transformWord(word, type.toLowerCase()))
      : words;
  }, generatedWords);

  return availableWords;
};

export const animatePasswordGeneration = (copyPassword, generatePassword) => {
  let generationCount = 0;
  copyPassword.disabled = true;
  const passwordGenerationInterval = setInterval(() => {
    generatePassword();
    if (++generationCount >= 5) {
      clearInterval(passwordGenerationInterval);
      copyPassword.disabled = false;
    }
  }, 50);
};

const STRENGTH_LEVELS = [
  'very-week',
  'week',
  'medium',
  'good',
  'strong',
  'very-strong',
  'unbelievable',
];

const STRENGTH_RANGES = {
  random: {
    ranges: [3, 7, 11, 15, 19, 30],
    getIndex: length =>
      STRENGTH_RANGES.random.ranges.findIndex(max => length <= max),
  },
  memorable: {
    getIndex: length => length - 1,
  },
};

export const determinePasswordStrength = (
  passwordType,
  length,
  outputWrapper
) => {
  outputWrapper.classList.remove(...STRENGTH_LEVELS);
  const index = STRENGTH_RANGES[passwordType].getIndex(length);
  const strength =
    STRENGTH_LEVELS[index] || STRENGTH_LEVELS[STRENGTH_LEVELS.length - 1];
  outputWrapper.classList.add(strength);
};

export const randomSwitchsListeners = (
  inputsList,
  copyPassword,
  generatePassword
) => {
  ['lowercase', 'uppercase', 'numbers', 'symbols'].forEach(content => {
    const switchElement = document.querySelector(`#${content}RandomSwitch`);
    switchElement.addEventListener('change', e => {
      const option = inputsList.random.find(
        item => item.content.toLowerCase() === content
      );
      if (option) {
        option.isChecked = e.target.checked;
      }
      if (!inputsList.random.some(item => item.isChecked)) {
        const lowercaseOption = inputsList.random.find(
          item => item.content === 'lowercase'
        );
        if (lowercaseOption) {
          lowercaseOption.isChecked = true;
          const lowercaseSwitch = document.querySelector(
            '#lowercaseRandomSwitch'
          );
          if (lowercaseSwitch) lowercaseSwitch.checked = true;
        }
      }
      animatePasswordGeneration(copyPassword, generatePassword);
    });
  });
};

export const memorableSwitchsListeners = (inputsList, password, output) => {
  ['lowercase', 'uppercase', 'capitalize', 'mixed'].forEach(content => {
    const switchElement = document.querySelector(`#${content}MemorableSwitch`);
    if (!switchElement) return;
    switchElement.addEventListener('change', e => {
      if (e.target.checked) {
        inputsList.memorable.forEach(
          option =>
            (option.isChecked = option.content.toLowerCase() === content)
        );
        output.textContent = password
          .map(word => transformWord(word, content))
          .join(' - ');
      }
    });
  });
};

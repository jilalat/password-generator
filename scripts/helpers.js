const getRandomCharactersFromCharCode = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) =>
    String.fromCharCode(start + i)
  ).join('');

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
  const availableWords = inputsList.memorable
    .map(item => item.content)
    .reduce((words, type) => {
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

const getStrengthIndex = (length, ranges) => {
  if (!ranges) return length - 1;
  return ranges.findIndex(max => length <= max);
};

export const determinePasswordStrength = (
  passwordType,
  length,
  outputWrapper
) => {
  const strengthClasses = [
    'very-week',
    'week',
    'medium',
    'good',
    'strong',
    'very-strong',
    'unbelievable',
  ];
  const ranges = passwordType === 'random' ? [3, 7, 11, 15, 19, 30] : null;
  const index = getStrengthIndex(length, ranges);
  const strength =
    strengthClasses[index] || strengthClasses[strengthClasses.length - 1];
  outputWrapper.classList.remove(...strengthClasses);
  outputWrapper.classList.add(strength);
};

export const randomSwitchsListeners = (
  inputsList,
  copyPassword,
  generatePassword
) => {
  inputsList.random
    .map(item => item.content.toLowerCase())
    .forEach(content => {
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

export const memorableSwitchsListeners = (inputsList, getPassword, output) => {
  inputsList.memorable
    .map(item => item.content.toLowerCase())
    .forEach(content => {
      const switchElement = document.querySelector(
        `#${content}MemorableSwitch`
      );
      if (!switchElement) return;
      switchElement.addEventListener('change', e => {
        if (e.target.checked) {
          inputsList.memorable.forEach(
            option =>
              (option.isChecked = option.content.toLowerCase() === content)
          );
          const updatedPassword = getPassword();
          output.textContent = updatedPassword
            .map(word => transformWord(word, content))
            .join(' - ');
        }
      });
    });
};

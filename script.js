const body = document.querySelector('body');
const introParagraph = document.querySelector('.intro-paragraph');

const output = document.getElementById('output');

const passwordTab = document.getElementById('password-tab');
const passphraseTab = document.getElementById('passphrase-tab');

const inputBtnsWrapper = document.querySelector('.buttons-wrapper');
const regeneratePassword = document.querySelector('.regenerate-password');
const copyPassword = document.querySelector('.copy-password');

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

const getRandomCharactersFromCharCode = (start, end) => {
  let Characters = '';
  for (i = start; i <= end; i++) {
    Characters += String.fromCharCode(i);
  }
  return Characters;
};

const PASSWORD_INPUTS = [
  passwordUppercase,
  passwordLowercase,
  passwordNumbers,
  passwordSymbols,
];

const PASSPHRASE_RADIOS = [
  passPhraseLowercase,
  passPhraseUppercase,
  passPhraseCapitalize,
  passPhraseMixedCase,
];

const UPPERCASE_CHARACTERS = getRandomCharactersFromCharCode(65, 90);
const LOWERCASE_CHARACTERS = UPPERCASE_CHARACTERS.toLowerCase();
const NUMBERS_CHARACTERS = getRandomCharactersFromCharCode(48, 57);
const SYMBOLS_CHARACTERS = getRandomCharactersFromCharCode(33, 47)
  .concat(getRandomCharactersFromCharCode(58, 64))
  .concat(getRandomCharactersFromCharCode(91, 96))
  .concat(getRandomCharactersFromCharCode(123, 126));

const wordsList = [
  'depressed',
  'kindhearted',
  'station',
  'challenge',
  'tramp',
  'birthday',
  'lewd',
  'alike',
  'pin',
  'hunt',
  'immense',
  'neck',
  'buzz',
  'allow',
  'fortunate',
  'orange',
  'handle',
  'film',
  'colorful',
  'knotty',
  'library',
  'try',
  'suggestion',
  'muscle',
  'sticky',
  'pop',
  'please',
  'wind',
  'skinny',
  'sniff',
  'front',
  'scared',
  'belong',
  'acid',
  'fry',
  'exercise',
  'scratch',
  'perpetual',
  'mask',
  'business',
  'twist',
  'daughter',
  'entertain',
  'numerous',
  'children',
  'table',
  'confess',
  'prevent',
  'things',
  'behave',
  'dear',
  'spectacular',
  'claim',
  'reading',
  'green',
  'meek',
  'unwritten',
  'empty',
  'drag',
  'bushes',
  'striped',
  'protective',
  'cooperative',
  'quirky',
  'tow',
  'route',
  'rebel',
  'needless',
  'adjustment',
  'aftermath',
  'tease',
  'scarecrow',
  'view',
  'paltry',
  'skate',
  'work',
  'versed',
  'wine',
  'trite',
  'shocking',
  'manage',
  'squeamish',
  'greet',
  'foot',
  'kittens',
  'calm',
  'press',
  'one',
  'probable',
  'attempt',
  'mountainous',
  'ill',
  'add',
  'introduce',
  'noisy',
  'shy',
  'jewel',
  'nosy',
  'dependent',
  'yard',
  'trade',
  'fence',
  'elderly',
  'pet',
  'count',
  'glue',
  'observant',
  'coat',
  'adhesive',
  'door',
  'answer',
  'sharp',
  'carve',
  'yell',
  'tremble',
  'unwieldy',
  'wasteful',
  'invention',
  'cooing',
  'poke',
  'ruin',
  'hallowed',
  'camp',
  'vein',
  'descriptive',
  'peck',
  'outgoing',
  'unbiased',
  'beginner',
  'foamy',
  'jolly',
  'gigantic',
  'smash',
  'mundane',
  'cellar',
  'copy',
  'drop',
  'big',
  'swim',
  'spiteful',
  'cruel',
  'materialistic',
  'steel',
  'legal',
  'evasive',
  'hypnotic',
  'bubble',
  'amuse',
  'painful',
  'boundless',
  'racial',
  'lively',
  'decorate',
  'chunky',
  'heap',
  'sense',
  'gamy',
  'wonder',
  'cherry',
  'ten',
  'trip',
  'nondescript',
  'effect',
  'chilly',
  'spray',
  'hammer',
  'pancake',
  'female',
  'real',
  'babies',
  'discover',
  'eatable',
  'trousers',
  'paste',
  'amusement',
  'tremendous',
  'creepy',
  'circle',
  'quixotic',
  'trashy',
  'mature',
  'knee',
  'seashore',
  'bed',
  'miniature',
  'bored',
  'cheese',
  'frame',
  'tested',
  'tightfisted',
  'pray',
  'gorgeous',
  'fill',
  'placid',
  'debt',
  'mass',
  'glove',
  'acceptable',
  'letter',
  'peace',
  'morning',
  'vegetable',
  'supply',
  'bridge',
  'cool',
  'bewildered',
  'cream',
  'chicken',
  'act',
  'unruly',
  'inject',
  'wiry',
  'crow',
  'argue',
  'lettuce',
  'abusive',
  'company',
  'bustling',
  'badge',
  'partner',
  'ahead',
  'spoil',
  'miscreant',
  'boiling',
  'division',
  'replace',
  'incredible',
  'unarmed',
  'believe',
  'bitter',
  'tin',
  'corn',
  'avoid',
  'thundering',
  'expensive',
  'stamp',
  'messy',
  'paper',
  'plot',
  'industrious',
  'disappear',
  'giraffe',
  'rain',
  'rob',
  'delightful',
  'hellish',
  'ragged',
  'afternoon',
  'price',
  'early',
  'ball',
  'flaky',
  'confused',
  'ray',
  'addicted',
  'marry',
  'drum',
  'bare',
  'metal',
  'cut',
  'chemical',
  'likeable',
  'demonic',
  'successful',
  'event',
  'nutty',
  'exultant',
  'light',
  'attractive',
  'amusing',
  'beg',
  'rock',
  'lick',
  'squeal',
  'size',
  'ambitious',
  'complain',
  'luxuriant',
  'wretched',
  'abrasive',
  'polish',
  'elated',
  'income',
  'zephyr',
  'brick',
  'excellent',
  'functional',
  'bike',
  'enjoy',
  'graceful',
  'imperfect',
  'grey',
  'ban',
  'wealthy',
  'scare',
  'stare',
  'horse',
  'aberrant',
  'garrulous',
  'greasy',
  'lumpy',
  'marvelous',
  'bore',
  'bit',
  'instrument',
  'stereotyped',
  'open',
  'cynical',
  'identify',
  'zinc',
  'kindly',
  'sip',
  'obscene',
  'stingy',
  'groan',
  'giants',
  'lamp',
  'juvenile',
  'fact',
  'dangerous',
  'glistening',
  'sloppy',
  'queen',
  'birds',
  'sand',
  'outrageous',
  'substance',
  'chop',
  'nauseating',
  'amuck',
  'stiff',
  'busy',
  'ordinary',
  'cabbage',
  'instinctive',
  'possess',
  'sponge',
  'skip',
  'chin',
  'puncture',
  'hot',
  'receptive',
  'double',
  'whine',
  'melted',
  'entertaining',
  'produce',
  'baseball',
  'lock',
  'baby',
  'periodic',
  'truculent',
  'gabby',
  'snail',
  'painstaking',
  'hideous',
  'psychedelic',
  'hand',
  'sulky',
  'embarrassed',
  'spy',
  'berserk',
  'knowing',
  'quiver',
  'spade',
  'unknown',
  'irritating',
  'axiomatic',
  'greedy',
  'bikes',
  'grandfather',
  'utopian',
  'private',
  'noise',
  'deadpan',
  'organic',
  'whistle',
  'accidental',
  'heavenly',
  'solid',
  'pocket',
  'window',
  'awful',
  'shade',
  'trouble',
  'growth',
  'uninterested',
  'behavior',
  'move',
  'tickle',
  'guess',
  'literate',
  'gentle',
  'underwear',
  'skirt',
  'loss',
  'learn',
  'spark',
  'stick',
  'statuesque',
  'yawn',
  'consider',
  'sun',
  'steep',
  'jelly',
  'coil',
  'knock',
  'copper',
  'encouraging',
  'robin',
  'structure',
  'snake',
  'different',
  'cowardly',
  'goofy',
  'melodic',
  'youthful',
  'slope',
  'knit',
  'class',
  'halting',
  'stew',
  'witty',
  'quack',
  'tan',
  'obey',
  'dust',
  'superb',
  'form',
  'sheep',
  'plough',
  'ossified',
  'heal',
  'ignorant',
  'reward',
  'wacky',
  'left',
  'anxious',
  'modern',
  'extend',
  'swift',
  'gratis',
  'suspect',
  'sign',
  'pretty',
  'daffy',
  'nonstop',
  'calculator',
  'material',
  'splendid',
  'advice',
  'curved',
  'committee',
  'silk',
  'defiant',
  'release',
  'typical',
  'victorious',
  'pack',
  'phobic',
  'agreeable',
  'attach',
  'dare',
  'noxious',
  'float',
  'ocean',
  'bake',
  'pets',
  'cat',
  'vagabond',
  'hateful',
  'yam',
  'week',
  'mark',
  'weak',
  'box',
  'ritzy',
  'bell',
  'escape',
  'refuse',
  'selfish',
  'north',
  'harmonious',
  'wall',
  'crook',
  'value',
  'hurt',
  'haircut',
  'cold',
  'shirt',
  'waggish',
  'flower',
  'awake',
  'ratty',
  'strange',
  'secretive',
  'star',
  'rural',
  'tail',
  'hissing',
];

const introParagraphText =
  'Instantly generate a secure, random password or passphrase, with zero effort';

let introParagraphTextIndex = 0;
const typing = () => {
  if (introParagraphTextIndex < introParagraphText.length) {
    introParagraph.innerHTML = introParagraphText.substring(
      0,
      introParagraphTextIndex
    );
    introParagraphTextIndex += 1;
  }
};
setTimeout(setInterval(typing, 100), 0);

const getAvailableCharacters = () => {
  let availableCharacters = '';

  if (PASSWORD_INPUTS.every(item => !item.checked))
    passwordLowercase.checked = 'checked';

  if (passwordLowercase.checked) availableCharacters += LOWERCASE_CHARACTERS;
  if (passwordUppercase.checked) availableCharacters += UPPERCASE_CHARACTERS;
  if (passwordNumbers.checked) availableCharacters += NUMBERS_CHARACTERS;
  if (passwordSymbols.checked) availableCharacters += SYMBOLS_CHARACTERS;

  return availableCharacters;
};

const capitalizeWords = wordsList.map(
  word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
);

const mixedCaseWords = wordsList.map(word => {
  let mixedCaseWord = '';
  for (let i = 0; i < word.length; i++) {
    Math.random() < 0.5
      ? (mixedCaseWord += word.charAt(i).toUpperCase())
      : (mixedCaseWord += word.charAt(i).toLowerCase());
  }
  return mixedCaseWord;
});

const getPassPhraseCase = () => {
  let passPhraseCase = [];

  if (passPhraseLowercase.checked) passPhraseCase = wordsList;
  if (passPhraseUppercase.checked)
    passPhraseCase = wordsList.map(word => word.toUpperCase());
  if (passPhraseCapitalize.checked) passPhraseCase = capitalizeWords;
  if (passPhraseMixedCase.checked) passPhraseCase = mixedCaseWords;

  return passPhraseCase;
};

const getBodyClassesInCasePasswordTabIsChecked = () => {
  return `flex ${
    passwordLength.value >= 1 && passwordLength.value <= 3
      ? 'very-week'
      : passwordLength.value >= 4 && passwordLength.value <= 7
      ? 'week'
      : passwordLength.value >= 8 && passwordLength.value <= 11
      ? 'medium'
      : passwordLength.value >= 12 && passwordLength.value <= 15
      ? 'good'
      : passwordLength.value >= 16 && passwordLength.value <= 19
      ? 'strong'
      : passwordLength.value >= 20 && passwordLength.value <= 63
      ? 'very-strong'
      : 'unbelievable'
  }`;
};
const getBodyClassesInCasePassPhraseTabIsChecked = () => {
  return `flex ${
    passwordLength.value == 1
      ? 'very-week'
      : passwordLength.value == 2
      ? 'week'
      : passwordLength.value == 3
      ? 'medium'
      : passwordLength.value == 4
      ? 'good'
      : passwordLength.value == 5
      ? 'strong'
      : passwordLength.value == 6
      ? 'very-strong'
      : 'unbelievable'
  }`;
};

const checkPasswordStrength = () => {
  body.classList = passwordTab.checked
    ? getBodyClassesInCasePasswordTabIsChecked()
    : getBodyClassesInCasePassPhraseTabIsChecked();
  showPasswordLength.style.left = `${passwordLength.value - 1}%`;
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
  output.textContent = PassPhrase.join(' - ');
};

const isRandomPasswordOrPassPhrase = () => {
  passwordTab.checked ? generatePassword() : generatePassPhrase();
};

regeneratePassword.addEventListener('click', () => {
  isRandomPasswordOrPassPhrase();
});

copyPassword.addEventListener('click', () => {
  navigator.clipboard.writeText(output.textContent);
  setTimeout(() => {
    inputBtnsWrapper.classList.add('show-copied-pop-up');
  }, 0);
  setTimeout(() => {
    inputBtnsWrapper.classList.remove('show-copied-pop-up');
  }, 1000);
});

passwordTab.addEventListener('change', () => {
  passwordLength.value = 20;
  generatePassword();
});

passphraseTab.addEventListener('change', () => {
  passwordLength.value = 6;
  generatePassPhrase();
});

passwordLength.addEventListener('input', () => {
  isRandomPasswordOrPassPhrase();
});

incrementPasswordLength.addEventListener('click', () => {
  passwordLength.value < 100 && passwordLength.value++;
  isRandomPasswordOrPassPhrase();
});

decrementPasswordLength.addEventListener('click', () => {
  passwordLength.value > 1 && passwordLength.value--;
  isRandomPasswordOrPassPhrase();
});

PASSWORD_INPUTS.forEach(item => {
  item.addEventListener('change', () => {
    generatePassword();
  });
});

PASSPHRASE_RADIOS.forEach(item => {
  item.addEventListener('change', () => {
    generatePassPhrase();
  });
});

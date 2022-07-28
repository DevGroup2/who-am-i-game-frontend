const WAITING_FOR_PLAYERS = 'WAITING_FOR_PLAYERS';
const SUGGESTING_CHARACTERS = 'SUGGESTING_CHARACTERS';
const STARTS = 'STARTS';
const IN_PROGRESS = 'IN_PROGRESS';
const NUMBER_OF_PLAYERS = 4;
const READY = 'READY';
const NOT_READY = 'NOT_READY';
const ASKING = 'ASKING';
const WAITING_FOR_ANSWERS = 'WAITING_FOR_ANSWERS';
const ANSWERING = 'ANSWERING';
const WAITING_FOR_QUESTION = 'WAITING_FOR_QUESTION';
const GUESSING = 'GUESSING';
const WAITING = 'WAITING';
const RESPONSE = 'RESPONSE';
const QUESTION = 'QUESTION';
const ANSWER = 'ANSWER';
const YES = 'YES';
const NO = 'NO';
const NOT_SURE = 'NOT_SURE';

const MAIN_LOBBY = '/main-lobby';
const GAME_LOBBY = '/game-lobby';
const LOADING = '/loading';
const LOBBY = '/lobby';
const PLAY = '/play';
const DEFEAT = '/defeat';
const VICTORY = '/victory';
const INACTIVE = '/inactive';
const CREATE_ACCOUNT = '/create-account';
const SIGN_IN = '/sign-in';
const RESTORE = '/restore';
const NEW_PASSWORD = '/new-password';
const PROFILE = '/profile';

const RGX_PASS =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
const RGX_USERNAME = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]$/;
const RGX_EMAIL = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const THEME_FILTER = [
  { title: 'Actors', checked: false },
  { title: 'Astronauts', checked: false },
  { title: 'Superheroes', checked: false },
];
const NUMBER_OF_PLAYERS_FILTER = [
  { title: '4', checked: false },
  { title: '5', checked: false },
  { title: '6', checked: false },
  { title: '7', checked: false },
  { title: '8', checked: false },
  { title: '9', checked: false },
  { title: '10', checked: false },
  { title: '11', checked: false },
  { title: '12', checked: false },
];
const TYPE_FILTER = [
  { title: 'Public', checked: false },
  { title: 'Private', checked: false },
];

export {
  WAITING_FOR_PLAYERS,
  SUGGESTING_CHARACTERS,
  STARTS,
  IN_PROGRESS,
  NUMBER_OF_PLAYERS,
  READY,
  NOT_READY,
  ASKING,
  WAITING_FOR_ANSWERS,
  ANSWERING,
  WAITING_FOR_QUESTION,
  GUESSING,
  WAITING,
  RESPONSE,
  QUESTION,
  ANSWER,
  YES,
  NO,
  NOT_SURE,
  MAIN_LOBBY,
  GAME_LOBBY,
  LOADING,
  LOBBY,
  PLAY,
  DEFEAT,
  VICTORY,
  INACTIVE,
  THEME_FILTER,
  NUMBER_OF_PLAYERS_FILTER,
  TYPE_FILTER,
  CREATE_ACCOUNT,
  SIGN_IN,
  RESTORE,
  NEW_PASSWORD,
  PROFILE,
  RGX_PASS,
  RGX_USERNAME,
  RGX_EMAIL,
};

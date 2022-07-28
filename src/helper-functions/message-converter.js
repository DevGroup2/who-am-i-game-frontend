import { RESPONSE, WAITING } from '../constants/constants';

function messageConverter(mode, message) {
  console.log('FUNC', mode, message);

  if (mode === RESPONSE) {
    if (message === 'YES') {
      return 'Right. Your turn';
    } else if (message === 'NO') {
      return 'Wrong. Passing turn';
    }
  } else if (mode === WAITING) {
    if (message === 'NOT_SURE') {
      return "DON'T KNOW";
    } else {
      return message;
    }
  }
}

export default messageConverter;

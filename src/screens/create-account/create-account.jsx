import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import GameTitle from '../../components/game-title/game-title';
import Input from '../../components/Input/Input';
import InputPassword from '../../components/Input/InputPassword';
import Btn from '../../components/btn/btn';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RGX_EMAIL, RGX_PASS, RGX_USERNAME } from '../../constants/constants';

function CreateAccount() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const formIsValid =
    RGX_PASS.test(password) &&
    RGX_EMAIL.test(email) &&
    !RGX_USERNAME.test(username) &&
    email.length >= 3 &&
    email.length < 256 &&
    username.length >= 2 &&
    username.length < 50;

  const submitHandler = (e) => {
    e.preventDefault();
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <ScreenWrapper>
      <GameTitle />
      <form className="form-wrapper" onSubmit={submitHandler}>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={(e) => usernameHandler(e)}
          placeholder="Username"
        />
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => emailHandler(e)}
          placeholder="Email"
        />
        <InputPassword
          name="password"
          value={password}
          onChange={(e) => passwordHandler(e)}
          placeholder="Password"
        />
        <div className="btn-form-wrapper">
          <Btn
            className={'btn-pink-solid'}
            onClick={() => {
              navigate('/');
            }}
          >
            Cancel
          </Btn>
          <Btn disabled={!formIsValid} type="submit">
            create account
          </Btn>
        </div>
      </form>
    </ScreenWrapper>
  );
}

export default CreateAccount;

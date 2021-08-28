import { useOktaAuth } from '@okta/okta-react';
import { FC, useState } from 'react';

export const Login: FC = () => {
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState<string | undefined>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    oktaAuth
      .signInWithCredentials({ username, password })
      .then((res) => {
        setSessionToken(res.sessionToken);
        // sessionToken is a one-use token, so make sure this is only called once
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        void oktaAuth.signInWithRedirect({ sessionToken: res.sessionToken });
      })
      .catch((err) => console.log('Found an error', err));
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (sessionToken) {
    // Hide form while sessionToken is converted into id/access tokens
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </label>
      <label>
        Password:
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <input id="submit" type="submit" value="Submit" />
    </form>
  );
};

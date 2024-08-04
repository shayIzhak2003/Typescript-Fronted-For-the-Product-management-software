import React, { useState } from 'react';
import { login } from '../api';

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleLogin = async () => {
    try {
      const result = await login({ username, password });
      const token = result.token;

      if (token) {
        onLogin(token);
        console.log(username)
        setErrorMessage('');
      } else {
        setErrorMessage('Login failed. Please check your username and password.');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your username and password.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {errorMessage && <h3 style={{ color: 'red' }}>{errorMessage}</h3>}
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

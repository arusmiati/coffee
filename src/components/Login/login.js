import React, { useState, useContext } from 'react';
import { login } from '../../api/auth';
import { AuthContext } from '../../context/authContext';
import { useHistory } from 'react-router-dom';
import './login.css'
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(AuthContext);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      setToken(data);
      history.push('/home');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="login-container">
      <img src="assets/logo technopartner.png" alt="Technopartner Logo" />
      <form onSubmit={handleLogin}>
        <p>Username</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

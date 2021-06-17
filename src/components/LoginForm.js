import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ login }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      login(username, password);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};

export default LoginForm;
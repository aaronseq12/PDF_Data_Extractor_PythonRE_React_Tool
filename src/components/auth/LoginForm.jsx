import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../common/Input';
import Button from '../common/Button';

const LoginForm = ({ onSwitchToSignUp }) => {
  const [credentials, setCredentials] = useState({ ssoid: '', password: '' });
  const { login, error } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <div className="form-container">
      <img src="/bhi-logo.png" alt="Baker Hughes Logo" className="logo" />
      <h2>DATA EXTRACTOR TOOL</h2>
      <p>Please sign in to continue</p>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input type="text" name="ssoid" placeholder="SSOID" value={credentials.ssoid} onChange={handleChange} required />
        <Input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
        <Button type="submit">Login</Button>
      </form>
      <p>
        Don't have an account?{' '}
        <button onClick={onSwitchToSignUp} className="link-button">
          Create an account
        </button>
      </p>
    </div>
  );
};

export default LoginForm;

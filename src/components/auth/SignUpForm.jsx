import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../common/Input';
import Button from '../common/Button';

const SignUpForm = ({ onSwitchToLogin }) => {
  const [userInfo, setUserInfo] = useState({ ssoid: '', name: '', password: '' });
  const { signup, error, message } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(userInfo);
  };

  return (
    <div className="form-container">
      <img src="/bhi-logo.png" alt="Baker Hughes Logo" className="logo" />
      <h2>Create Account</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input type="text" name="ssoid" placeholder="SSOID" value={userInfo.ssoid} onChange={handleChange} required />
        <Input type="text" name="name" placeholder="Name" value={userInfo.name} onChange={handleChange} required />
        <Input type="password" name="password" placeholder="Password" value={userInfo.password} onChange={handleChange} required />
        <Button type="submit">Create Account</Button>
      </form>
      <p>
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="link-button">
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignUpForm;

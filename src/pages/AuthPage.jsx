import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      {isLogin ? (
        <LoginForm onSwitchToSignUp={() => setIsLogin(false)} />
      ) : (
        <SignUpForm onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default AuthPage;

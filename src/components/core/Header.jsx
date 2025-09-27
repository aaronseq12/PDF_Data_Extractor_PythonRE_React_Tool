import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <h1>Welcome {user.name} to the BH Data Extractor Tool</h1>
      <Button onClick={logout} className="logout-button">Logout</Button>
    </header>
  );
};

export default Header;

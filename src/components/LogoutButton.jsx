import React from 'react';
import useAuth from '../hooks/index.jsx';

const LogoutButton = () => {
  const auth = useAuth();

  return auth.loggedIn ? (
    <button className="btn btn-primary" type="button" onClick={() => auth.logOut()}>Выйти</button>
  ) : null;
};

export default LogoutButton;

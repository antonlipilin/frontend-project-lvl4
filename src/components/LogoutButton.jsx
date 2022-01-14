import React from 'react';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';

const LogoutButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return auth.loggedIn ? (
    <button className="btn btn-primary" type="button" onClick={() => auth.logOut()}>{t('nav.logout')}</button>
  ) : null;
};

export default LogoutButton;

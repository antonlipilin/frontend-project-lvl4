import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import App from './components/App.jsx';
import ru from './locales/ru.js';
import SocketContext from './contexts/socket.jsx';

const initApp = () => {
  const i18nextInstance = i18next.createInstance();

  i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
  });

  const socket = io();

  return (
    <SocketContext.Provider value={socket}>
      <I18nextProvider i18n={i18nextInstance}>
        <App />
      </I18nextProvider>
    </SocketContext.Provider>
  );
};

export default initApp;

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { render } from 'react-dom';
import i18next from 'i18next';
import App from './components/App.jsx';
import ru from './locales/ru.js';

const initApp = () => {
  const i18nextInstance = i18next.createInstance();

  i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
  });

  const root = document.querySelector('#chat');
  render(
    <I18nextProvider i18n={i18nextInstance}>
      <App />
    </I18nextProvider>,
    root,
  );
};

export default initApp;

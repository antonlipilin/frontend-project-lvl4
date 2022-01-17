import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { render } from 'react-dom';
import App from './components/App.jsx';
import i18nextInstance from './i18n.js';

const root = document.querySelector('#chat');

render(
  <I18nextProvider i18n={i18nextInstance}>
    <App />
  </I18nextProvider>,
  root,
);

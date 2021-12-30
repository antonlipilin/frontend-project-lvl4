import '../assets/application.scss';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

const root = document.querySelector('#chat');

render(
  <App />,
  root,
);

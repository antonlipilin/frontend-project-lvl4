import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { render } from 'react-dom';
import InitApp from './initApp.js';

render(
  <InitApp />,
  document.querySelector('#chat'),
);

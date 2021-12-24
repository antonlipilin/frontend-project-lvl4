import '../assets/application.scss';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { render } from 'react-dom';
import LoginForm from './components/LoginForm.jsx';
import NotFound from './components/NotFound.jsx';

const root = document.querySelector('#chat');

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Root</h1>} />
      <Route path="login" element={<LoginForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
  root,
);

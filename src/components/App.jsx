import React, { useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import authContext from '../contexts/index.jsx';
import Nav from './Nav.jsx';
import LoginForm from './LoginForm.jsx';
import NotFound from './NotFound.jsx';
import Chat from './Chat.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => (!!localStorage.getItem('userId')));
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to="/login" />
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          )}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;

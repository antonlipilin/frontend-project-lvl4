import React, { useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import '../../assets/App.scss';
import store from '../slices/index.js';
import useAuth from '../hooks/index.jsx';
import AuthContext from '../contexts/authentication.jsx';
import Nav from './Nav.jsx';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';
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
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to="/login" />
  );
};

const App = () => (
  <Provider store={store}>
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
          <Route path="/signup" element={<SignupForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  </Provider>
);

export default App;

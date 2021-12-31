import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form, Button, Row, Col, Container
} from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hooks/index.jsx';

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post('/api/v1/login', values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  const renderForm = () => (
    <Form onSubmit={formik.handleSubmit} className="mb-3">
      <Form.Group controlId="username" className="mb-3">
        <Form.Label>Введите логин</Form.Label>
        <Form.Control
          size="lg"
          type="text"
          required
          ref={inputRef}
          value={formik.values.username}
          placeholder="Логин"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          isInvalid={authFailed}
        />
      </Form.Group>
      <Form.Group controlId="password" className="mb-3">
        <Form.Label>Введите пароль</Form.Label>
        <Form.Control
          size="lg"
          type="password"
          placeholder="Пароль"
          required
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={authFailed}
        />
        <Form.Control.Feedback type="invalid">Неверный логин или пароль. Проверьте правильность введёных данных</Form.Control.Feedback>
      </Form.Group>
      <Button variant="outline-primary" className="w-100" type="submit">Войти</Button>
    </Form>
  );

  return (
    <Container className="h-100">
      <Row className="h-100 justify-content-center align-items-center">
        <Col sm="10" md="8" xl="6" className="p-5 border rounded bg-white shadow">
          <h1 className="text-center ">Войти</h1>
          {renderForm()}
          <div className="text-center">
            <span>Нет аккаунта?</span>
            {' '}
            <Link to="/signup">Регистрация</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;

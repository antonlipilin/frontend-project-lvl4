import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Form, Button, Row, Col, Container,
} from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import useAuth from '../hooks/index.jsx';

const SignupForm = () => {
  const [regFailed, setRegFailed] = useState(false);
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
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .min(3, 'Минимальная длина логина - 3 символа')
        .max(20, 'Максимальная длина логина - 20 символов')
        .required('Обязательное поле'),
      password: yup.string()
        .min(6, 'Минимальная длина пароля - 6 символов')
        .required('Обязательное поле'),
      confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Обязательное поле'),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post('/api/v1/signup', values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setRegFailed(true);
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
          isInvalid={regFailed || (formik.touched.username && formik.errors.username)}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.username ? formik.errors.username : null}</Form.Control.Feedback>
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
          isInvalid={regFailed || (formik.touched.password && formik.errors.password)}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.password ? formik.errors.password : null}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="confirmPassword" className="mb-3">
        <Form.Label>Подтвердите пароль</Form.Label>
        <Form.Control
          size="lg"
          type="password"
          required
          value={formik.values.confirmPassword}
          placeholder="Подтверждение пароля"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          isInvalid={regFailed || (formik.touched.confirmPassword && formik.errors.confirmPassword)}
        />
        <Form.Control.Feedback type="invalid">{regFailed ? 'Такой пользователь уже существует' : formik.errors.confirmPassword}</Form.Control.Feedback>
      </Form.Group>
      <Button variant="outline-primary" className="w-100" type="submit">Зарегестрироваться</Button>
    </Form>
  );

  return (
    <Container className="h-100">
      <Row className="h-100 justify-content-center align-items-center">
        <Col sm="10" md="8" xl="6" className="p-5 border rounded bg-white shadow">
          <h1 className="text-center ">Регистрация</h1>
          {renderForm()}
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;

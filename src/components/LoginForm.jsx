import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import React from 'react';
import * as yup from 'yup';

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: yup.object({
      login: yup.string()
        .min(3, 'Минимальная длина логина - 3 символа')
        .max(15, 'Максимальная длина логина - 15 символов')
        .required('Обязательное поле'),
      password: yup.string()
        .min(8, 'Минимальная длина пароля - 8 символов')
        .max(15, 'Максимальная длина пароля - 15 символов')
        .matches(/[0-9]/, 'Пароль должен содержать как минимум одну цифру')
        .required('Обязательное поле'),
    }),
    onSubmit: (values) => {
      console.log(values, 'FORM VALUES !!!');
      formik.resetForm();
    },
  });

  const renderForm = () => (
    <form onSubmit={formik.handleSubmit} className="mb-3">
      <div className="form-group">
        <label htmlFor="login" className="w-100">
          Введите Логин
          <input
            type="text"
            required
            placeholder="Логин"
            id="login"
            value={formik.values.login}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="form-control form-control-lg mt-2"
          />
        </label>
        {formik.touched.login && formik.errors.login ? <div style={{ color: 'red' }}>{formik.errors.login}</div> : null}
      </div>
      <div className="form-group">
        <label htmlFor="password" className="w-100">
          Введите Пароль
          <input
            type="password"
            required
            placeholder="Пароль"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control form-control-lg mt-2"
          />
        </label>
        {formik.touched.password && formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
      </div>
      <button className="btn btn-outline-primary w-100" type="submit">Войти</button>
    </form>
  );

  return (
    <div className="h-100 row justify-content-center align-items-center">
      <div className="col-sm-10 col-md-8 col-xl-6 p-5 border rounded bg-white shadow">
        <h1 className="text-center">Войти</h1>
        {renderForm()}
        <div className="text-center">
          <span>Нет аккаунта?</span>
          {' '}
          <Link to="/signup">Регистрация</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

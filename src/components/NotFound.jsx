import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="h-100 row align-content-center justify-content-center">
    <div className="col-12 text-center">
      <Link to="/" className="btn btn-outline-primary">Вернуться на главную</Link>
    </div>
    <div className="col-10 not-found h-50 text-center" />
  </div>
);

export default NotFound;

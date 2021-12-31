import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';

const NotFound = () => (
  <Container className="h-100">
    <Row className="h-100 align-content-center justify-content-center">
      <Col xs="12" className="text-center">
        <Link to="/" className="btn btn-outline-primary">Вернуться на главную</Link>
      </Col>
      <Col xs="10" className="not-found h-50 text-center" />
    </Row>
  </Container>
);

export default NotFound;

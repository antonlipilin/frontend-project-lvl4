import React from 'react';
import '../../assets/NotFound.scss';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Container className="h-100">
      <Row className="h-100 align-content-center justify-content-center">
        <Col xs="12" className="text-center">
          <Link to="/" className="btn btn-outline-primary">{t('notFoundPage.toMain')}</Link>
        </Col>
        <Col xs="10" className="not-found h-50" />
      </Row>
    </Container>
  );
};

export default NotFound;

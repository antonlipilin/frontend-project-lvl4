import React, {
  useEffect, useRef, useState, useContext,
} from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { selectors } from '../../slices/channelsSlice.js';
import { SocketContext } from '../../contexts/socket.jsx';

const Rename = ({ item, handleModalClose }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const channels = useSelector(selectors.selectAll);
  const inputRef = useRef();
  const socket = useContext(SocketContext);
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: item.name,
    },
    onSubmit: (values) => {
      const { name } = values;
      const existingChannel = channels.find((channel) => channel.name === name);

      if (existingChannel) {
        setIsInvalid(true);
        inputRef.current.select();
        // eslint-disable-next-line no-useless-return
        return;
      }

      const channel = { name, id: item.id };

      socket.emit('renameChannel', channel, (response) => {
        console.log(response);
      });
      handleModalClose();
    },
  });

  return (
    <Modal show onHide={handleModalClose}>
      <Modal.Header>
        <Modal.Title>{t('modals.renameChannelTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control onChange={formik.handleChange} isInvalid={isInvalid} data-testid="input-body" name="name" value={formik.values.name} ref={inputRef} required />
            <Form.Control.Feedback type="invalid">{t('errors.uniqueChannelName')}</Form.Control.Feedback>
            <div className="d-flex justify-content-end pt-3">
              <Button variant="secondary" type="button" className="mr-2" onClick={handleModalClose}>{t('modals.cancelButton')}</Button>
              <Button variant="primary" type="submit">{t('modals.sendButton')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;

import React, {
  useEffect, useRef, useState, useContext,
} from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { selectors, changeCurrentChannel } from '../../slices/channelsSlice.js';
import { SocketContext } from '../../contexts/socket.jsx';

const Add = ({ handleModalClose }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const channels = useSelector(selectors.selectAll);
  const inputRef = useRef();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      const { name } = values;
      const channel = channels.find((c) => c.name === name);

      if (channel) {
        setIsInvalid(true);
        inputRef.current.select();
        // eslint-disable-next-line no-useless-return
        return;
      }

      const newChannel = { name };

      socket.emit('newChannel', newChannel, (response) => {
        const { data: { id } } = response;
        dispatch(changeCurrentChannel({ id }));
      });
      handleModalClose();
    },
  });

  return (
    <Modal show onHide={handleModalClose}>
      <Modal.Header>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control onChange={formik.handleChange} isInvalid={isInvalid} data-testid="input-body" name="name" value={formik.values.name} ref={inputRef} required />
            <Form.Control.Feedback type="invalid">Имя канала должно быть уникальным</Form.Control.Feedback>
            <div className="d-flex justify-content-end pt-3">
              <Button variant="secondary" type="button" className="mr-2" onClick={handleModalClose}>Отменить</Button>
              <Button variant="primary" type="submit">Отправить</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;

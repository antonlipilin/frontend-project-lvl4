import React, { useContext, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import SocketContext from '../contexts/socket.jsx';
import { addMessage } from '../slices/messagesSlice.js';

const NewMessageForm = ({ currentChannelId }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { t } = useTranslation();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('newMessage', (msg) => {
      dispatch(addMessage(msg));
    });
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values) => {
      try {
        const { username } = JSON.parse(localStorage.getItem('userId'));
        const { text } = values;
        const message = { text, username, channelId: currentChannelId };
        socket.emit('newMessage', message, (response) => {
          console.log(response.status);
        });
        formik.resetForm();
      } catch (err) {
        console.log(err);
        toast.error(t('errors.unknown'));
        throw err;
      }
    },
  });

  return (
    <div className="mt-auto py-3 px-2">
      <Form onSubmit={formik.handleSubmit}>
        <InputGroup>
          <Form.Control
            placeholder={t('chat.newMessagePlaceholder')}
            value={formik.values.text}
            onChange={formik.handleChange}
            name="text"
            ref={inputRef}
          />
          <Button variant="outline-primary" type="submit" disabled={!formik.dirty}>&#10140;</Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default NewMessageForm;

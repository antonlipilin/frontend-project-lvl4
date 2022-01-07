import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../contexts/socket.jsx';
import { addMessage } from '../slices/messagesSlice.js';

const NewMessageForm = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('newMessage', (msg) => {
      console.log(msg);
      dispatch(addMessage(msg));
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values) => {
      const { username } = JSON.parse(localStorage.getItem('userId'));
      const { text } = values;
      const message = { text, username, channelId: currentChannelId };
      socket.emit('newMessage', message, (response) => {
        console.log(response.status);
      });
      formik.resetForm();
    },
  });

  return (
    <div className="mt-auto py-3 px-2">
      <Form onSubmit={formik.handleSubmit}>
        <InputGroup>
          <Form.Control
            placeholder="Введите сообщение..."
            value={formik.values.text}
            onChange={formik.handleChange}
            name="text"
          />
          <Button variant="outline-primary" type="submit" disabled={!formik.dirty}>&#10140;</Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default NewMessageForm;

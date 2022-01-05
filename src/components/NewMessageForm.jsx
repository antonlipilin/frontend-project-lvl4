import React from 'react';
import { useFormik } from 'formik';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const NewMessageForm = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="mt-auto p-2">
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

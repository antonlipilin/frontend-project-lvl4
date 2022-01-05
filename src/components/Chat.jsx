import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const Chat = () => (
  <Container className="my-4 h-100 shadow rounded bg-white">
    <Row className="h-100">
      <Channels />
      <Messages />
    </Row>
  </Container>
);

export default Chat;

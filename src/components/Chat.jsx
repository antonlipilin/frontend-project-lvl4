import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { socket, SocketContext } from '../contexts/socket.jsx';

const Chat = () => (
  <Container className="my-4 h-100 shadow rounded bg-white overflow-hidden">
    <Row className="h-100">
      <SocketContext.Provider value={socket}>
        <Channels />
        <Messages />
      </SocketContext.Provider>
    </Row>
  </Container>
);

export default Chat;

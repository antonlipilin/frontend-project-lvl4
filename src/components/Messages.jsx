import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { selectors } from '../slices/messagesSlice.js';
import NewMessageForm from './NewMessageForm.jsx';

const Messages = () => {
  const messages = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messagesByChannelId = messages.filter((message) => message.channelId === currentChannelId);

  const renderMessages = () => {
    if (messagesByChannelId.length === 0) {
      return null;
    }

    return messagesByChannelId.map((message) => (
      <div key={message.id} className="mb-2 text-break">
        <b>
          {message.username}
          :
        </b>
        {' '}
        {message.text}
      </div>
    ));
  };

  return (
    <Col className="p-0 d-flex flex-column h-100">
      <div className="small p-3 mb-3 bg-light border-bottom">
        <p className="mb-0">
          <b># Имя чата</b>
        </p>
        <span>Количество сообщений</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {renderMessages()}
      </div>
      <NewMessageForm />
    </Col>
  );
};

export default Messages;

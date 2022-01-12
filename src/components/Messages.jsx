import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { selectors } from '../slices/messagesSlice.js';
import NewMessageForm from './NewMessageForm.jsx';

const Messages = () => {
  const messages = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messagesByChannelId = messages.filter((message) => message.channelId === currentChannelId);
  const messagesBoxRef = useRef();

  const handleChatScroll = () => {
    const element = messagesBoxRef.current;
    const elementScrollHeight = element.scrollHeight;
    element.scrollTo(0, elementScrollHeight);
  };

  useEffect(() => {
    handleChatScroll();
  }, [currentChannelId]);

  useEffect(() => {
    if (!messagesByChannelId.length) {
      return;
    }

    const storageData = JSON.parse(localStorage.getItem('userId'));
    const { username } = storageData;
    const lastMessage = messages[messages.length - 1];
    const { scrollHeight, clientHeight, scrollTop } = messagesBoxRef.current;
    const messageSize = 32;
    const shouldScroll = (scrollHeight === scrollTop + clientHeight + messageSize);

    if (lastMessage.username === username || shouldScroll) {
      handleChatScroll();
    }
  }, [messagesByChannelId]);

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
      <div id="messages-box" className="chat-messages overflow-auto px-5" ref={messagesBoxRef}>
        {renderMessages()}
      </div>
      <NewMessageForm />
    </Col>
  );
};

export default Messages;

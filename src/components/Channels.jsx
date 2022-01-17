import React, { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Nav, Button,
} from 'react-bootstrap';
import getModal from './modals/index.js';
import {
  fetchChannels, selectors, addChannel, removeChannel, renameChannel,
} from '../slices/channelsSlice.js';
import SocketContext from '../contexts/socket.jsx';
import { setModalInfo } from '../slices/UISlice.js';
import Channel from './Channel.jsx';

const Channels = () => {
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);
  const socket = useContext(SocketContext);
  const modal = useSelector((state) => state.UI.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
  }, []);

  useEffect(() => {
    socket.on('newChannel', (response) => {
      console.log(response, 'add new channel');
      dispatch(addChannel(response));
    });

    socket.on('removeChannel', (response) => {
      console.log(response, 'remove channel');
      dispatch(removeChannel(response.id));
    });

    socket.on('renameChannel', (msg) => {
      console.log(msg, 'rename channel');
      const { id, name } = msg;
      const channelData = { id, changes: { name } };
      dispatch(renameChannel(channelData));
    });
  }, []);

  const renderModal = () => {
    const { modalType, item } = modal;

    if (!modalType) {
      return null;
    }

    const handleModalClose = () => dispatch(setModalInfo({ modalType: null, item: null }));

    const Component = getModal(modalType);
    return <Component item={item} handleModalClose={handleModalClose} />;
  };

  const renderChannels = () => {
    if (channels.length === 0) {
      return null;
    }

    return channels.map((item) => <Channel item={item} key={item.id} />);
  };

  return (
    <Col xs={4} md={3} className="bg-light border-right pt-5 px-2">
      <div className="d-flex justify-content-between align-items-center mb-2 pl-2">
        <span>{t('chat.channels')}</span>
        <Button variant="outline-primary" size="sm" onClick={() => dispatch(setModalInfo({ modalType: 'adding', item: null }))}>+</Button>
      </div>
      <Nav variant="pills" fill className="flex-column" as="ul">
        {renderChannels()}
        {renderModal()}
      </Nav>
    </Col>
  );
};

export default Channels;

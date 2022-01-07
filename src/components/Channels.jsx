import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Nav, Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { fetchChannels, selectors, changeChannel } from '../slices/channelsSlice.js';

const Channels = () => {
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
  }, []);

  const renderChannel = ({ id, name, removable }) => {
    const variant = id === currentChannelId ? 'secondary' : 'light';

    if (removable) {
      return (
        <Nav.Item as="li" className="w-100" key={id}>
          <Dropdown as={ButtonGroup} className="d-flex">
            <Button variant={variant} className="text-left text-truncate w-100" type="button" onClick={() => dispatch(changeChannel({ id }))}>
              <span>#</span>
              {' '}
              {name}
            </Button>
            <Dropdown.Toggle split variant={variant} className="flex-grow-0" />
            <Dropdown.Menu>
              <Dropdown.Item href="#">Удалить</Dropdown.Item>
              <Dropdown.Item href="#">Переименовать</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
      );
    }

    return (
      <Nav.Item as="li" className="w-100" key={id}>
        <Button variant={variant} className="text-left text-truncate w-100" type="button" onClick={() => dispatch(changeChannel({ id }))}>
          <span>#</span>
          {' '}
          {name}
        </Button>
      </Nav.Item>
    );
  };

  const renderChannels = () => {
    if (channels.length === 0) {
      return null;
    }

    return channels.map(renderChannel);
  };

  return (
    <Col xs={4} md={3} className="bg-light border-right pt-5 px-2">
      <div className="d-flex justify-content-between align-items-center mb-2 pl-2">
        <span>Каналы</span>
        <Button variant="outline-primary" size="sm">+</Button>
      </div>
      <Nav variant="pills" fill className="flex-column" as="ul">
        {renderChannels()}
      </Nav>
    </Col>
  );
};

export default Channels;

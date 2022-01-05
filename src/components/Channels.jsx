import React, { useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Nav, Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { fetchChannels, selectors } from '../slices/channelsSlice.js';

const Channels = () => {
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
  }, []);

  const renderChannel = ({ id, name, removable }) => {
    const buttonClasses = cn('btn text-left text-truncate w-100 mb-1', {
      'btn-light': id !== currentChannelId,
      'btn-secondary': id === currentChannelId,
    });
    const dropdownTogglerClasses = cn('flex-grow-0 btn', {
      'btn-light': id !== currentChannelId,
      'btn-secondary': id === currentChannelId,
    });

    if (removable) {
      return (
        <Nav.Item as="li" className="w-100" key={id}>
          <Dropdown as={ButtonGroup} className="d-flex">
            <Button className={buttonClasses}>
              <span>#</span>
              {' '}
              {name}
            </Button>
            <Dropdown.Toggle split className={dropdownTogglerClasses} />
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
        <Button className={buttonClasses}>
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

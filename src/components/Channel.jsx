import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  ButtonGroup, Button, Dropdown, Nav,
} from 'react-bootstrap';
import { changeCurrentChannel } from '../slices/channelsSlice.js';
import { setModalInfo } from '../slices/UISlice.js';

const Channel = ({ item }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const { id, name, removable } = item;
  const variant = id === currentChannelId ? 'secondary' : 'light';

  if (removable) {
    return (
      <Nav.Item as="li" className="w-100">
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button variant={variant} className="text-left text-truncate w-100" type="button" onClick={() => dispatch(changeCurrentChannel({ id }))}>
            <span>#</span>
            {' '}
            {name}
          </Button>
          <Dropdown.Toggle split variant={variant} className="flex-grow-0" />
          <Dropdown.Menu style={{ margin: 0 }}>
            <Dropdown.Item href="#" onClick={() => dispatch(setModalInfo({ modalType: 'removing', item }))}>{t('chat.delete')}</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => dispatch(setModalInfo({ modalType: 'renaming', item }))}>{t('chat.rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item as="li" className="w-100">
      <Button variant={variant} className="text-left text-truncate w-100" type="button" onClick={() => dispatch(changeCurrentChannel({ id }))}>
        <span>#</span>
        {' '}
        {name}
      </Button>
    </Nav.Item>
  );
};

export default Channel;

import React, {
  useContext,
} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { SocketContext } from '../../contexts/socket.jsx';

const Remove = ({ item, handleModalClose }) => {
  const socket = useContext(SocketContext);

  const handleChannelRemove = () => {
    socket.emit('removeChannel', { id: item.id }, (response) => {
      console.log(response);
      handleModalClose();
    });
  };

  return (
    <Modal show onHide={handleModalClose}>
      <Modal.Header>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end pt-3">
          <Button variant="secondary" type="button" className="mr-2" onClick={handleModalClose}>Отменить</Button>
          <Button variant="danger" type="submit" onClick={handleChannelRemove}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
